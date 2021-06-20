const errorType = require('../constants/error-type')
const errorHamdler = (error,ctx) =>{
    switch(error.message){
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400 //bad request
            message = "用户名或密码不能为空~"
            break;
        case errorType.USER_ALREADY_EXISTS:
            status = 409 //conflict
            message = "用户名不能重复~"
            break;
        case errorType.USER_DOSE_NOT_EXIST:
            status = 400 //参数错误
            message = "该用户不存在~"
            break;
        case errorType.PASSWORD_IS_INCORRENT:
            status = 400 //参数错误
            message = "密码错误~"
            break;
        case errorType.UNAUTHOPIZATION:
            status = 401//参数错误
            message = "没有授权哦~"
            break;
        case errorType.DOSE_NOT_HAVE_TOKEN:
            status = 401//参数错误
            message = "没有授权哦~"
            break;
        case errorType.UNPERMISSION:
            status = 401//参数错误
            message = "你没有权限操作~"
            break;
        default:
            status = 404;
            message = "Not Found"
    }
    ctx.status = status;
    ctx.body = message;
}
module.exports = errorHamdler