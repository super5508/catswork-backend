## Getting Started with the project 



#### Dev Environment 
```
npm install
npm run dev
```

<strong> Note: </strong> Check the enviornment configuration, You would need to create a SQL Db and then change environment configuration accordingly. 
 
#### Prod Environment 


#### Pushing it in the production

If you are running pm2 for the first time, just paste this in the terminal 

```NODE_ENV=prod  pm2 start index.js```

for other time just do 

```npm run prod``` 

 `npm run prod` have ```pm2 stop all``` script, Since for the first time pm2 isn't working, it will throw an error.
 
 <strong> Note: </strong> If you are running production environment locally, you would need to add your iPv4 in cloud SQL in order to make connection. 

#### Creating an api endpoint in Nginx 

1. Navigate to the very root ( intentionally listing the folder's here so that you can check if you are on the correct path) 

<img width="1440" alt="Screenshot 2019-09-16 at 1 21 25 PM" src="https://user-images.githubusercontent.com/32276134/64942311-5a142e00-d886-11e9-8061-df3299f38fc9.png">

<img width="1440" alt="Screenshot 2019-09-16 at 1 22 43 PM" src="https://user-images.githubusercontent.com/32276134/64942377-80d26480-d886-11e9-819e-8475a86c893d.png">


<img width="1440" alt="Screenshot 2019-09-16 at 1 22 50 PM" src="https://user-images.githubusercontent.com/32276134/64942387-8a5bcc80-d886-11e9-9086-d6940755fb22.png">

2. Notice the pattern and see the way all the other api is added in the file 

<img width="1440" alt="Screenshot 2019-09-16 at 1 22 56 PM" src="https://user-images.githubusercontent.com/32276134/64942453-b7a87a80-d886-11e9-854f-76337d3e7abf.png">

3. Create the endpoint in a simlar fashion (best is to copy, paste it) and change the endpoint here 

4. Restart the nginx and pm2 (though pm2 isn't mandatory) and everything should work 


## Environment Configuration 

If you look at the package.json file, there are 2 important  scripts 

```
    "prod": "pm2 stop all && NODE_ENV=prod  pm2 start index.js",
    "dev": "NODE_ENV=dev nodemon index.js"
```

running npm run dev will set the environment to dev (as visinle from the above scripts) 


The environment contains two environment, Dev environment and Prod environment. 

So if dev.env file aren't present or prod.env file aren't present, then you would need to create those files. 

The values inside those dev file can be figured out by going through the `config.js` file in the backend. Anyway, Typical values for dev would look like 

```
PORT = 8080

DB_HOST = localhost
DB_USER = root
DB_PASSWORD = rohit123
DB_DATABASE = VPARK
# rohit123
# localhost
# root
JWT_ISSUER = VPARK
JWT_SECRET = VPARK
BASE_URL = http://localhost:8080/
JWT_SESSION_DURATION = 7d

NODE_EMAILER_SERVICE = gmail
NODE_EMAILER_EMAIL = irohitbhatia@gmail.com
NODE_EMAILER_PASSWORD =xxxx

GOOGLE_CALLBACK_URL = http://localhost:8080/auth/google/callback
GOOGLE_CLIENT_ID = 683425020415-vugb5cr3cl7r9lshrspnsbimds5cr92l.apps.googleusercontent.com
GOOGLE_CLIENT_ID_SECRET = OxFreb8e3cH6n9gu0xiB92jd
BASE_CLIENT_URL = http://localhost:8081

LINKEDIN_CLIENT_ID = 86qpua8sx6luq3
LINKEDIN_CLIENT_SECRET = TYgTxyIUSd3LXZwv
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

### Note: Queries Written below are outdated, View it to get a rough idea of how the backend is structured and how to write Queries using GraphQL 

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

### Root query

<strong> Note: </strong> Kindly check the SQL dumb for the fields which are mandatory and suggest changes to change SQL and Query accordingly 
<Strong> Note: </strong> Access Token should be in the header to access `user` route. This is how we are verifying token in the backend 

```
const verifyUser = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        // Verify token
        const tokenVerficiation = await verifyToken(bearerToken)
        //TODO: Use res.locals
        req.headers.userId =  tokenVerficiation.userId
        next();
      } catch (error) {
        return res.status(401).send(`Invalid Access token`)
      }
    } else {
     return res.status(401).send(`Not Authorized to view this`)
    }
}
```

### Requests to get data 

#### User Personal Data 

Query 

```
{
  catWorksPersonal {
    userId,
    name
  }
}
```

Response 

```
{
    "data": {
        "catWorksPersonal": {
            "userId": 54867980,
            "name": "Rohit"
        }
    }
}
```
 All the available for the enum can be seen at: https://github.com/craycrayfish/catswork-backend/blob/master/src/schema/catworksPersonal.js
 
 
#### User Dashboard Data 

Query 

```
{
    "data": {
        "catWorksDashboard": [
            {
                "id": 2,
                "userId": 54867980,
                "company": "Uberhunt"
            },
            {
                "id": 3,
                "userId": 54867980,
                "company": "spaceyfi"
            }
        ]
    }
}
```
Response 

```
{
    "data": {
        "catWorksDashboard": [
            {
                "id": 2,
                "userId": 54867980,
                "company": "Uberhunt"
            },
            {
                "id": 3,
                "userId": 54867980,
                "company": "spaceyfi"
            }
        ]
    }
}
```

Types Can be seen here: https://github.com/craycrayfish/catswork-backend/blob/master/src/schema/catworksDashboard.js







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
