const graphql = require("graphql")
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
} = graphql
const { getSelectedThingFromTable } = require('../helpers/sql')


const userActivityType =  new GraphQLObjectType({
  name: 'user_activity',
  fields: () => ({
    activiytId: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    activityCustom: {
      type: GraphQLString
    },
    activity: {
      type: GraphQLInt
    },
    status: {
      type: GraphQLInt
    },
    personId: {
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

const userActivityInputType = new GraphQLInputObjectType({
  name: 'user_activity_input',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    personId: {
      type: GraphQLInt
    },
    activityCustom: {
      type: GraphQLString
    },
    activity: {
      type: GraphQLInt
    },
    status: {
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
  userActivityType,
  userActivityInputType
}