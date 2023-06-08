import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService{
  async createComments(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }
  
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId}).populate('creator')
    return comments
  }
  
  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId).populate('creator')
    if (!comment) throw new BadRequest('No comment by that ID')
    if (comment.creatorId != userId) throw new Forbidden('Not your account!')
    await comment.remove()
    return 
  }
}

export const commentsService = new CommentsService