const graphql = require("graphql")
const commonTypes = require('../enums/commonTypes')
const userType = require('./catworksPersonal')
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
//TODO: Create Relations in here
const userDashboard = new GraphQLObjectType({
  name: 'user_dashboard',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    jobTItle: {
      type: GraphQLString
    },
    industry: {
      type: industryType //TODO: int in the sql, mapping it to in
    }, 
    phoneNumber: {
      type: GraphQLInt
    },
    location: {
      type: GraphQLString
    }, 
    education: {
      type: GraphQLString
    }, 
    CirculActivities: { //TODO: Make it small C in SQL dumb and change it here as well
      type: GraphQLString
    },
    website: {
      type: GraphQLString
    },
    notes: {
      type: GraphQLString
    },
    userInformation: {
      type: userType, 
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
