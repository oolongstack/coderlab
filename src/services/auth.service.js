const connections = require('../app/database')
class AuthService {
    async checkResource(tableName,id,userId){
        const statement = `
        SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;
        `;
        const [result] = await connections.execute(statement,[id,userId])
        // console.log(result);
        return result.length != 0 ? true : false
    }
}

module.exports = new AuthService();