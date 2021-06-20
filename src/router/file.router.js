const Router = require('koa-router')
const {
    avatarHandle,
    pictureHandle,
    pictureResize
} = require('../middleware/file.middleware')

const {
    verifyAuth
} = require('../middleware/auth.middleware')

const {
    saveAvatarInfo,
    savePictureInfo
} = require('../controller/file.controller')

const fileRouter = new Router({prefix:"/upload"})
// 用户头像
fileRouter.post('/avatar',verifyAuth,avatarHandle,saveAvatarInfo)
//用户发表动态时的图片 pictureResize处理图片
fileRouter.post('/picture',verifyAuth,pictureHandle,pictureResize,savePictureInfo)
module.exports = fileRouter