// These contains enums which can be common 
const graphql = require("graphql")

const { 
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString
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

const requestSuccess = new GraphQLObjectType({
  name: 'request_success', 
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    userId: {
      type: GraphQLInt
    }, 
    id: {
      type: GraphQLString
    }
  })
})


const EnumNotification = {
	ADDED_PERSON: 'Added Person',
	COMPLETED_ACTIVITY: 'Completed Activity',
	SCHEDULED_ACTIVITY: 'Scheduled Activity'
}
const EnumActivity = {
  COLD_EMAIL: 'Cold email',
	EMAIL_FOLLOW_UP: 'Email follow-up',
	PHONE_CALL: 'Phone call',
	COFFEE_CHAT: 'Coffee chat',
	RE_CONNECT: 'Re-connect',
	ASK_FOR_REFERRAL: 'Asked for referral',
	OTHER: 'Other'
}
const activityStatus = {
  true: 1,
  false: 0
}

module.exports = {
  MonthType,
  industryType,
  GenderType,
  enums: {
    activeStep, 
    activityStatus
  },
  requestSuccess,
  EnumNotification,
  EnumActivity,
}