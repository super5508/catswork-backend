const graphql = require("graphql")
const commonTypes = require('../enums/commonTypes')
const userDashboard = require('./catworksDashboard')
const { MonthType, industryType, GenderType} =  commonTypes 
const { getSelectedThingFromTable } = require('../helpers/sql')


const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList, 
  GraphQLNonNull
} = graphql

 const userPersonalType = new GraphQLObjectType({
  name: 'user_personal',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    gradMonth: {
      type: MonthType
    },
    gradYear: {
      type: GraphQLInt
    },
    gender: {
      type: GenderType 
    },
    major: {
      type: GraphQLString
    },
    desiredIndustry: {
      type: GraphQLString
    },
    school: {
      type: GraphQLString
    },
    degree: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    userDashboard: { // Since user can have multiple list of enteries, using list
      type: new GraphQLList(require('./catworksDashboard').userDashboardType), 
      resolve: async (parent, args, request) => {
        const userData = await getSelectedThingFromTable('CatsWork_dashboard', `userId = ${parent.userId}`)
        return userData
      }
    },
    userNotification: {
      type: new GraphQLList(require('./catworksNotification').userNotificationsType),
      resolve: async(parent, args, request) => {
        const userNotificationData = await getSelectedThingFromTable('CatsWork_notification', `userId = ${parent.userId}`)
        return userNotificationData
      }
    },
    userActivity: {
      type: new GraphQLList(require('./catworksActivity').userActivityType),
      resolve: async(parent, args, request) => {
        const userActivityData= await getSelectedThingFromTable('catworks_activity', `userId = ${parent.userId}`)
        return userActivityData
      }
    }
  })
})

const userPersonalInputType =  new GraphQLInputObjectType({
  name: 'userInputType',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    gradMonth: {
      type: MonthType
    },
    gradYear: {
      type: GraphQLInt
    },
    gender: {
      type: GenderType 
    },
    major: {
      type: GraphQLString
    },
    desiredIndustry: {
      type: GraphQLString
    },
    school: {
      type: GraphQLString
    },
    degree: {
      type: GraphQLString
    }
  })
})

const userCreationlInputType =  new GraphQLInputObjectType({
  name: 'userCreationInputType',
  fields: () => ({
    gradMonth: {
      type: GraphQLString
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    gradYear: {
      type: GraphQLInt
    },
    gender: {
      type: GenderType 
    },
    major: {
      type: GraphQLString
    },
    desiredIndustry: {
      type: GraphQLString
    },
    school: {
      type: GraphQLString
    },
    degree: {
      type: GraphQLString
    }
  })
})

module.exports = {
  userPersonalType,
  userPersonalInputType,
  userCreationlInputType 
}