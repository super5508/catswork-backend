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



## Pending tasks (for now)
[ ] Setup husky and opinionated style coding
[ ] Unit testing
[ ] finding if email address is .edu
[ ] Resend OTP message and expiring OTP text 



## Errors 1067
[SFO ANSWER TO FIX IT](https://stackoverflow.com/questions/36882149/error-1067-42000-invalid-default-value-for-created-at)

[GraphQL Input type Error](https://stackoverflow.com/questions/45806368/graphql-error-field-type-must-be-input-type-but-got?rq=1)


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
