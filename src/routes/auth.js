const router = require('express').Router()
const { signInUser,  createrUser, verifyUser, userOtpVerification } = require('../helpers/auth')

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

router.get('/sampleAuthtestRoute', verifyUser, (req, res) => {
  console.log(`This is req headers userid ${req.headers.userId}`)
  res.send(req.headers.userId)
})
module.exports = router