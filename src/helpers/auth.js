const  bcrypt  =  require('bcryptjs'); 
const { insertIntheTable, getSelectedThingFromTable, updateFieldInTable  } = require('./sql')
const { genrateRandomNumber } = require('./others')
const { generateToken, verifyToken } = require('./jwt')
const ErrorTypes = require('./../enums/errorTypes')
const sendEmail = require('./emailer')
const saltRounds = 10;


const createRandomNumberNotInTable = async (tableName, location, randomNumberLength) => {
  const generateNumber = genrateRandomNumber(randomNumberLength)
  const checkIfNumberExsist = await getSelectedThingFromTable(tableName, location, generateNumber)
  if (checkIfNumberExsist[0]) return createRandomNumberNotInTable(tableName, location, randomNumberLength)
  else if (!checkIfNumberExsist[0]) return generateNumber
}

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
  // const cookie = req.cookies.cookieName;
  // if (cookie === undefined){
  //   res.cookie('userId', getNewlyGeneratedAccessToken);
  // }
  return {userId, getNewlyGeneratedAccessToken}
}

const userOtpVerification = async (email, userOtp) => {
    const getDataAssociatedwithEmail = await getSelectedThingFromTable('CatsWork_authentication','email', `"${email}"`)
    if (!getDataAssociatedwithEmail) {
      throw new Error(ErrorTypes.INVALID_LOGIN)
    }
    else {
      const { generated_otp, userId } = getDataAssociatedwithEmail[0]
      if (generated_otp == userOtp) {
        const payload = {
          isVerified: 1
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
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        // Verify token
        const tokenVerficiation = await verifyToken(bearerToken)
        //TODO: Use res.locals
        req.headers.userId =  tokenVerficiation.userId
        next()
      } catch (error) {
        console.error(error)
        return res.status(401).send(`Invalid Access token`)
      }
    } else { 
     return res.status(401).send(`Not Authorized to view this`)
    }
}


module.exports = {
  createrUser,
  signInUser,
  userOtpVerification,
  verifyUser
}

