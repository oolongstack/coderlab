const errorType = require('../constants/error-type')
const service = require('../services/user.service')
const md5password = require('../utils/passwordHandle')

const verifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body
    //判断用户名和密码不能为空
    if (!name || !password || name === '' || password === '') {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        ctx.app.emit('error', error, ctx)
        return
    }
    //判断用户名不能重复
    const result = await service.getUserByName(name);
    if (result.length) {
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        ctx.app.emit('error', error, ctx)
        return
    }
    await next()
}
const handlePwd = async (ctx, next) => {
    let { password } = ctx.request.body;
    //加密密码
    ctx.request.body.password = md5password(password)
    await next()
}

module.exports = {
    verifyUser,
    handlePwd
}