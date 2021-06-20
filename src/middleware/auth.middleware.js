const jwt = require('jsonwebtoken')
const service = require('../services/user.service')
const authService = require('../services/auth.service')
const errorType = require('../constants/error-type')
const md5password = require('../utils/passwordHandle')
const { PUBLIC_KEY } = require('../app/config')
const verifyLogin = async (ctx, next) => {
    //1获取用户名和密码
    const { name, password } = ctx.request.body
    //判断用户名和密码是否为空
    if (!name || !password || name === '' || password === '') {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        ctx.app.emit('error', error, ctx)
        return
    }
    //判断用户是否存在
    const result = await service.getUserByName(name);
    //拿到用户
    const user = result[0]
    //如果user不存在
    if (!user) {
        const error = new Error(errorType.USER_DOSE_NOT_EXIST)
        ctx.app.emit('error', error, ctx)
        return
    }
    //判断密码是否正确（加密）
    if (md5password(password) != md5password(user.password)) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT)
        ctx.app.emit('error', error, ctx)
        return
    }
    //给ctx对象添加上user
    ctx.user = user
    await next()
}
const verifyAuth = async (ctx, next) => {
    // console.log("到了验证授权喽~");
    // console.log(ctx.headers);
    const authorization = ctx.headers.authorization;
    if (!authorization){
        const error = new Error(errorType.DOSE_NOT_HAVE_TOKEN)
        ctx.app.emit('error', error, ctx)
        return
    }
    const token = authorization.replace('Bearer ', '')
    //验证token(id/name/过期时间)
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        //将数据放到ctx中，因为可以在后面验证完身份后使用
        // console.log(result);
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorType.UNAUTHOPIZATION)
        ctx.app.emit('error',error,ctx)
    }
    
}
const verifyPermission = async (ctx,next) =>{
    //如果要改的动态的id能和此时登录的用户的id 在数据库可以匹配的上就允许修改
    //拿到要验证的表的名字
    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id','')
    //将表内的id拿出来
    const resourceId = ctx.params[resourceKey]
    //用户id
    const {id} = ctx.user
    const isPermission = await authService.checkResource(tableName,resourceId,id)
    if(!isPermission){
        const error = new Error(errorType.UNPERMISSION)
        ctx.app.emit('error',error,ctx)
        return
    }
     await next()
}
module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}