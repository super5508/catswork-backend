const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const { insertIntheTable, getSelectedThingFromTable, updateFieldInTable  } = require('./sql')
const { genrateRandomNumber } = require('./others')
const { generateToken } = require('./jwt')
const sendEmail = require('./emailer')
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
  try {
    const sendOtpOverEmail = await sendEmail('irohitbhatia@Outlook.com', 'Auth Verification', `${generateOtp }`)
    console.info(`Response from otp over email:`, sendOtpOverEmail)
  } catch (err) {
    console.error(err)
    throw new Error({
      code: 500, 
      message: JSON.stringify(err)
    })
  }
  const payload = {
    generated_otp: generateOtp,
    userId: generateUserId, 
    password: hashedPassword, 
    email: email
  }
  const insertNewUserInTable = await insertIntheTable('CatsWork_authentication', payload)
  return true
  // const getNewlyGeneratedAccessToken = await generateToken({generateUserId})
  // return getNewlyGeneratedAccessToken
}

const signInUser = async (email, passwordEntered, token) => {
  const getDataAssociatedwithEmail = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
  if (!getDataAssociatedwithEmail) {
    throw new Error({
      code: 401,
      message: `Email does not exsist`
    })
  }
  if (getDataAssociatedwithEmail[0].isVerified === 0) {
    throw new Error({
      code: 422, 
      message:  `User not verfified`
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

const verifyUser = async (email, userOtp) => {
  const getDataAssociatedwithEmail = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
  if (!getDataAssociatedwithEmail) {
    throw new Error({
      code: 401,
      message: `Email does not exsist`
    })
  }
  else {
    const { generated_otp, userId } = getDataAssociatedwithEmail[0]
    console.log(`This is generated Otp`, generated_otp)
    if (generated_otp == userOtp) {
      const payload = {
        isVerified: 1
      }
      const updateIsVerifiedInTable= await updateFieldInTable('CatsWork_authentication', payload, 'email', `"${email}"`)
      const getNewlyGeneratedAccessToken = await generateToken({userId})
      return getNewlyGeneratedAccessToken
    } else {
      throw new Error({
        code: 401,
        message: `Incorrect otp`
      })
    }

  }
}


module.exports = {
  createrUser,
  signInUser,
  verifyUser
}

