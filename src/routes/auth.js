const router = require('express').Router()
const { signInUser,  createrUser, verifyUser, userOtpVerification, googleAuth, linkedinSignUpHandler } = require('./../auth/auth')
const GoogleSignIn = require('./../auth/Google')
const config = require('./../config')
const LinkedinSignIn = require('./../auth/linkedin')
const intializeGoogleClass = new GoogleSignIn()
const intializedLinkedInClass = new LinkedinSignIn()

// NOTE: Not using 
router.get('/temp', async(req, res) => {
  res.send('temp route working')
})

// NOTE: Not using 
router.post('/register', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  try {
    const createdUserToken = await createrUser(email, password)
    res.send(createdUserToken)
  } catch (err) {
    res.status(500).send(JSON.parse(JSON.stringify(err)))
  }
})

// NOTE: Not using 
router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  try {
    const createdUserToken = await signInUser(email, password)
    res.send(createdUserToken)
  } catch (err) {
    res.status(500).send(JSON.parse(JSON.stringify(err)))
  }
})

// NOTE: Not using 
router.post('/verifyUser', async (req, res) => {
  const email = req.body.email
  const otp = req.body.otp
  try {
    const createdUserToken = await userOtpVerification(email, otp)
    res.status(500).send(createdUserToken)
  } catch (err) {
    res.status(500).send(JSON.parse(JSON.stringify(err)))
  }
})

//TODO: IF doing multiple logging in the map it for seevices 
router.get('/google', async (req, res) => {
  res.redirect(intializeGoogleClass.createAuthenticationUrl())
})

router.get('/google/callback', async (req, res) => {
  const tokens = await intializeGoogleClass.getTokenFromAuthorizationCode(req)
  //TODO: Email Gives name as well
  //TODO: Since we aren't doing anything with google info, we don't need to store tokens 
  const { email } = await intializeGoogleClass.getUserInfo(tokens.accessToken)
  const getActiveState = await googleAuth(req, res, email)
  res.redirect(config.BASE_CLIENT_URL)
})

router.get('/linkedin', verifyUser, async (req, res) => {
  res.redirect(intializedLinkedInClass.getAuthorizationUrl())
})

router.get('/linkedin/callback', verifyUser, async (req, res) => {
  const userId = res.locals
  const linkedinInfo = await intializedLinkedInClass.exchangeCode(req.query.code)
  const updateAuthTable = await linkedinSignUpHandler(userId, linkedinInfo.access_token)
  res.redirect(config.BASE_CLIENT_URL)
})

router.get('/logout', verifyUser, async (req, res) => {
  res.clearCookie('userId')
  res.locals = {}
  res.redirect(config.BASE_CLIENT_URL)
})

// NOTE: Not using 
module.exports = router



// 'ya29.GlteB_ukU7MSbtdFQpqOsYm7lOh0I2u7WsGBzKi-ahb698kXDUC2PgOFDoZG9urz7T9L8RDtYNxWMXe7rOqXt9HpqkT4kkN_',
//   refreshToken: '1/TXYkK-FW0j02_BQYLiiu11NXcGfQD_D3AZIx-Ssxfto',
//   expiry_date: 1565258399692 }
// This is userInfo: { id: '102775073203963169965',
//   email: 'irohitbhatia@gmail.com',
//   verified_email: true,
//   name: 'Rohit Bhatia',
//   given_name: 'Rohit',
//   family_name: 'Bhatia',
//   picture:
//    'https://lh5.googleusercontent.com/-7HxFRQOCd9Q/AAAAAAAAAAI/AAAAAAAAAU8/pgzBQd9X6pA/photo.jpg',
//   locale: 'en' }