const Koa = require('koa')
const errorHandler = require('./error.handle')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router/index')
const app = new Koa()

app.use(bodyParser())

useRoutes(app)

app.on('error',errorHandler)

module.exports = app