const graphql = require("graphql")
// GraphQL types
const {userPersonalType, userPersonalInputType }= require('./catworksPersonal')
const {userDashboardType, userDashboardInputType} = require('./catworksDashboard')
const userAuthenticationType = require('./catworksAuthentication')
// Sql Helper Function
const { getSelectedThingFromTable,  updateFieldInTable  } = require('../helpers/sql')
// Dummy Data 


// Getting all the data of the 

const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType
 } = graphql

//SQL DATA Operations here



// Root Query 
const RootQuery = new GraphQLObjectType({
  name: "userRootQueryType",
  fields: {
      catWorksPersonal: {
          type: userPersonalType, 
          args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
          resolve(parent, args, request){
            //TODO: Error Handling
            return getSelectedThingFromTable('CatsWork_personal', `userId`,  `${args.userId}`).then(res => {
              console.log(`Res 0`, res[0])
              return res[0]
            })
          }
      }, 
      catWorksDashboard: {
        type: userDashboardType,
        args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
        resolve (parent, args, request) {
          //TODO: Error Handling
          const userDashboardData = getSelectedThingFromTable('CatsWork_dashboard', `userId`, `${args.userId}`).then(res => {
            return res[0]
          })
          return userDashboardData
        }
      },
      catWorksAuthentication: { // TODO: Verify if user authentication needs to be here
        type: userAuthenticationType,
        args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
        resolve (parent, args, request) {
          //TODO: Error Handling
          const userAuthenticationData = getSelectedThingFromTable('CatsWork_authentication', `userId`, `${args.userId}`).then(res => {
            return res[0]
          })
          return userAuthenticationData
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
      resolve (parent, args, request) {
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
      resolve (parent, args, request) {
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
