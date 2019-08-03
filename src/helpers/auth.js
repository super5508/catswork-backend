const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const { insertIntheTable, getSelectedThingFromTable } = require('./sql')
const { genrateRandomNumber } = require('./others')
const { generateToken } = require('./jwt')

const createRandomNumberNotInTable = async (tableName, location, randomNumberLength) => {
    const generateNumber = genrateRandomNumber(randomNumberLength)
    const checkIfNumberExsist = await getSelectedThingFromTable(tableName, location, generateNumber)
    console.log(`This is check if number exsist value`,  checkIfNumberExsist)
    if (checkIfNumberExsist[0]) return createRandomNumberNotInTable(tableName, location, randomNumberLength)
    else if (!checkIfNumberExsist[0]) return generateNumber
}

const createrUser = async (email, password, expiryTime) => {
  const hashedPassword =  bcrypt.hashSync(password)
  const generateOtp = await createRandomNumberNotInTable('CatsWork_authentication', 'generated_otp', 5)
  console.log(`Generated Random Number:`, generateOtp)
  const generateUserId = await createRandomNumberNotInTable('CatsWork_authentication','userId', 7)
  const checkIfEmailExsist = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
  console.log(`Email Exsist:`,  checkIfEmailExsist)
  if (checkIfEmailExsist[0]) {
    throw new Error(`Email Already exsist`)
  } 
  const payload = {
    generated_otp: generateOtp,
    userId: generateUserId, 
    password: hashedPassword, 
    email: email
  }
  const insertNewUserInTable = await insertIntheTable('CatsWork_authentication', payload)
  console.log(`Insert in the table:`, insertNewUserInTable)
  //Genderate token
  const newPayload = {
    userId:  generateUserId 
  }
  const getNewlyGeneratedAccessToken = await generateToken(payload, expiryTime)
  console.log(`Newly Generated Access Token`,  getNewlyGeneratedAccessToken)
  return getNewlyGeneratedAccessToken
}

const signInUser = (email, password, token) => {
  
}



module.exports = {
  createrUser
}

