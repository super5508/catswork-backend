const graphql = require("graphql")
// GraphQL types
const {userPersonalType, userPersonalInputType, userCreationlInputType  }= require('./catworksPersonal')
const {userDashboardType, userDashboardInputType} = require('./catworksDashboard')
const {userAuthenticationType} = require('./catworksAuthentication')
const {requestSuccess} = require('./../enums/commonTypes')
// Sql Helper Function
const { getSelectedThingFromTable,  updateFieldInTable,  deleteSelectedRow, insertIntheTable} = require('../helpers/sql')
const errorTypesEnums = require('./../enums/errorTypes')
const {enums} = require('./../enums/commonTypes')
const {userActivityInputType, userActivityType} = require('./catworksActivity')
const {userNotificationsType, userNotificationsInputType} = require('./catworksNotification')
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
            const getUserDataFromTable = await getSelectedThingFromTable('CatsWork_personal', `userId = ${userId}`)
            return getUserDataFromTable[0]
          }
      }, 
      catWorksDashboard: {
        type:  new GraphQLList(userDashboardType),
        resolve: async (parent, args, context) => {
          const userId = context.res.locals.userId
          // THis is a list, hence don't need to pass the 0th element
          const userDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `userId = ${userId}`)
          return userDashboardData
        }
      },
      catWorksSingleDashboardUser: {
        type: userDashboardType, 
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve: async (parent, args, context) => {
          const userId = context.res.locals.userId
          const userDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `personId = ${args.id}`)
          console.log(`Single User Dashboard Data`, userDashboardData)
          return userDashboardData[0]
        }
      },
      catWorksAuthentication: { // TODO: Verify if user authentication needs to be here
        type: userAuthenticationType,
        resolve: async (parent, args, context) => {
          const userId = context.res.locals.userId
          const userAuthenticationData = await getSelectedThingFromTable('CatsWork_authentication', `userId  = ${userId}`)
          return userAuthenticationData[0]
        }
      },
      catWorksActivity: {
        type:new GraphQLList (userActivityType),
        resolve: async (parent, args, context) => {
          const userId = context.res.locals.userId
          const userActivityData = await getSelectedThingFromTable('catworks_activity', `userId = ${userId}`)
          return userActivityData
        }
      },
      catWorksNotification: {
        type:new GraphQLList(userNotificationsType),
        resolve: async (parent, args, context) => {
          const userId = context.res.locals.userId
          const userNotificationData = await getSelectedThingFromTable('CatsWork_notification', `userId = ${userId}`)
          return userNotificationData
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
          success: true,
          id: updateDashBoardInformation.id
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
        const updatePersonalInformation =  await updateFieldInTable(`CatsWork_personal`, args.parameter, `userId = ${userId}`)
        const returnObj = {
          userId: userId,
          success: true,
          id: updatePersonalInformation.id
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
        const payload = {...args.parameter, userId: userId}
        const addLinkedinUser = await insertIntheTable('CatsWork_dashboard', payload)
        const returnObj = {
          userId: userId,
          success: true,
          id: addLinkedinUser.insertId
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
        const checkIfUserInformationExsist = await getSelectedThingFromTable('CatsWork_personal',  `userId = ${userId}`)
        if (checkIfUserInformationExsist[0]) {
          console.log(`Nothing exsit`)
          throw new Error(errorTypesEnums.USER_INFO_EXSIST)
        } else {
          const payload = {...args.parameter, userId: userId}
          const addLinkedinUser = await insertIntheTable('CatsWork_personal', payload)
          const updateActiveStatus = {
            activeStep: enums.activeStep.ACTIVE,
          }
          const updateIsVerifiedInTable= await updateFieldInTable('CatsWork_authentication', updateActiveStatus, `userId = "${userId}"`)
          const returnObj = {
            userId: userId,
            success: true,
            id: updateIsVerifiedInTable.insertId
          }
          return returnObj
        }
      }
    },
    AddNewActivity: {
      type: requestSuccess,
      args: { 
        parameter: {
          type: userActivityInputType
        },
        id: {
          type: GraphQLInt
        }
      }, 
      resolve: async (parent, args, context) => {
        const userId = context.res.locals.userId
        const payload = {...args.parameter, userId: userId, personId: args.id}
        const insertActivityInTable = await insertIntheTable('catworks_activity', payload)
        const returnObj = {
          userId: userId,
          success: true,
          id: insertActivityInTable.insertId
        }
        return returnObj
      }
    },
    updateActivity: {
      type: requestSuccess,
      args: { 
        parameter: {
          type: userActivityInputType
        },
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      }, 
      resolve: async (parent, args, context) => {
        const userId = context.res.locals.userId
        const payload = {...args.parameter}
        const updateActivityInTable = await updateFieldInTable('catworks_activity', payload, `id = ${args.id} AND userId = ${userId}`)
        const returnObj = {
          userId: userId,
          success: true,
          id: updateActivityInTable.insertId
        }
        return returnObj
      }
    },
    DeleteActivity: { //returns true if the query is deleted
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
        const deleteSelectedRecord = await deleteSelectedRow(`catworks_activity`, `id`,  id)
        const returnObj = {
          userId: userId,
          success: true
        }
        return returnObj
      }
    },
    addNotification: {
      type: requestSuccess,
      args: { 
        parameter: {
          type: userNotificationsInputType
        }
      }, 
      resolve: async (parent, args, context) => {
        const userId = context.res.locals.userId
        const payload = {...args.parameter, userId: userId}
        const insertNotificationInTable = await insertIntheTable('CatsWork_notification', payload)
        const returnObj = {
          userId: userId,
          success: true,
          id: insertNotificationInTable.insertId
        }
        return returnObj
      }
    },
    DeleteNotification: { //returns true if the query is deleted
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
        const deleteSelectedRecord = await deleteSelectedRow(`CatsWork_notification`, `id`,  id)
        const returnObj = {
          userId: userId,
          success: true
        }
        return returnObj
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})
