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
const { createrUser, signInUser, userOtpVerification} = require('./../helpers/auth')

 const {userAuthenticationType, secureGraphQlType,  userSignupAndLoginType, emailVerificationType} = require('./catworksAuthentication')
 const { getSelectedThingFromTable,  updateFieldInTable,  deleteSelectedRow} = require('../helpers/sql')


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
        type: secureGraphQlType,
      args: {
        body: {
          type: userSignupAndLoginType
        }
      },
      resolve: async (parent, args, context) => {
        const { email, password } = args.body
        console.log(`User sign up`, email, password)
        const createrNewUser = await createrUser(email, password)
        return true
      }
    },
    loginUser: {
      type: secureGraphQlType,
      args: {
        body: {
          type: userSignupAndLoginType
        }
      },
      resolve: async (parent, args, context) => {
        const { email, password } = args.body
        console.log(`User sign up`, email, password)
        const createrNewUser = await signInUser(email, password)
        return true
      }
    },
    userOtpVerification: {
      type: secureGraphQlType,
      args: {
        body: {
          type: emailVerificationType
        }
      },
      resolve: async (parent, args, context) => {
        const { email, generated_otp } = args.body
        console.log(`User sign up`, email, password)
        const createrNewUser = await userOtpVerification(email, password)
        return true
      }
    }
  }
 })

 module.exports = new GraphQLSchema({
  query:dummyRootQuery,
  mutation: Mutations
})



