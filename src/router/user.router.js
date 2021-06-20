const Router = require('koa-router')
const {
    verifyUser,
    handlePwd
}= require('../middleware/user.middleware')
const {
    create,
    avatarInfo
} = require('../controller/user.controller')
const userRouter = new Router({prefix:'/users'})
//verifyUser用来验证用户信息的合法性
//handlePwd用来处理密码
userRouter.post('/',verifyUser,handlePwd,create)
userRouter.get('/:userId/avatar',avatarInfo)

module.exports = userRouter