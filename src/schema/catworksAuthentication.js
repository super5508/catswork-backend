
const graphql = require("graphql")
const { getSelectedThingFromTable } = require('../helpers/sql')
const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull, 
  GraphQLInputObjectType,
  GraphQLBoolean
} = graphql

const userAuthenticationType = new GraphQLObjectType({
  name: 'user_authentications',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    email: {
      type: GraphQLString
    }, 
    generated_otp: {
      type: GraphQLInt
    },
    ActiveStep: {
      type: GraphQLInt
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    userInformation: {
      type: require('./catworksPersonal').userPersonalType, 
      resolve: async (parent, args, request) => {
        //TODO: Error Handling
        console.log(`Parent User Id:`, parent[0].userId) //Since ID is going to be same everywhere
        const userData = await getSelectedThingFromTable('CatsWork_personal', `userId = ${parent[0].userId}`)
        return userData[0]
      }
    },
    userDashboard: { // Since user can have multiple list of enteries, using list
      type: new GraphQLList(require('./catworksDashboard').userDashboardType), 
      resolve: async (parent, args, request) => {
        const userData = await getSelectedThingFromTable('CatsWork_dashboard', `userId = ${parent.userId}`)
        return userData
      }
    }
  })
})

const userSignupAndLoginType = new GraphQLInputObjectType({
  name: 'user_signup_login',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

const emailVerificationType = new GraphQLInputObjectType({
  name: 'user_verification_type',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }, 
    generated_otp: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
})

const successType= new GraphQLObjectType({
  name: 'user_secure_fields', 
  fields: () => ({
    success: {
      type: new GraphQLNonNull(GraphQLBoolean)
    }, 
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
    }, 
    email: {
      type: GraphQLString
    }
  })
})

const accessTokenGeneration =new GraphQLObjectType({
  name: 'access_token_fields', 
  fields: () => ({
    success: {
      type: new GraphQLNonNull(GraphQLBoolean)
    }, 
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
    }, 
    accessToken: {
      type: GraphQLString
    }
  })
})

module.exports = { 
  userAuthenticationType, 
  userSignupAndLoginType,
  emailVerificationType,
  successType,
  accessTokenGeneration
}
