const FileService = require('../services/file.service')
const UserService = require('../services/user.service')
const {APP_PORT,APP_HOST} = require('../app/config')
class FileController{
    async saveAvatarInfo(ctx,next){
        //拿到上传的头像的信息
        const {filename,mimetype,size} = ctx.req.file
        //拿到用户ID
        const {id} = ctx.user;
        //保存头像到avatar表
        await FileService.createAvatar(filename,mimetype,size,id)
        //将这个头像链接放入users表中的avatar_id字段中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
        //将头像链接放入，user表中
        await UserService.saveAvatarInUsers(avatarUrl,id)
        ctx.body = "上传头像成功~"
    }
    async savePictureInfo(ctx,next){
        //拿到存放图片的数组
        const files = ctx.req.files;
        const {id} = ctx.user;
        const {momentId} = ctx.query;

        //将图片存入数据库
        for (let file of files){
            const {filename,mimetype,size} = file
            
            await FileService.createPicture(filename,mimetype,size,momentId,id)
        }
        ctx.body = "动态配图上传完成~"
    }
}
module.exports = new FileController();