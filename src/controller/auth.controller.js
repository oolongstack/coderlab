// const service = require('../services/user.service') 
const {PRIMARY_KEY} = require('../app/config')
const jwt = require('jsonwebtoken')
class AuthController {
    async login(ctx,next){
        const {id,name} = ctx.user
        const token = jwt.sign({id,name},PRIMARY_KEY,{
            expiresIn: 60 * 60 * 24, // 24 hours
            algorithm:'RS256'
        })
        ctx.body = {
            id,name,token
        }
    }
    async success(ctx,next) {
        ctx.body = "授权成功了~"
    }
}
module.exports = new AuthController()