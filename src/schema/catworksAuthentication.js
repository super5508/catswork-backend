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

module.exports = userDashboard


// DROP TABLE IF EXISTS `CatsWork_authentication`;
// CREATE TABLE `CatsWork_authentication` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `userId` int(11) NOT NULL,
//   `email` varchar(255) NOT NULL,
//   `generated_otp` varchar(255) NOT NULL,
//   `isVerified` tinyint(1) NOT NULL DEFAULT '0',
//   `updatedAt` datetime(6) NOT NULL ON UPDATE CURRENT_TIMESTAMP(6),
//   `createdAt` datetime(6) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
