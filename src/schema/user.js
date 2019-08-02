const graphql = require("graphql")
// GraphQL types
const {userPersonalType, userPersonalInputType }= require('./catworksPersonal')
const {userDashboardType, userDashboardInputType} = require('./catworksDashboard')
const userAuthenticationType = require('./catworksAuthentication')
// Sql Helper Function
const { getSelectedThingFromTable,  updateFieldInTable  } = require('../helpers/sql')

const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList
 } = graphql

// Root Query 
const RootQuery = new GraphQLObjectType({
  name: "userRootQueryType",
  fields: {
      catWorksPersonal: {
          type: userPersonalType, 
          args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
          resolve: async (parent, args, request) => {
            //TODO: Error Handling
            try {
            const getUserDataFromTable = await getSelectedThingFromTable('CatsWork_personal', `userId`,  `${args.userId}`)
            // since there would only be a single user with a userId, hence we aren't using list here and hence we are passing the 0th element
            return getUserDataFromTable[0]
            } catch (err) {
              console.error(err)
              throw new Error(err)
            }
          }
      }, 
      catWorksDashboard: {
        type: userDashboardType,
        args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
        resolve: async (parent, args, request) => {
          //TODO: Error Handling
          // THis is a list, hence don't need to pass the 0th element
          try {
            const userDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `userId`, `${args.userId}`)
            return userDashboardData
          } catch (err) {
            console.error(err)
            throw new Error(err)
          }
        }
      },
      catWorksAuthentication: { // TODO: Verify if user authentication needs to be here
        type: new GraphQLList(userAuthenticationType),
        args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
        resolve: async (parent, args, request) => {
          //TODO: Error Handling
          try {
          const userAuthenticationData = await getSelectedThingFromTable('CatsWork_authentication', `userId`, `${args.userId}`)
          return userAuthenticationData[0]
          } catch (err) {
            console.error(err)
            throw new Error(err)
          }
        }
      }
  }
})

// Mutations from here
const Mutations = new GraphQLObjectType({
  name: 'userRootMutation',
  fields: {
    EditInformationInDashboard: {
      type: userDashboardType,
      args: { 
        userId: {
          type: new GraphQLNonNull(GraphQLInt)
        }, 
        parameter: {
          type: userDashboardInputType
        }
      }, 
      resolve: async (parent, args, request) => {
        const updateDashBoardInformation = updateFieldInTable(`CatsWork_dashboard`, args.parameter, userId, args.userId).then(res => {
          return res[0]
        })
      }
    }, 
    EditPersonalInformation: {
      type: userPersonalType,
      args: { 
        userId: {
          type: new GraphQLNonNull(GraphQLInt)
        }, 
        params: {
          type: userPersonalInputType
        }
      }, 
      resolve: async (parent, args, request) => {
        const updateDashBoardInformation = updateFieldInTable(`CatsWork_personal`, args.params, userId, args.userId).then(res => {
          return res[0]
        })
      }
    },
    // Note: User Authentication in other module
    // Add User Dashboard information
    // Delete user Dashboard information 
    //Add user Information in 
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})
