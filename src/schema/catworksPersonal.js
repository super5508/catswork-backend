const graphql = require("graphql")
const commonTypes = require('../enums/commonTypes')
const userDashboard = require('./catworksDashboard')
const { MonthType, industryType, GenderType} =  commonTypes 

const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql

const sqlHelper = require('../helpers/sql')
const { getSelectedThingFromTable } = sqlHelper
//TODO: Create Relations in here
 const userPersonal = new GraphQLObjectType({
  name: 'user_personal', // Importance of Name here
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    gradMonth: {
      type: MonthType
    },
    gradYear: {
      type: GraphQLInt
    },
    gender: {
      type: GenderType // Create custom type for it later
    },
    email: {
      type: GraphQLString
    }, 
    major: {
      type: GraphQLString
    },
    industryInterest: {
      type: industryType
    },
    school: {
      type: GraphQLString
    },
    degree: {
      type: GraphQLString
    }, 
    userDashboard: {
      type: userDashboard, 
      resolve(parent, args, request) {
        //TODO: Error Handling
        const userData = getSelectedThingFromTable('CatsWork_dashboard', `userId = ${parent.userId}`).then(res => {
          return res[0]
        })
        return userData
      }
    }
  })
})


module.exports = userPersonal


// DROP TABLE IF EXISTS `CatsWork_personal`;
// CREATE TABLE `CatsWork_personal` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `userId` int(11) NOT NULL,
//   `gradYear` int(4) DEFAULT NULL,
//   `gradMonth` enum('january','february','march','april','may','june','july','august','september','october','november','december') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
//   `school` varchar(255) DEFAULT NULL,
//   `degree` varchar(255) DEFAULT NULL,
//   `major` varchar(255) DEFAULT NULL,
//   `gender` tinyint(1) NOT NULL,
//   `industryfield` enum('agriculture','art','construction','corporate','education','finance','goods','government','health','legal','manufacturing','media','organization','recreation','service','tech','transportation','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
//   `createdAt` timestamp NOT NULL,
//   `updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// SET FOREIGN_KEY_CHECKS = 1;