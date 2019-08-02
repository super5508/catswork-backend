const graphql = require("graphql")
const commonTypes = require('../enums/commonTypes')
const {userDashboardType} = require('../enums/userType')
const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql
const sqlHelper = require('../helpers/sql')
const { industryType } =  commonTypes 
const { getSelectedThingFromTable } = sqlHelper

const userDashboard = new GraphQLObjectType({
  name: 'user_dashboard',
  fields: () => ({
   userDashboard: {
    type: userDashboardType
   }, 
    userInformation: {
      type: require('./catworksPersonal'), 
      resolve(parent,request) {
        //TODO: Error Handling
        const userData = getSelectedThingFromTable('CatsWork_personal', `userId`, `${parent.userId}`).then(res => {
          return res[0]
        })
        return userData
      }
    }
  })
})


module.exports = userDashboard 
