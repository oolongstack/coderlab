//nodejs自带的库，用于密码加密
const crypto = require('crypto')

const md5password = (pwd) => {
    let md5 = crypto.createHash('md5')

    const res = md5.update(pwd).digest('hex')
 
    return res
}

module.exports = md5password