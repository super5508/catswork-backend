const graphql = require("graphql")
const commonTypes = require('../enums/commonTypes')
const userDashboard = require('./catworksDashboard')
const { MonthType, industryType, GenderType} =  commonTypes 

const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql

const sqlHelper = require('../helpers/sql')
const { getSelectedThingFromTable } = sqlHelper
//TODO: Create Relations in here
 const userPersonal = new GraphQLObjectType({
  name: 'user_personal', // Importance of Name here
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
      type: GenderType // Create custom type for it later
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
      type: userDashboard, 
      resolve(parent, args, request) {
        //TODO: Error Handling
        const userData = getSelectedThingFromTable('CatsWork_dashboard', `userId = ${parent.userId}`).then(res => {
          return res[0]
        })
        return userData
      }
    }
  })
})


module.exports = userPersonal