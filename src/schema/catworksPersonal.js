const graphql = require("graphql")
const commonTypes = require('../enums/commonTypes')
const userDashboard = require('./catworksDashboard')
const { MonthType, industryType, GenderType} =  commonTypes 
const { userType } = require('./../enums/userType')
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
    userType: {
      type: userType
    },
    userDashboard: {
      type: require('./catworksDashboard').userDashboardType, 
      resolve(parent, args, request) {
        const userData = getSelectedThingFromTable('CatsWork_dashboard', `userId = ${parent.userId}`).then(res => {
          return res[0]
        })
        return userData
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