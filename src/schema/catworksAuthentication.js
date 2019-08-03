
const graphql = require("graphql")
const { getSelectedThingFromTable } = require('../helpers/sql')
const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql

const userAuthentication = new GraphQLObjectType({
  name: 'user_authentications',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    email: {
      type: GraphQLString
    }, 
    generated_otp: {
      type: GraphQLInt
    },
    isVerified: {
      type: GraphQLInt
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    userInformation: {
      type: require('./catworksPersonal').userPersonalType, 
      resolve: async (parent, args, request) => {
        //TODO: Error Handling
        console.log(`Parent User Id:`, parent[0].userId) //Since ID is going to be same everywhere
        const userData = await getSelectedThingFromTable('CatsWork_personal', `userId`, `${parent[0].userId}`)
        return userData[0]
      }
    },
    userDashboard: { // Since user can have multiple list of enteries, using list
      type: new GraphQLList(require('./catworksDashboard').userDashboardType), 
      resolve: async (parent, args, request) => {
        const userData = await getSelectedThingFromTable('CatsWork_dashboard', `userId`,  `${parent.userId}`)
        return userData
      }
    }
  })
})

module.exports = userAuthentication 
