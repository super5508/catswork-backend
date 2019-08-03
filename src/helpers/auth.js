const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const { insertIntheTable, getSelectedThingFromTable } = require('./sql')
const { genrateRandomNumber } = require('./others')
const { generateToken } = require('./jwt')
const saltRounds = 10;

const createRandomNumberNotInTable = async (tableName, location, randomNumberLength) => {
  const generateNumber = genrateRandomNumber(randomNumberLength)
  const checkIfNumberExsist = await getSelectedThingFromTable(tableName, location, generateNumber)
  console.log(`This is check if number exsist value`,  checkIfNumberExsist)
  if (checkIfNumberExsist[0]) return createRandomNumberNotInTable(tableName, location, randomNumberLength)
  else if (!checkIfNumberExsist[0]) return generateNumber
}

const createrUser = async (email, password) => {
  const hashedPassword =  bcrypt.hashSync(password, saltRounds)
  const generateOtp = await createRandomNumberNotInTable('CatsWork_authentication', 'generated_otp', 5)
  const generateUserId = await createRandomNumberNotInTable('CatsWork_authentication','userId', 7)
  const checkIfEmailExsist = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
  if (checkIfEmailExsist[0]) {
    throw new Error({
      code: 303,
      message: `Email Already exsist in Databse`
    })
  } 
  const payload = {
    generated_otp: generateOtp,
    userId: generateUserId, 
    password: hashedPassword, 
    email: email
  }
  const insertNewUserInTable = await insertIntheTable('CatsWork_authentication', payload)
  const getNewlyGeneratedAccessToken = await generateToken({userId})
  return getNewlyGeneratedAccessToken
}

const signInUser = async (email, passwordEntered, token) => {
  const getDataAssociatedwithEmail = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
  if (!getDataAssociatedwithEmail) {
    throw new Error({
      code: 401,
      message: `Email does not exsist`
    })
  }
  const { userId, password } =  getDataAssociatedwithEmail[0]
  const doesPasswordMatch = bcrypt.compareSync(passwordEntered, password)
  if (!doesPasswordMatch) {
    throw new Error({
      code: 422,
      message: `Password is incorrect`
    }) 
  }
  const getNewlyGeneratedAccessToken = await generateToken({userId})
  return getNewlyGeneratedAccessToken
  //Generate token
}


module.exports = {
  createrUser,
  signInUser
}

