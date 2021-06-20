const LabelService = require('../services/label.service')
const verifyLabelExists = async (ctx, next) => {
    //取出所有标签
    const { labels } = ctx.request.body;
    //判断每一个标签是否在label中
    const newlabels = []
    for (const name of labels) {
        const labelResult = await LabelService.getLabelByName(name)
        const label = { name }
        if (!labelResult) {
            //标签不存在，创建标签数据
            const result = await LabelService.create(name)
            //拿到这次创建的标签的数据
            label.id = result.insertId
        }else{
            label.id = labelResult.id
        }
        newlabels.push(label)
    }
    ctx.labels = newlabels
    await next()
}

module.exports = {
    verifyLabelExists
}