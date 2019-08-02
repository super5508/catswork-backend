const graphql = require("graphql")
const commonTypes = require('./commonTypes')

const { 
  MonthType, 
  industryType, 
  GenderType
} =  commonTypes 

const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType
} = graphql


//TODO: Create Relations in here
 const userType = new GraphQLObjectType({
  name: 'userType', // Importance of Name here
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
      type: GenderType 
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
    }
  })
})


const userDashboardType = new GraphQLObjectType({
  name: 'userDashboardType',
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
  })
})



const userDashboardInputType =  new GraphQLInputObjectType({
  name: 'userDashboadType', 
  fields: {
    userDashboard: {
      type:userDashboardType
    }
  }
})

module.exports = {
  userType: userType,
  userDashboardType: userDashboardType,
}