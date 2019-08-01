
const express = require('express')
const app = express();
const graphqlHTTP = require("express-graphql")
const schema = require('./src/schema/index')
const mysql = require('mysql');
const config = require('./src/config.js')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const rfs = require("rotating-file-stream")
const cors = require('cors')
const helmet = require('helmet')

//Jwt setup
const jwtConfig = require('./src/helpers/jwt')


// Path of log directors
const logDirectory = path.join(__dirname, "logs");
const responseTime = require('response-time')
const query = require('./src/helpers/sql')
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
  size: "20M", // rotate every 10 MegaBytes written
  interval: "2d", // rotate daily
  path: logDirectory 
})

app.use(morgan("combined", { stream: stream }))
app.use(helmet())


// Setting cors 
app.use(cors());

//For tracking responsive time (in headers)
app.use(responseTime())

// GraphQL setup
app.use("/user", graphqlHTTP({
  schema: schema,
  graphiql: true,
}))

// Just the test api endpoint to test services and configuration 
// TODO: remove it.
app.get('/test', async (req, res) => {
  const resultFromQuery = await query(`CatsWork_dashboard`)
  console.log(`Result from Query:`,  resultFromQuery)
  res.status(200).json(resultFromQuery[0])
});


//Listen to specific post 
app.listen(4000, () => {
  console.log("Listening for request on port 4000")
});