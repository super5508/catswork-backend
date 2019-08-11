const graphql = require("graphql")
const {industryType} = require('../enums/commonTypes')
const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull
} = graphql
const { getSelectedThingFromTable } = require('../helpers/sql')

const userDashboardType = new GraphQLObjectType({
  name: 'user_dashboard',
  fields: () => ({
    id: {
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
      type: GraphQLInt //TODO: int in the sql, mapping it to in industry interested -> change in SQL
    }, 
    phone: {
      type: GraphQLInt
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
      type: GraphQLInt
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
        const userData = await getSelectedThingFromTable('CatsWork_personal', `userId`, `${parent[0].userId}`)
        return userData[0]
      }
    }, 
    userNotification: {
      type: require('./catworksNotification').userNotificationsType,
      resolve: async(parent, args, request) => {
        const userNotificationData = await getSelectedThingFromTable('catworks_notfication', `userId`, `${parent[0].userId}`)
        return userData[0]
      }
    },
    userActivity: {
      type: require('./catworksActivity').userActivityType,
      resolve: async(parent, args, request) => {
        const userNotificationData = await getSelectedThingFromTable('catworks_notfication', `userId`, `${parent[0].userId}`)
        return userData[0]
      }
    }
  })
})


const userDashboardInputType =  new GraphQLInputObjectType({
  name: 'userDashboadType', 
  fields: () => ({
    id: {
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
      type: GraphQLInt //TODO: int in the sql, mapping it to in industry interested -> change in SQL
    }, 
    phone: {
      type: GraphQLInt
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
      type: GraphQLInt
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