const graphql = require("graphql")
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
} = graphql
const { getSelectedThingFromTable } = require('../helpers/sql')


const userNotificationsType =  new GraphQLObjectType({
  name: 'user_notifications',
  fields: () => ({
    notificationId: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    message: {
      type: GraphQLString
    },
    personId: {
      type: GraphQLInt
    },
    activity: {
      type: GraphQLInt
    },
    type: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString  //TODO: Not using notification date anywhere instead using createdAt everywhere
    },
    updatedAt: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  })
})

const userNotificationsInputType = new GraphQLInputObjectType({
  name: 'user_notifications_input',
  fields: () => ({
    notificationId: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    message: {
      type: GraphQLString
    },
    type: {
      type: GraphQLInt
    },
    personId: {
      type: GraphQLInt
    },
    activity: {
      type: GraphQLInt
    },
    date: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString //TODO: Not using notification date anywhere instead using createdAt everywhere
    }
  })
})


module.exports = {
  userNotificationsType,
  userNotificationsInputType
}