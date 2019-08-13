const { OAuth2Client } = require('google-auth-library');
const config = require('../config')
const redirect_uri = config.BASE_URL + 'auth/google/callback'
const apiKey = config.GOOGLE_CLIENT_API_KEY
const apiSecretKey = config.GOOGLE_CLIENT_SECRET
const scope = 'email profile'
const axios = require('axios')
const { activeStep } = require('./../enums/commonTypes')
class Auth {
  constructor() {
      this.oauth2Client = new OAuth2Client(
          apiKey,
          apiSecretKey,
          redirect_uri
      )
  }

  createAuthenticationUrl() {
      let url = this.oauth2Client.generateAuthUrl({
          access_type: 'offline',
          prompt: 'consent',
          scope: scope
      });
      return url
  }

  async getTokenFromAuthorizationCode(req) {
      const tokenCode = req.query.code
      const tokensData = await this.oauth2Client.getToken(tokenCode);
      const tokens = {
          accessToken: tokensData.tokens.access_token,
          refreshToken: tokensData.tokens.refresh_token,
          expiry_date: tokensData.tokens.expiry_date
      }
      return tokens
  }

  async getUserInfo(accessToken) {
      const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', 
      {
        headers: 
        { 
            'Authorization': `Bearer ${accessToken}` 
        }
      })
    return userInfo.data
   
    }
}

module.exports = Auth