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
  GraphQLInputObjectType
} = graphql

 const userPersonalType = new GraphQLObjectType({
  name: 'user_personal',
  fields: () => ({
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
    email: {
      type: GraphQLString
    }, 
    major: {
      type: GraphQLString
    },
    industryInterest: {
      type: industryType
    },
    school: {
      type: GraphQLString
    },
    degree: {
      type: GraphQLString
    },
    userDashboard: {
      type: require('./catworksDashboard').userDashboardType, 
      resolve: async (parent, args, request) => {
        const userData = await getSelectedThingFromTable('CatsWork_dashboard', `userId = ${parent.userId}`)
        console.log(`userData:`,userData)
        return userData[0]
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
    email: {
      type: GraphQLString
    }, 
    major: {
      type: GraphQLString
    },
    industryInterest: {
      type: industryType
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
  userPersonalInputType
}