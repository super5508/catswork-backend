
const express = require('express')
const app = express();
const graphqlHTTP = require("express-graphql")
//Schema
const userSchema = require('./src/schema/user')
const authSchema = require('./src/schema/auth')
//routes 
const auth = require('./src/routes/auth')
const mysql = require('mysql');
const config = require('./src/config.js')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const rfs = require("rotating-file-stream")
const cors = require('cors')
const helmet = require('helmet')
const query = require('./src/helpers/sql')
//Jwt setup
const jwtConfig = require('./src/helpers/jwt')
const bodyParser = require('body-parser')
// Path of log directors
const logDirectory = path.join(__dirname, "logs");
const responseTime = require('response-time')
// verifyUser 
const {verifyUser} = require('./src/auth/auth')
const asyncHandler = require('express-async-handler')
const errorFormater = require('./src/helpers/errorFixer')
const cookieParser = require('cookie-parser')
const notification = require('./notification');

//SQL
const { insertIntheTable, getSelectedThingFromTable, updateFieldInTable  } = require('./src/helpers/sql')
// Checking if path access and if not creating a path for logs
fs.stat(logDirectory, (err, stats) => {
  if (err) {
    console.info(`Log Directory Does not exsist, Creating directory`)
    fs.mkdirSync(logDirectory)
    console.info(`Log Directory sucessfully Created`)
  } else if (stats.isDirectory()) {
    console.info(`Log Directory Exsist, moving ahead`)
    return 
  } 
})
// Configuring rotating logs 
const stream = rfs("file.log", {
  size: "20M", // rotate every 20 MegaBytes written
  interval: "2d", // rotate daily
  path: logDirectory 
})
// Setting up middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: stream }))
app.use(helmet())
// Setting cors  
// TODO: Parsing cookies because frontends expect cookie, suggestion change it to the 
app.use(cors({credentials: true, origin: config.BASE_CLIENT_URL})) //TODO: Add here using config file
app.use(cookieParser())
//For tracking responsive time (in headers)
app.use(responseTime())
app.use('/auth', auth)
//TODO Creating status api route because of previous backend and frontend requires it 
app.get('/api/status', verifyUser, async (req, res) => {
    const userId = res.locals.userId
    const dataFromTable = await getSelectedThingFromTable('CatsWork_authentication',`userId = ${userId}`)
    if (!dataFromTable[0]) {
      res.locals.userId = ''
      return res.status(422).send('Please sign in again')
    }
    const payload = {
      email: dataFromTable[0].email,
      activeStep: dataFromTable[0].activeStep, 
      userId: userId
    }
    res.status(200).json({payload})
})

app.post('/subscribe', notification);

app.use("/GraphAuth", (req, res) => graphqlHTTP({
  schema: authSchema,
  graphiql: true,
  context: {req, res},
  customFormatErrorFn: error => { 
    const errorFormatter = {}
    if (error.message) {
      const { message, status } = errorFormater(error.message)
      errorFormater.message = message
      errorFormater.status = status
    } else {
      console.error(error)
    }
    return {
    code: errorFormater.status || 500, 
    message: errorFormater.message || 'internal server error',
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
    }
  }
})(req, res)) 
// GraphQL setup
// TODO: Change this endpoint to something more unique
app.use("/graphql", verifyUser, async(req, res) => graphqlHTTP({
  schema: userSchema, 
  graphiql: true,
  context: {req, res},
  customFormatErrorFn: error => { 
    const errorFormatter = {}
    const formateError = errorFormater(error.message)
    if (formateError) {
      const {message, status} = formateError
      errorFormater.message = message
      errorFormater.status = status
    } else {
      console.error(error)
    }
    return {
    code: errorFormater.status || 500, 
    message: errorFormater.message || 'internal server error',
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
    }
  }
})(req, res)) 
//Listen to specific post 
app.listen(config.SERVER_PORT, () => {
  console.log(`Listening for request on port ${config.SERVER_PORT}`)
});