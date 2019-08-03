const graphql = require("graphql")
// GraphQL types
const {userPersonalType, userPersonalInputType, userCreationlInputType  }= require('./catworksPersonal')
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
          resolve: async (parent, args, req) => {
            const userId = req.headers.userId
            //TODO: Error Handling
            const getUserDataFromTable = await getSelectedThingFromTable('CatsWork_personal', `userId`,  `${userId}`)
            // since there would only be a single user with a userId, hence we aren't using list here and hence we are passing the 0th element
            return getUserDataFromTable[0]
          }
      }, 
      catWorksDashboard: {
        type:  new GraphQLList(userDashboardType),
        resolve: async (parent, args, req) => {
          const userId = req.headers.userId
          // THis is a list, hence don't need to pass the 0th element
          const userDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `userId`, `${userId}`)
          return userDashboardData
        }
      },
      catWorksAuthentication: { // TODO: Verify if user authentication needs to be here
        type: userAuthenticationType,
        resolve: async (parent, args, req) => {
          const userId = req.headers.userId
          const userAuthenticationData = await getSelectedThingFromTable('CatsWork_authentication', `userId`, `${userId}`)
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
      resolve: async (parent, args, req) => {
        console.log(req.headers.userId)
        args.parameter.userId = req.headers.userId
        const updateDashBoardInformation = await updateFieldInTable(`CatsWork_dashboard`, args.parameter, `id = ${args.id} AND userId = ${req.headers.userId}`)
        return  updateDashBoardInformation[0]
      }
    }, 
    EditPersonalInformation: {
      type: userPersonalType,
      args: { 
        parameter: {
          type: userPersonalInputType
        }
      }, 
      resolve: async (parent, args, req) => {
        args.parameter.userId = req.headers.userId
        const updateDashBoardInformation =  await updateFieldInTable(`CatsWork_personal`, args.parameter, `userId = ${args.userId}`)
        return updateDashBoardInformation [0]
      }
    }, 
    DeleteEntireLinkedinProfileData: { //returns true if the query is deleted
      type: GraphQLBoolean,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: async (parent, args, req) => {
        //Create function to delete entire row from the dashboard
        try {
        const deleteSelectedRecord = await deleteSelectedRow(`CatsWork_dashboard`, `id`, args.id)
        return true
        } catch (err) {
          console.error(err)
          throw new Error(err)
        }
      }
    }, 
    AddNewLinkedinUserInfo: {
      type: userDashboardType,
      args: { 
        parameter: {
          type: userDashboardInputType
        }
      }, 
      resolve: async (parent, args, request) => {
        args.parameter.userId = req.headers.userId
        try {
          const addLinkedinUser = await insertIntheTable('CatsWork_dashboard', payload)
          return true
        } catch (err) {
          console.error(err)
          throw new Error(err)
        }
      }
    },
    AddNewPersonalInfo: {
      type: userDashboardType,
      args: { 
        parameter: {
          type: userCreationlInputType
        }
      }, 
      resolve: async (parent, args, request) => {
        args.parameter.userId = req.headers.userId
        //Check if user info already exsist
        const checkIfUserInformationExsist = await getSelectedThingFromTable('CatsWork_personal', 'userId', `${userId}`)
        if (checkIfUserInformationExsist[0]) {
          const error = {
            code: 403, 
            message: 'User info Already exsist'
          }
          throw new Error(error)
        } else {
          try {
          const addLinkedinUser = await insertIntheTable('CatsWork_personal', payload)
          return true
          } catch (err) {
            console.error(err)
            throw new Error(err)
          }
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})
