const fs = require('fs');
const services = require('../services/moment.service')
const FileService = require('../services/file.service')
const {
    PICTURE_PATH
} = require('../constants/path-types')
class MommentController {
    async create(ctx, next) {
        const userId = ctx.user.id
        const { content } = ctx.request.body
        const info = await services.create(userId, content)
        ctx.body = info
    }
    async detail(ctx, next) {
        const momentId = ctx.params.momentId
        const result = await services.getMomentById(momentId)
        ctx.body = result
    }
    async list(ctx, next) {
        //获取offset和size
        const { offset, size } = ctx.query
        //查询列表
        const result = await services.getMomentList(offset, size)
        ctx.body = result
    }
    async update(ctx, next) {
        // console.log(ctx.params);
        const { content } = ctx.request.body
        const { momentId } = ctx.params
        //拿到验证祖册时存入的用户信息
        const res = await services.update(content, momentId)
        // console.log(res);
        ctx.body = res
    }
    async remove(ctx, next) {
        const { momentId } = ctx.params
        console.log(momentId);
        const result = await services.remove(momentId)
        ctx.body = result
    }
    async addLabels(ctx, next) {
        //获取标签的momentId
        const { labels } = ctx
        const { momentId } = ctx.params

        //添加所有标签
        for (let label of labels) {
            const isExist = await services.hasLabel(momentId, label.id)
            if (!isExist) {
                await services.addLabel(momentId, label.id)
            }
        }
        ctx.body = "给动态添加标签成功~"
    }
    async fileInfo(ctx, next) {
        const { filename } = ctx.params;
        const fileInfo = await FileService.getFileByFilename(filename);
        //通过type类型来确定拿到的图片类型
        const { type } = ctx.query;
        const types = ["large", "middle", "small"];
        
        if (types.some(item => item === type)) {
            filename = filename + '-' + type;  
           
        }
        ctx.response.set('content-type', fileInfo.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new MommentController()