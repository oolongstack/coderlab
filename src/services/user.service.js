const connections = require('../app/database')
class UserService {
    async create(user) {
        //将user存贮到数据库中
        const { name, password } = user;
        const statement = `INSERT INTO users (name,password) VALUES (?,?);`;
        const res = await connections.execute(statement,[name,password]);
        return res[0]
    }
    async getUserByName(name){
        const statement = `SELECT * FROM users WHERE name = ?;`;
        const res = await connections.execute(statement,[name])
        return res[0]
    }
    //将头像链接保存到users表中
    async saveAvatarInUsers(avatarUrl,userId){
        const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
        const [result] = await connections.execute(statement,[avatarUrl,userId])
        return result
    }
}
module.exports = new UserService();