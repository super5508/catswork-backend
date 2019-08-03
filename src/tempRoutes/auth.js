const router = require('express').Router()
const {   createrUser } = require('../helpers/auth')

router.get('/temp', async(req, res) => {
  res.send('temp route working')
})

router.post('/register', async (req, res) => {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  try {
    const createdUserToken = await createrUser(email, password, '7h')
    res.send(createdUserToken)
  } catch (err) {
    console.error(err)
    res.status(500).send(JSON.parse(JSON.stringify(err)))
  }
})


module.exports = router