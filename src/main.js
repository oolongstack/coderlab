const app = require('./app/index')
require('./app/database')
const config = require('./app/config')

app.listen(config.APP_PORT,()=>{
    console.log(`服务在${config.APP_PORT}端口启动喽~`);
})