// These contains enums which can be common 
const graphql = require("graphql")

const { 
  GraphQLEnumType,
  GraphQLObjectType,
} = graphql



const MonthType = new GraphQLEnumType({
  name: 'monthType',
  values: {
    JANUARY:{
      value: "January"
    }, 
    FEBRUARY: {
      value: 'February'
    }, 
    MARCH: {
      value: 'March'
    }, 
    MAY: {
      value: 'May'
    }, 
    JUNE: {
      value: 'June'
    }, 
    JULY: {
      value: 'July'
    }, 
    AUGUST: {
      value: "August"
    }, 
    SEPTEMBER: {
      value: 'September'
    }, 
    OCTOBER: {
      value: 'October'
    }, 
    NOVEMEBER: {
      value: 'November'
    }, 
    DECEMBER: {
      value: 'December'
    }
  }
})


const industryType = new GraphQLEnumType({ 
  name: 'industy_type',
  values: {
    AGRICULTURE: {
      value: "Agriculture"
    },
    ART: {
      value: "Art"
    },
    CONSTRUCTION: {
      value: 'Construction'
    }, 
    CORPORATE: {
      value:'Corporate'
    },
    EDUCATION: {
      value: 'Education'
    }, 
    FINANCE: {
      value: 'Finance'
    },
    GOODS: {
      value: 'Goods'
    }, 
    GOVERNMENT: {
      value: 'Government'
    }, 
    HEALTH: {
      value: 'Health'
    }, 
    LEGAL: {
      value: 'Legal'
    }, 
    MANUFACTURING: {
      value: 'Manufacturing'
    }, 
    MEDIA: {
      value: 'Media'
    }, 
    ORGANISATION: {
      value: 'Organisation'
    }, 
    RECREATION: {
      value: 'Recreation'
    }, 
    SERVICE: {
      value: 'Service'
    }, 
    TECH: {
      value: 'Tech'
    }, 
    TRANSPORTATION: {
      value: 'Transportation'
    }, 
    OTHER: {
      value: 'Other'
    }
  }
})

const GenderType = new GraphQLEnumType({
  name: 'Gender',
  values: {
    FEMALE: {
      value: 1
    },
    MALE: {
      value: 2
    }
  },
})

const activeStep = {
  DISABLED: 0,
	SET_UP: 1,
	CONNECT_LINKED_IN: 2,
	ACTIVE: 3,
	ADMIN: 4
}



module.exports = {
  MonthType,
  industryType,
  GenderType,
  enums: {
    activeStep
  }
}