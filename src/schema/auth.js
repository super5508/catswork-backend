const graphql = require("graphql")
const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
 } = graphql
const { createrUser, signInUser, userOtpVerification} = require('./../auth/auth')
 const {userAuthenticationType, successType,  userSignupAndLoginType, emailVerificationType, accessTokenGeneration} = require('./catworksAuthentication')
 const { getSelectedThingFromTable,  updateFieldInTable,  deleteSelectedRow} = require('../helpers/sql')
 const util = require('util')

 const dummyRootQuery = new GraphQLObjectType({
  name: "dummyRootQuery",
  fields: {
    _dummy: { type: GraphQLInt }
  }
 })

 const Mutations = new GraphQLObjectType({
    name: 'userRootMutation',
    fields: {
      RegisterUser: {
        type: successType,
      args: {
        body: {
          type: userSignupAndLoginType
        }
      },
      resolve: async (parent, args, context) => {
        const { email, password } = args.body
        const newlyCreatedUser = await createrUser(email, password)
        return {
          success: true, 
          userId: newlyCreatedUser.generateUserId,
          email: newlyCreatedUser.email
        }
      }
    },
    loginUser: {
      type: accessTokenGeneration,
      args: {
        body: {
          type: userSignupAndLoginType
        }
      },
      resolve: async (parent, args, context) => {
        const { email, password } = args.body
        const createrNewUser = await signInUser(email, password)
        return {
          success: true,
          userId: createrNewUser.userId, 
          accessToken: createrNewUser.getNewlyGeneratedAccessToken
        }
      }
    },
    userOtpVerification: {
      type: accessTokenGeneration,
      args: {
        body: {
          type: emailVerificationType
        }
      },
      resolve: async (parent, args, context) => {
        const { email, generated_otp } = args.body
        const createrNewUser = await userOtpVerification(email, generated_otp)
        return {
          success: true,
          userId: createrNewUser.userId, 
          accessToken: createrNewUser.getNewlyGeneratedAccessToken
        }
      }
    }
  }
 })

 module.exports = new GraphQLSchema({
  query:dummyRootQuery,
  mutation: Mutations
})



