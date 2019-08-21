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
const {userActivityInputType, userActivityType, activitySucessObj} = require('./catworksActivity')
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
        //Make Parent ID optional here
        type:  new GraphQLList(userDashboardType),
        args: {
          parentId: {
            type: GraphQLInt
          }
        },
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
        const id =  args.id
        const userId = context.res.locals.userId
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
        const notificationPayload = {
          userId: userId, 
          message: `Added  ${args.parameter.first}`, 
          personId: addLinkedinUser.insertId, 
          type:  'ADDED_PERSON'
        }
        const createNotificationInTable = await insertIntheTable('CatsWork_notification', notificationPayload)
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
        const payload = {...args.parameter, userId: userId, personId: args.id, status: enums.activityStatus.false}
        const getUserDataFromTable = await getSelectedThingFromTable('CatsWork_personal', `userId = ${userId}`)
        const userDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `personId = ${args.id}`)
        const insertActivityInTable = await insertIntheTable('catworks_activity', payload)
        args.parameter.activity = args.parameter.activity.toLowerCase().split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
        const notificationPayload = {
          userId: userId, 
          message: `Scheduled ${args.parameter.activity} with ${getUserDataFromTable[0].name} with ${userDashboardData[0].first}`, 
          personId: args.id, 
          activity: insertActivityInTable.insertId,
          type:  'SCHEDULED_ACTIVITY'
        }
        const createNotificationInTable = await insertIntheTable('CatsWork_notification', notificationPayload)
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
        const updateActivityInTable = await updateFieldInTable('catworks_activity', payload, `activityId = ${args.id} AND userId = ${userId}`)
        const returnObj = {
          userId: userId,
          success: true,
          id: updateActivityInTable.insertId,
        }
        return returnObj
      }
    },
    ToggleActivity: {
      type: activitySucessObj, 
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: async (parent, args, context) => {
        const userId = context.res.locals.userId
        const userActivityData = await getSelectedThingFromTable('catworks_activity', `userId = ${userId} AND activityId = ${args.id}`)
        // Toggling activity status
        const payload = {
          status: userActivityData[0].status === 0 ? enums.activityStatus.true : enums.activityStatus.false
        }
        // User Data From Table
        //TODO: Run them parallely instead of asynchronously -> Promise All
        const getUserDataFromTable = await getSelectedThingFromTable('CatsWork_personal', `userId = ${userId}`)
        const getUserDashboardData = await getSelectedThingFromTable('CatsWork_dashboard', `personId = ${userActivityData[0].personId}`)
        const activity = payload.status === 0? 'Marked Incomplete' : 'Marked Complete'
        const updateActivityInTable = await updateFieldInTable('catworks_activity', payload, `activityId = ${args.id} AND userId = ${userId}`)
        userActivityData[0].activity = userActivityData[0].activity.toLowerCase().split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
        const notificationPayload = {
          userId: userId, 
          message: `${activity} ${userActivityData[0].activity} with ${getUserDataFromTable[0].name} with ${getUserDashboardData[0].first}`, 
          personId: userActivityData[0].personId, 
          activity: args.id,
          type:  payload.status === 0 ? 'SCHEDULED_ACTIVITY' : 'COMPLETED_ACTIVITY'
        }
        const createNotificationInTable = await insertIntheTable('CatsWork_notification', notificationPayload)
        const returnObj = {
          userId: userId,
          success: true,
          id: args.id,
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
        //TODO: Create Axtivity on Delete 
        const deleteSelectedRecord = await deleteSelectedRow(`catworks_activity`, `activityId`,  id)
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
