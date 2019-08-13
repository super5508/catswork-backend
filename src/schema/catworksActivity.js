const graphql = require("graphql")
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLBoolean
} = graphql
const { getSelectedThingFromTable } = require('../helpers/sql')


const userActivityType =  new GraphQLObjectType({
  name: 'user_activity',
  fields: () => ({
    activityId: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    activityCustom: {
      type: GraphQLString
    },
    activity: {
      type: GraphQLString //TODO Frontend wants it to be string, given db have it as integer
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
    },
    date: {
      type: GraphQLString
    }
  })
})

const userActivityInputType = new GraphQLInputObjectType({
  name: 'user_activity_input',
  fields: () => ({
    activityId: {
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
      type: GraphQLString  //TODO Frontend wants it to be string, given db have it as integer
    },
    status: {
      type: GraphQLInt
    },
    updatedAt: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString 
    },
    date: {
      type: GraphQLString //TODO: In DB we are using varchar. convert the data to timestamp in DB and in extension we are getting data in z format, format it to timestamp format
    }
  })
})

const activitySucessObj = new GraphQLObjectType({
  name: 'activity_success', 
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    userId: {
      type: GraphQLInt
    }, 
    id: {
      type: GraphQLString
    }, 
    status: {
      type: GraphQLInt
    }
  })
})

module.exports = {
  userActivityType,
  userActivityInputType,
  activitySucessObj
}