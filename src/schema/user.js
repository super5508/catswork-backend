const graphql = require("graphql")
// GraphQL types
const userType = require('./catworksPersonal')
const userDashbaordType = require('./catworksDashboard')
const userAuthenticationType = require('./catworksAuthentication')
// Sql Helper Function
const sqlHelper = require('../helpers/sql')
// Dummy Data 


// Getting all the data of the 

const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull
 } = graphql

//SQL DATA Operations here
const { getSelectedThingFromTable,  updateFieldInTable  } = sqlHelper


// Root Query 
const RootQuery = new GraphQLObjectType({
  name: "userRootQueryType",
  fields: {
      catWorksPersonal: {
          type: userType, 
          args: { userId: { type: new GraphQLNonNull(GraphQLInt) }},
          resolve(parent, args, request){
            //TODO: Error Handling
            const userData = getSelectedThingFromTable('CatsWork_personal', `userId`,  `${args.userId}`).then(res => {
              return res[0]
            })
            return userData
          }
      }, 
      catWorksDashboard: {
        type: userDashbaordType,
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
      type: userDashbaordType,
      args: { 
        userId: {
          type: new GraphQLNonNull(GraphQLInt)
        }, 
        params: {
          type: GraphQLObjectType
        }
      }, 
      resolve (parent, args, request) {
        const updateDashBoardInformation = updateFieldInTable(`CatsWork_dashboard`, args.params, userId, args.userId).then(res => {
          return res[0]
        })
      }
    }, 
    EditPersonalInformation: {
      type: userType,
      args: { 
        userId: {
          type: new GraphQLNonNull(GraphQLInt)
        }, 
        params: {
          type: GraphQLObjectType
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
