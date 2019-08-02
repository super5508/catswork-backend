//Jwt setup
const jwt = require('jsonwebtoken')
const config = require('./../config')

const generateToken = ( payload, expiresIn, subject) => {
   // Payload is expected to be a plain object
   // Payload should contain user Id
   return new Promise((resolve, reject) => {
   jwt.sign(
      JSON.parse(JSON.stringify(payload)),
      JWT_SECRET, {expiresIn, subject, issuer: JWT_ISSUER }, (error, token) => {
        if (error) return reject(error)
        resolve(token);
      }
    )
  })
}

const verifyToken = (token, subject) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, { subject }, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    })
  })
}


module.exports = {
  generateToken, 
  verifyToken
}

