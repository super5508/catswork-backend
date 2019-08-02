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
  GraphQLInt
} = graphql

 const userPersonalTableType = new GraphQLObjectType({
  name: 'user_personal',
  fields: () => ({
    userType: {
      type: userType
    },
    userDashboard: {
      type: require('./catworksDashboard'), 
      resolve(parent, args, request) {
        const userData = getSelectedThingFromTable('CatsWork_dashboard', `userId = ${parent.userId}`).then(res => {
          return res[0]
        })
        return userData
      }
    }
  })
})


module.exports = userPersonalTableType