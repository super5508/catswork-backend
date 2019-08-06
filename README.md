## Getting Started with the project 

```
npm install
```

## Environment Configuration 

1. Create your own environment file (.env), we are using dotenv
2. Environment file configuration values can be found by reading config.js file

Typical Environment file would look something like this 

```
PORT = 7000

DB_HOST = localhost
DB_USER = root
DB_PASSWORD = rohit123
DB_DATABASE = VPARK

JWT_ISSUER = VPARK
JWT_SECRET = VPARK

JWT_SESSION_DURATION = 7d

NODE_EMAILER_SERVICE = gmail
NODE_EMAILER_EMAIL = irohitbhatia@gmail.com
NODE_EMAILER_PASSWORD = xxxx
```

## Error Handling

Error Handling (besides at verify token) are generated using the errorTypes enums present in the enums folder. To throw a new type of error which does not exsist, add it in the respective folders 

```
const ErrorTypes = {
  NOT_FOUND: "404/not-found",
  MISSING_TOKEN: "422/missing-token",
  EMAIL_EXISTS: "422/email-exists",
  USERNAME_EXISTS: "422/username-exists",
  USER_NOT_FOUND: "404/user-not-found",
  INVALID_LOGIN: "401/invalid-login",
  INCORRECT_PASSWORD: "401/incorrect-password",
  UNVERIFIED_EMAIL: "401/unverified-email",
  AUTHENTICATION_OTP_MESSSGE_PROBLEM: '500/unable-to-send-authentication-message',
  SQL_ERROR: `500/problem-crating-new-user`, 
  INCORRECT_OTP: '400/Incorrect-otp-entered'
}

module.exports = ErrorTypes
```

## Authentication flow

1. User enters email address & password 
2. Authentication code is sent to email address or error is thrown 
3. User Verifies the authentication, user authentication Process completes 

#### Registrating User Sample Query 

Almost all the auth Queries return three things 

Where 
```
success: boolean 
userID: int
email: string (optional only available when new user is created)
```
<strong> Note </strong> From user privacy protection, email Id isn't added or returned in the payload 

```
mutation {
  RegisterUser(
     body: {
   		email:"irohitbhatia@outlook.com",
      password: "rohit1243"
  	}
  ) {
    userId
  }
}
```

Response from above user 

```
{
  "data": {
    "RegisterUser": {
      "userId": 81763535
    }
  }
}
```

#### Verify OTP 

```
mutation {
  userOtpVerification(
     body: {
   		email:"irohitbhatia@outlook.com",
      generated_otp: 581109
  	}
  ) {
    userId, 
    accessToken, 
    success
  }
}
```

Response from above would be 

```
{
  "data": {
    "userOtpVerification": {
      "userId": 81763535,
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgxNzYzNTM1LCJpYXQiOjE1NjUwOTc1NDcsImV4cCI6MTU2NTcwMjM0NywiaXNzIjoiVlBBUksifQ.DvrEsAjqVGZddelcBI6506d8s7GOiinDUbzD1ROVNZw",
      "success": true
    }
  }
}
```
#### Login User

Query
``` 
mutation {
  loginUser(
     body: {
   		email:"irohitbhatia@gmail.com",
      password: "rohitrohit"
  	}
  ) {
    userId, 
    accessToken, 
    success
  }
}
```
Response 
```
{
  "data": {
    "loginUser": {
      "userId": 54867980,
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU0ODY3OTgwLCJpYXQiOjE1NjUwOTc4NzcsImV4cCI6MTU2NTcwMjY3NywiaXNzIjoiVlBBUksifQ.wZNRKw7jCv59BxxVu8Cmf3njEnE69Ze99simYsuR7zE",
      "success": true
    }
  }
}
```
<strong> Note: </strong> Authentication does not have any root query


## Known Pending tasks (for now)

1. Setup husky and opinionated style coding

2. Unit testing

3. finding if email address is .edu

4. Resend OTP message and expiring OTP text 

5. If user OTP is verified, user can't verify otp again



## Dummy Mutation 

Mutation are divided into two segments, 
1. User based Mutation 
2. Authentication Based Mutations 

Sample Mutations 


## Dummy Query 

This how you write Dummy Query to get data from GraphiQL 

```
{
  catWorksPersonal(userId: 1234) {
      id
      userDashboard {
    		id
      }
    }
}
```

Queries for Mutation
