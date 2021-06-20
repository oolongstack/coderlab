const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
dotenv.config()

const PRIMARY_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'));
const {APP_PORT,MYSQL_HOST,MYSQL_PORT,MYSQL_USER,MYSQL_PWD,MYSQL_DATABASE,APP_HOST} = process.env

module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DATABASE,
    PRIMARY_KEY,
    PUBLIC_KEY
}
