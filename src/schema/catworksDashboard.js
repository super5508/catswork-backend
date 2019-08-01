const graphql = require("graphql")
const commonTypes = require('../enums/commonTypes')

const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql

const { industryType } =  commonTypes 

//TODO: Create Relations in here
const userDashboard = new GraphQLObjectType({
  name: 'user_dashboard',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    jobTItle: {
      type: GraphQLString
    },
    industry: {
      type: industryType //TODO: int in the sql, mapping it to in
    }, 
    phoneNumber: {
      type: GraphQLInt
    },
    location: {
      type: GraphQLString
    }, 
    education: {
      type: GraphQLString
    }, 
    CirculActivities: { //TODO: Make it small C in SQL dumb and change it here as well
      type: GraphQLString
    },
    website: {
      type: GraphQLString
    },
    notes: {
      type: GraphQLString
    }
  })
})


module.exports = userDashboard 



// DROP TABLE IF EXISTS `CatsWork_dashboard`;
// CREATE TABLE `CatsWork_dashboard` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `userId` int(11) NOT NULL,
//   `firstName` varchar(255) DEFAULT NULL,
//   `lastName` varchar(255) DEFAULT NULL,
//   `company` varchar(255) DEFAULT NULL,
//   `jobTitle` varchar(255) DEFAULT NULL,
//   `industry` int(11) DEFAULT NULL,
//   `phoneNumber` varchar(255) DEFAULT NULL,
//   `location` varchar(255) DEFAULT NULL,
//   `education` varchar(255) DEFAULT NULL,
//   `CirculActivities` varchar(255) DEFAULT NULL,
//   `website` varchar(255) DEFAULT NULL,
//   `notes` varchar(255) DEFAULT NULL,
//   `createdAt` timestamp(6) NOT NULL,
//   `updatedAt` timestamp(6) NOT NULL ON UPDATE CURRENT_TIMESTAMP(6),
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;