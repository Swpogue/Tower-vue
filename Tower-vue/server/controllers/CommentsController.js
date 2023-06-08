import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComments)
    .delete('/:commentId', this.deleteComment)
  }
  async createComments(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComments(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  
  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

}