const router = require('express').Router()
const { signInUser,  createrUser, verifyUser, userOtpVerification } = require('./../auth/auth')
const GoogleSignIn = require('./../auth/Google')



router.get('/temp', async(req, res) => {
  res.send('temp route working')
})


router.post('/register', async (req, res) => {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  try {
    const createdUserToken = await createrUser(email, password)
    res.send(createdUserToken)
  } catch (err) {
    console.error(err)
    res.status(500).send(JSON.parse(JSON.stringify(err)))
  }
})

router.post('/login', async (req, res) => {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  try {
    const createdUserToken = await signInUser(email, password)
    res.send(createdUserToken)
  } catch (err) {
    console.error(err)
    res.status(500).send(JSON.parse(JSON.stringify(err)))
  }
})

router.post('/verifyUser', async (req, res) => {
  const email = req.body.email
  const otp = req.body.otp
  try {
    const createdUserToken = await userOtpVerification(email, otp)
    res.status(500).send(createdUserToken)
  } catch (err) {
    console.error(err)
    res.status(500).send(JSON.parse(JSON.stringify(err)))
  }
})

//TODO: IF doing multiple logging in the map it for seevices 
const intializeGoogleClass = new GoogleSignIn()
router.get('/google', async (req, res) => {
  intializeGoogleClass.createAuthenticationUrl()
})

router.get('/', async (req, res) => {
  console.log(`Reached Google Callback`)
  const tokens = await intializeGoogleClass.getTokenFromAuthorizationCode(req)
  console.log(`These are tokens:`, tokens)
  const userInfo = await intializeGoogleClass.getUserInfo(tokens.accessToken)
  console.log(`This is userInfo:`, userInfo)

})
router.get('/sampleAuthtestRoute', verifyUser, (req, res) => {
  console.log(`This is req headers userid ${req.headers.userId}`)
  res.send(req.headers.userId)
})
module.exports = router