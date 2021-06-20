const Router = require('koa-router')

const labelRouter = new Router({prefix:"/label"})

const {
    create,
    list
} = require('../controller/label.controller')

const {
    verifyAuth
} = require('../middleware/auth.middleware')

labelRouter.post('/',verifyAuth,create)
labelRouter.get('/',list)

module.exports = labelRouter