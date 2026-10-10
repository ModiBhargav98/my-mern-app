require('dotenv').config();

const config = {
    PORT: process.env.PORT || 4000,
    DB_URl: process.env.MONGO_URI || "mongodb://localhost:27017/EmiCalculator",
    secretKey: process.env.JWT_SECRET || "emilogic",
    algorithm: 'HS256', //default:HS255
}

module.exports = config;
