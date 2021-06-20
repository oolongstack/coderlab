const Router = require('koa-router')
const {
 verifyAuth,
 verifyPermission
}= require('../middleware/auth.middleware')
const {
    verifyLabelExists
} = require('../middleware/label.middleware')
const {
    create,
    detail,
    list,
    update,
    remove,
    addLabels,
    fileInfo
} = require('../controller/moment.controller')

const momentRouter = new Router({prefix:'/moment'})
//verifyUser用来验证用户信息的合法性
//handlePwd用来处理密码
//这是发表动态的接口
momentRouter.post('/',verifyAuth,create)
//拿到动态的接口
//通过动态id获取 
//此接口不需要权限验证 //获取单个动态
momentRouter.get('/:momentId',detail)
//获取动态列表
momentRouter.get('/',list)
//更新动态
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
//删除动态
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)
//给动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)
//获取动态配图
momentRouter.get('/images/:filename',fileInfo)

module.exports = momentRouter