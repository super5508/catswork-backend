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
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    message: {
      type: GraphQLString
    },
    activity: {
      type: GraphQLInt
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
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    message: {
      type: GraphQLString
    },
    activity: {
      type: GraphQLInt
    },
    updatedAt: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  })
})


module.exports = {
  userNotificationsType,
  userNotificationsInputType
}