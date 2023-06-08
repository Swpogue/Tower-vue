import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{
  async createComment(commentData){
    const res = await api.post('api/comments', commentData)
    AppState.comments.unshift(new Comment(res.data))
    logger.log('DID YOU COMMENT!', res.data)
  }

  async getCommentsByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    
    AppState.comments = res.data.map(c => new Comment(c))
    logger.log('COMMENT EVENTS ID', res.data)
  }



}
 
export const commentsService = new CommentsService()