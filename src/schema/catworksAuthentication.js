// Important Note: for security purpose, wont be adding any relation with other Schema with authentication 
// If wanted can move to simple api route as well 
const graphql = require("graphql")

const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql

const userAuthentication = new GraphQLObjectType({
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
    isVerified: {
      type: GraphQLInt
    }
  })
})

module.exports = userAuthentication 
