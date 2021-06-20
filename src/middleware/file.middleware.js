const path = require('path');
const multer = require('koa-multer')
const Jimp = require('jimp')
const {
    AVATARPATH,
    PICTURE_PATH
} = require("../constants/path-types")
//关于头像的存储
const avatarUpload = multer({
    dest: AVATARPATH
})
const avatarHandle = avatarUpload.single('avatar')

//关于用户发布的动态的图片的存储
const pictureUpload = multer({
    dest: PICTURE_PATH
})
//第二个参数是最大值
const pictureHandle = pictureUpload.array('picture', 9)

const pictureResize = async(ctx, next) => {
    //获取所有图像信息
    const files = ctx.req.files;
    for (let file of files) {
        const destPath = path.join(file.destination, file.filename)
        Jimp.read(file.path).then(image => {
            image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
            image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
            image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
        })
    }
    await next()
}
module.exports = {
    avatarHandle,
    pictureHandle,
    pictureResize
}