const webpush = require('web-push');
const config = require('./src/config.js')
const { getSelectedThingFromTable } = require('./src/helpers/sql');
const { EnumActivity } = require('./src/enums/commonTypes');

webpush.setVapidDetails(
  `mailto:${config.VAPID_EMAIL}`,
  config.PUBLIC_VAPID_KEY,
  config.PRIVATE_VAPID_KEY
);

async function sendNotification(req, res) {
  // Get pushSubscription object
  const { subscription, userId } = req.body;

  res.status(201).json({});
  const userActivityData = await getSelectedThingFromTable('catworks_activity', `userId = ${userId} AND status = 0`)
  const userDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `userId = ${userId}`)

  let notifications = []

  userActivityData.forEach(activity => {
    const activityTime = convertDateToMinutes(activity.date);
    const currentTime = convertDateToMinutes(new Date());
    const diff = activityTime - currentTime;
    const person = userDashboardData.find(person => person.personId === activity.personId);
    if (person) {
      const body = `${EnumActivity[activity.activity]} with ${person.first} ${person.last}`
      const notification = {
        activityId: activity.activityId,
        userId: activity.userId,
        personId: activity.personId,
      };
      if (diff === 60) { // 1 hour
        notifications.push({
          ...notification,
          body: `${body} in an hour.`,
        });
      }

      if (diff === 1440) { // 24 hours
        notifications.push({
          ...notification,
          body: `${body} in 24 hours.`,
        });
      }
    }
  });

  const payload = JSON.stringify(notifications);

  // Pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
}

function convertDateToMinutes(date) {
  return Math.floor(Date.parse(date) / 1000 / 60);
}

module.exports = sendNotification;