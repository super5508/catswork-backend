const  bcrypt  =  require('bcryptjs'); 
const { insertIntheTable, getSelectedThingFromTable, updateFieldInTable  } = require('../helpers/sql')
const { genrateRandomNumber } = require('../helpers/others')
const { generateToken, verifyToken } = require('../helpers/jwt')
const ErrorTypes = require('../enums/errorTypes')
const sendEmail = require('../helpers/emailer')
const saltRounds = 10;
const { enums} = require('./../enums/commonTypes')


const createRandomNumberNotInTable = async (tableName, location, randomNumberLength) => {
  const generateNumber = genrateRandomNumber(randomNumberLength)
  const checkIfNumberExsist = await getSelectedThingFromTable(tableName, location, generateNumber)
  if (checkIfNumberExsist[0]) return createRandomNumberNotInTable(tableName, location, randomNumberLength)
  else if (!checkIfNumberExsist[0]) return generateNumber
}

//NOT USING
const createrUser = async (email, password) => {
  const hashedPassword =  bcrypt.hashSync(password, saltRounds)
  const generateOtp = await createRandomNumberNotInTable('CatsWork_authentication', 'generated_otp', 5)
  const generateUserId = await createRandomNumberNotInTable('CatsWork_authentication','userId', 7)
  const checkIfEmailExsist = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
  if (checkIfEmailExsist[0]) {
    throw new Error(ErrorTypes.EMAIL_EXISTS)
  }
  const sendOtpOverEmail = await sendEmail('irohitbhatia@Outlook.com', 'Auth Verification', `${generateOtp }`)
  const payload = {
    generated_otp: generateOtp,
    userId: generateUserId, 
    password: hashedPassword, 
    email: email
  }
  const insertNewUserInTable = await insertIntheTable('CatsWork_authentication', payload)
  return {generateUserId, email}
}

//NOT USING
const signInUser = async (email, passwordEntered, token) => {
  const getDataAssociatedwithEmail = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
  if (!getDataAssociatedwithEmail) {
    throw new Error(ErrorTypes.EMAIL_EXISTS)
  }
  if (getDataAssociatedwithEmail[0].isVerified === 0) {
   throw new Error(ErrorTypes.UNVERIFIED_EMAIL)
  }
  const { userId, password } =  getDataAssociatedwithEmail[0]
  const doesPasswordMatch = bcrypt.compareSync(passwordEntered, password)
  if (!doesPasswordMatch) {
    throw new Error(ErrorTypes.INCORRECT_PASSWORD) 
  }
  const getNewlyGeneratedAccessToken = await generateToken({userId})
  const cookie = req.cookies.cookieName;
  if (cookie === undefined){
    res.cookie('userId', getNewlyGeneratedAccessToken);
  }
  return {userId, getNewlyGeneratedAccessToken}
}


const googleAuth = async (req, res, email) => {
  const checkIfEmailExsist = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
  if (checkIfEmailExsist[0]) {
    const {userId, ActiveStep} = checkIfEmailExsist[0]
    const getNewlyGeneratedAccessToken = await generateToken({userId})
    res.cookie('userId', getNewlyGeneratedAccessToken);
    return getNewlyGeneratedAccessToken
  } else {
    const generateUserId = await createRandomNumberNotInTable('CatsWork_authentication','userId', 7)
    const payload = {
      userId: generateUserId, 
      email: email, 
      activeStep: enums.activeStep.SET_UP
    }
    const insertNewUserInTable = await insertIntheTable('CatsWork_authentication', payload)
    const getNewlyGeneratedAccessToken = await generateToken({userId: generateUserId})
    res.cookie('userId', getNewlyGeneratedAccessToken)
    return enums.activeStep.SET_UP
  }
}

//Not using
const linkedinSignUpHandler = async (userId, accessToken) => {
  const payload = {
    activeStep: enums.activeStep.ACTIVE,
    linkedinRefreshToken: `"${accessToken}"`
  }
  console.log(payload)
  const updateAuthenticationInformation = await updateFieldInTable(`CatsWork_authentication`, payload, `userId = ${userId}`)
  return true
}

//NOT USING
const userOtpVerification = async (email, userOtp) => {
    const getDataAssociatedwithEmail = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
    if (!getDataAssociatedwithEmail) {
      throw new Error(ErrorTypes.INVALID_LOGIN)
    }
    else {
      const { generated_otp, userId, ActiveStep} = getDataAssociatedwithEmail[0]
      if (ActiveStep !== 0)  throw new Error(ErrorTypes.USER_VERFIED)
      if (generated_otp == userOtp) {
        const payload = {
          activeStep: enums.activeStep.SET_UP,
        }
        const updateIsVerifiedInTable= await updateFieldInTable('CatsWork_authentication', payload, `email = "${email}"`)
        const getNewlyGeneratedAccessToken = await generateToken({userId})
        return {getNewlyGeneratedAccessToken, userId}
      } else {
        throw new Error(ErrorTypes.INCORRECT_OTP)
      }
    }
  } 


const verifyUser = async (req, res, next) => {
    const token = req.cookies.userId
    console.log(token)
    if(token) {
      try {
        const tokenVerficiation = await verifyToken(token)
        console.log(`THis is token`, tokenVerficiation)
        res.locals.userId = tokenVerficiation.userId
        console.log(res.locals.userId)
        next()
      } catch (error) {
        return res.status(401).send(`Invalid Access token`)
      }
    } else { 
     return res.status(401).send(`Not Authorized to view this.`)
    }
}



module.exports = {
  createrUser,
  signInUser,
  userOtpVerification,
  verifyUser,
  googleAuth,
  linkedinSignUpHandler
}

