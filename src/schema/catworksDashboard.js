const graphql = require("graphql")
const {industryType} = require('../enums/commonTypes')
const {userDashboardType} = require('../enums/userType')
const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType
} = graphql
const { getSelectedThingFromTable } = require('../helpers/sql')

const userDashboard = new GraphQLObjectType({
  name: 'user_dashboard',
  fields: () => ({
   userDashboard: {
    type: userDashboardType
   }, 
    userInformation: {
      type: require('./catworksPersonal').userPersonalType, 
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


const userDashboardInputType =  new GraphQLInputObjectType({
  name: 'userDashboadType', 
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
      type: industryType //TODO: int in the sql, mapping it to in industry interested -> change in SQL
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
  })
})

module.exports = {
  userDashboardType,
  userDashboardInputType
}