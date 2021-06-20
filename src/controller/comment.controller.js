const commentService = require('../services/comment.service')
class CommentController {
    async create(ctx, next) {
        //momentId是表示给哪个动态添加评论 ，content是添加的内容
        const { momentId, content } = ctx.request.body;
        const { id } = ctx.user;
        const result = await commentService.create(momentId,content,id)
        ctx.body = result
    }
    
    async reply(ctx, next){
        //momentId是动态的id
        const { momentId, content} = ctx.request.body;
        //commentId表示回复的某一条评论的id
        const { commentId } = ctx.params;
        const { id } = ctx.user;
        const result = await commentService.reply(momentId,content,id,commentId)
        ctx.body = result
    }

    async update(ctx, next){
        const {commentId} = ctx.params;
        const {content} = ctx.request.body

        const result = await commentService.update(commentId,content)
        ctx.body = result
    }

    async remove(ctx, next){
        const {commentId} = ctx.params;
        const result = await commentService.remove(commentId)
        ctx.body = result
    }

    async list(ctx, next){
        const {momentId} = ctx.query;
        const result = await commentService.getCommentsByMomentId(momentId)
        ctx.body = result
    }
}

module.exports = new CommentController();