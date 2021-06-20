const fs = require('fs');
const service = require('../services/user.service')
const FileService = require('../services/file.service')
const {AVATARPATH} = require("../constants/path-types")
class UserController {
    async create(ctx,next) {
        //获取用户传递的数据
        const user = ctx.request.body
        //查询数据
        const result = await service.create(user)
        //返回数据
        ctx.body = result
    }
    //根据用户ID获取用户头像
    async avatarInfo(ctx,next){
        const {userId} = ctx.params;
        const [avatarInfo] = await FileService.getAvatarByUserId(userId)
        ctx.response.set('content-type',avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`${AVATARPATH}/${avatarInfo.filename}`)
    }
}
module.exports = new UserController()