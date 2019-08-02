const graphql = require("graphql")
// GraphQL types
const {userPersonalType, userPersonalInputType }= require('./catworksPersonal')
const {userDashboardType, userDashboardInputType} = require('./catworksDashboard')
const userAuthenticationType = require('./catworksAuthentication')
// Sql Helper Function
const { getSelectedThingFromTable,  updateFieldInTable,  deleteSelectedRow} = require('../helpers/sql')

const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
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
            const getUserDataFromTable = await getSelectedThingFromTable('CatsWork_personal', `userId`,  `${args.userId}`)
            // since there would only be a single user with a userId, hence we aren't using list here and hence we are passing the 0th element
            return getUserDataFromTable[0]
          }
      }, 
      catWorksDashboard: {
        type: userDashboardType,
        args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
        resolve: async (parent, args, request) => {
          //TODO: Error Handling
          // THis is a list, hence don't need to pass the 0th element
            const userDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `userId`, `${args.userId}`)
            return userDashboardData
        }
      },
      catWorksAuthentication: { // TODO: Verify if user authentication needs to be here
        type: new GraphQLList(userAuthenticationType),
        args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
        resolve: async (parent, args, request) => {
          //TODO: Error Handling
          const userAuthenticationData = await getSelectedThingFromTable('CatsWork_authentication', `userId`, `${args.userId}`)
          return userAuthenticationData[0]
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
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }, 
        parameter: {
          type: userDashboardInputType
        }
      }, 
      resolve: async (parent, args, request) => {
        // Using ID here instead of userId since Id is going to be unique
        // TODO: Ask is passing userId in params here required -> Should remove?
        const updateDashBoardInformation = await updateFieldInTable(`CatsWork_dashboard`, args.parameter, `id`, args.id)
        return  updateDashBoardInformation[0]
      }
    }, 
    EditPersonalInformation: {
      type: userPersonalType,
      args: { 
        userId: {
          type: new GraphQLNonNull(GraphQLInt)
        }, 
        parameter: {
          type: userPersonalInputType
        }
      }, 
      resolve: async (parent, args, request) => {
        const updateDashBoardInformation =  await updateFieldInTable(`CatsWork_personal`, args.parameter, `userId`, args.userId)
        return updateDashBoardInformation [0]
      }
    }, 
    DeleteEntireRowFromDashboard: { //returns true if the query is deleted
      type: GraphQLBoolean,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }, 
        userId: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      }, 
      resolve: async (parent, args, request) => {
        //Create function to delete entire row from the dashboard
        try {
        const deleteSelectedRecord = await deleteSelectedRow(`CatsWork_dashboard`, `id`, args.id)
        return true
        } catch (err) {
          console.error(err)
          return false
        }
      }
    }
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
