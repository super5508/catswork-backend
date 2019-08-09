const graphql = require("graphql")
// GraphQL types
const {userPersonalType, userPersonalInputType, userCreationlInputType  }= require('./catworksPersonal')
const {userDashboardType, userDashboardInputType} = require('./catworksDashboard')
const {userAuthenticationType} = require('./catworksAuthentication')
const {requestSuccess} = require('./../enums/commonTypes')
// Sql Helper Function
const { getSelectedThingFromTable,  updateFieldInTable,  deleteSelectedRow, insertIntheTable} = require('../helpers/sql')
const errorTypesEnums = require('./../enums/errorTypes')
// 
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
          resolve: async (parent, args, context) => {
            const userId = context.res.locals.userId
            //TODO: Error Handling
            const getUserDataFromTable = await getSelectedThingFromTable('CatsWork_personal', `userId`,  `${userId}`)
            // since there would only be a single user with a userId, hence we aren't using list here and hence we are passing the 0th element
            console.log(getUserDataFromTable)
            return getUserDataFromTable[0]
          }
      }, 
      catWorksDashboard: {
        type:  new GraphQLList(userDashboardType),
        resolve: async (parent, args, context) => {
          const userId = context.res.locals.userId
          // THis is a list, hence don't need to pass the 0th element
          const userDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `userId`, `${userId}`)
          return userDashboardData
        }
      },
      catWorksAuthentication: { // TODO: Verify if user authentication needs to be here
        type: userAuthenticationType,
        resolve: async (parent, args, context) => {
          const userId = context.res.locals.userId
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
      type: requestSuccess,
      args: { 
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }, 
        parameter: {
          type: userDashboardInputType
        }
      }, 
      resolve: async (parent, args, context) => {
        const userId = context.res.locals.userId
        const updateDashBoardInformation = await updateFieldInTable(`CatsWork_dashboard`, args.parameter, `id = ${args.id} AND userId = ${userId}`)
        const returnObj = {
          userId: userId,
          success: true
        }
        return returnObj
      }
    }, 
    EditPersonalInformation: {
      type: requestSuccess,
      args: { 
        parameter: {
          type: userPersonalInputType
        }
      }, 
      resolve: async (parent, args, context) => {
        const userId = context.res.locals.userId
        const updateDashBoardInformation =  await updateFieldInTable(`CatsWork_personal`, args.parameter, `userId = ${userId}`)
        const returnObj = {
          userId: userId,
          success: true
        }
        return returnObj
      }
    }, 
    DeleteEntireLinkedinProfileData: { //returns true if the query is deleted
      type: requestSuccess,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: async (parent, args, context) => {
        //Create function to delete entire row from the dashboard
        const id =  args.id
        const userId = context.res.locals.userId
        //TODO: Include UserID as well here
        const deleteSelectedRecord = await deleteSelectedRow(`CatsWork_dashboard`, `id`,  id)
        const returnObj = {
          userId: userId,
          success: true
        }
        return returnObj
      }
    }, 
    AddNewLinkedinUserInfo: {
      type: requestSuccess,
      args: { 
        parameter: {
          type: userDashboardInputType
        }
      }, 
      resolve: async (parent, args, context) => {
        const userId = context.res.locals.userId
        const payload = {...args.parameter}
        console.log(`This is payload:`, payload)
        const addLinkedinUser = await insertIntheTable('CatsWork_dashboard', payload)
        const returnObj = {
          userId: userId,
          success: true
        }
        return returnObj
      }
    },
    AddNewPersonalInfo: {
      type: requestSuccess,
      args: { 
        parameter: {
          type: userCreationlInputType
        }
      }, 
      resolve: async (parent, args, context) => {
        const userId = context.res.locals.userId
        console.log(userId)
        const checkIfUserInformationExsist = await getSelectedThingFromTable('CatsWork_personal', 'userId', `${userId}`)
        if (checkIfUserInformationExsist[0]) {
          console.log(`Nothing exsit`)
          throw new Error(errorTypesEnums.USER_INFO_EXSIST)
        } else {
          const payload = {...args.parameter, userId: userId}
          console.log(`This is payload:`, payload)
          const addLinkedinUser = await insertIntheTable('CatsWork_personal', payload)
          const returnObj = {
            userId: userId,
            success: true
          }
          return returnObj
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})
