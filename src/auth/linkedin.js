const querystring = require('querystring')
const axios = require('axios')
const config = require('./../config')
const scope ='r_emailaddress r_liteprofile r_basicprofile w_member_social'
const clientId = config.LINKEDIN_CLIENT_ID
const clientSecret = config.LINKEDIN_CLIENT_SECRET
const redirectUri =  config.BASE_URL + 'auth/linkedin/callback'
class LinkedIn {
	getAuthorizationUrl () {
		let url = `https://www.linkedin.com/oauth/v2/authorization?client_id=${querystring.escape(clientId)}&redirect_uri=${querystring.escape(redirectUri)}&scope=${querystring.escape(scope)}&response_type=code`
		return url
  }
  
	async exchangeCode(code) {
		const data = {
			grant_type: 'authorization_code',
			redirect_uri: redirectUri,
			client_id: clientId,
			client_secret: clientSecret,
			code
		}
		const accessToken =  await axios.post('https://www.linkedin.com/oauth/v2/accessToken', querystring.stringify(data))
		return accessToken.data
	}
}

module.exports = LinkedIn
