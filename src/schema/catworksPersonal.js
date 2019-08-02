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
  GraphQLList
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
    userDashboard: { // Since user can have multiple list of enteries, using list
      type: new GraphQLList(require('./catworksDashboard').userDashboardType), 
      resolve: async (parent, args, request) => {
        try {
        console.log(`Parent User Id:`, parent.userId)
        const userData = await getSelectedThingFromTable('CatsWork_dashboard', `userId`,  `${parent.userId}`)
        console.log(`userData:`,userData)
        return userData
        } catch (err) {
          console.error(err)
          throw new Error(err)
        }
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