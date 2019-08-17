const dotenv = require("dotenv")
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, `./../${process.env.NODE_ENV}.env`)});

const config = {
SERVER_PORT: process.env.PORT ? parseInt(process.env.PORT) : 7007,
//DB Config
DB_HOST: process.env.DB_HOST || 'localhost',
DB_USER: process.env.DB_USER || 'root',
DB_PASSWORD: process.env.DB_PASSWORD || 'root',
DB_DATABASE: process.env.DB_DATABASE || 'database',
// JWT CONFIG 
JWT_ISSUER: process.env.JWT_ISSUER || 'CatsWork',
JWT_SECRET: process.env.JWT_SECRET || 'CatsWork',
JWT_SESSION_DURATION: process.env.JWT_SESSION_DURATION || '7h',
// NODE EMAILER CONFIg
NODE_EMAILER_SERVICE: process.env.NODE_EMAILER_SERVICE || 'gmail',
NODE_EMAILER_EMAIL: process.env.NODE_EMAILER_EMAIL || 'NODE_EMAILER_EMAIL',
NODE_EMAILER_PASSWORD: process.env.NODE_EMAILER_PASSWORD || 'password',
// Base URL 
BASE_URL: `http://${process.env.BASE_URL}/`,
BASE_CLIENT_URL: process.env.BASE_CLIENT_URL || 'http://localhost:8080/', 
//GOOGLE CLIENT API 
GOOGLE_CLIENT_API_KEY: process.env.GOOGLE_CLIENT_ID || '',
GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_ID_SECRET || '',
GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL || '',
// LINKEDIN CLIENT
LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID || '',
LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET || ''
}


module.exports = config