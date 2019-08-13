const graphql = require("graphql")
const {industryType} = require('../enums/commonTypes')
const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList
} = graphql
const { getSelectedThingFromTable } = require('../helpers/sql')

const userDashboardType = new GraphQLObjectType({
  name: 'user_dashboard',
  fields: () => ({
    personId: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    first: {
      type: GraphQLString
    },
    last: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    position: {
      type: GraphQLString
    },
    industry: {
      type: GraphQLString //TODO: int in the sql, mapping it to in industry interested -> change in SQL
    }, 
    phone: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    }, 
    hometown: {
      type: GraphQLString
    },
    education: {
      type: GraphQLString
    }, 
    extracurriculars: { //TODO: Make it small C in SQL dumb and change it here as well
      type: GraphQLString
    },
    website: {
      type: GraphQLString
    },
    notes: {
      type: GraphQLString
    }, 
    createdAt: {
      type: GraphQLString
    },
    source: {
      type: GraphQLString
    },
    sourceCustom: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    userInformation: {
      type: require('./catworksPersonal').userPersonalType, 
      resolve: async (parent, args, request) => {
        const userData = await getSelectedThingFromTable('CatsWork_personal', `userId`, `${parent.userId}`)
        return userData[0]
      }
    }, 
    userNotification: {
      type: require('./catworksNotification').userNotificationsType,
      resolve: async(parent, args, request) => {
        console.log(`This is parent`, parent)
        const userNotificationData = await getSelectedThingFromTable('CatsWork_notification', `userId = ${parent.userId}`)
        return userNotificationData[0]
      }
    },
    userActivity: {
      type: new GraphQLList(require('./catworksActivity').userActivityType),
      resolve: async(parent, args, request) => {
        console.log(`Parent User activity`, parent)
        const userActivityData= await getSelectedThingFromTable('catworks_activity', `userId = ${parent.userId}`)
        return userActivityData
      }
    }
  })
})


const userDashboardInputType =  new GraphQLInputObjectType({
  name: 'userDashboadInputType', 
  fields: () => ({
    personId: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    first: {
      type: GraphQLString
    },
    last: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    position: {
      type: GraphQLString
    },
    industry: {
      type: GraphQLString //TODO: String here, int in the personal since chrome extsnions pasing int
    }, 
    phone: {
      type: GraphQLString //TODO: Chrome Extension passing string, change it to int
    },
    location: {
      type: GraphQLString
    }, 
    hometown: {
      type: GraphQLString
    },
    education: {
      type: GraphQLString
    }, 
    extracurriculars: { 
      type: GraphQLString
    },
    website: {
      type: GraphQLString
    },
    notes: {
      type: GraphQLString
    }, 
    createdAt: {
      type: GraphQLString
    },
    source: {
      type: GraphQLString // TODO: In the given Backend Schema, source is tinyInt but extension sending string
    },
    sourceCustom: {
      type: GraphQLString
    }
  })
})

module.exports = {
  userDashboardType,
  userDashboardInputType
}