const connections = require('../app/database')
class FileService {
    async createAvatar(filename,mimetype,size,userId){
        const statement = `
        INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);
        `;
        const [result] = await connections.execute(statement, [filename,mimetype,size,userId])
        return result
    }

    async getAvatarByUserId(userId){
        const statement = `
        SELECT * FROM avatar WHERE user_id = ?;
        `;
        const [result] = await connections.execute(statement,[userId])
        return result 
    }
    async createPicture(filename,mimetype,size,momentId,userId){
        const statement = `INSERT INTO file (filename,mimetype,size,moment_id,user_id) VALUES (?,?,?,?,?);`;
        const [result] = await connections.execute(statement, [filename,mimetype,size,momentId,userId])
        return result
    }
    async getFileByFilename(filename){
        const statement = `SELECT * FROM file WHERE filename = ?;`;
        const [result] = await connections.execute(statement, [filename])
        return result
    }
}

module.exports = new FileService();