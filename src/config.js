const dotenv = require("dotenv");
dotenv.config();

const config = {
SERVER_PORT: process.env.PORT ? parseInt(process.env.PORT) : 7007,
BASE_URL: process.env.BASE_URL || "",
//DB Config
DB_HOST: process.env.DB_HOST || 'localhost',
DB_USER: process.env.DB_USER || 'root',
DB_PASSWORD: process.env.DB_PASSWORD || 'root',
DB_DATABASE: process.env.DB_DATABASE || 'database',
// JWT CONFIG 
JWT_ISSUER: process.env.JWT_ISSUER || 'CatsWork',
JWT_SECRET: process.env.JWT_SECRET || 'CatsWork'
}


module.exports = config