const connections = require('../app/database')
class MomentService {
    async create(userId,content) {
        const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`;
        const [res] = await connections.execute(statement,[content,userId]);
        return res
    }
    async getMomentById(momentId){
        const statement = `
        SELECT m.id id, m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id, 'name',u.name,'avatarUrl',u.avatar_url) user,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename))
        FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN users u ON m.user_id = u.id
        WHERE m.id = ?
        `;
        const [res] = await connections.execute(statement,[momentId]);
        return res
    }
    async getMomentList(offset,size) {
        const statement = `
        SELECT m.id id, m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id, 'name',u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename))
        FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN users u ON m.user_id = u.id
        LIMIT ? , ?;
        `;
        const [res] = await connections.execute(statement,[offset,size]);
        return res
    }
    async update(content,momentId){
        const statement = `
        UPDATE moment SET content = ? WHERE id = ?;
        `;
        const [result] = await connections.execute(statement,[content,momentId])
        return result 
    }
    async remove(momentId){
        const statement = `
        DELETE FROM moment WHERE id = ?;
        `;
        const [result] = await connections.execute(statement,[momentId])
        return result
    }
    async hasLabel(momentId,labelId){
        const statement = `
        SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;
        `;
        const [result] = await connections.execute(statement,[momentId,labelId])
        return result[0] ? true : false
    }
    async addLabel(momentId,labelId){
        const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`;
        const [result] = await connections.execute(statement,[momentId,labelId])
        return result
    }
}

module.exports = new MomentService();