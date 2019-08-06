const graphql = require("graphql")
const {industryType} = require('../enums/commonTypes')
const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull
} = graphql
const { getSelectedThingFromTable } = require('../helpers/sql')

const userDashboardType = new GraphQLObjectType({
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
      type: industryType //TODO: int in the sql, mapping it to in industry interested -> change in SQL
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
        const userData = await getSelectedThingFromTable('CatsWork_personal', `userId`, `${parent[0].userId}`)
        return userData[0]
      }
    }
  })
})


const userDashboardInputType =  new GraphQLInputObjectType({
  name: 'userDashboadType', 
  fields: () => ({
    id: {
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
      type: industryType //TODO: int in the sql, mapping it to in industry interested -> change in SQL
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
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  })
})

module.exports = {
  userDashboardType,
  userDashboardInputType
}