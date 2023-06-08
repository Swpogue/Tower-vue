import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";



export class TowerEventsController extends BaseController{

  constructor(){
    super('api/events')
    this.router
    .get('', this.getTowerEvents)
    .get('/:towerEventId', this.findEventById)
    .get('/:towerEventId/tickets', this.findEventTickets)
    .get('/:towerEventId/comments', this.getCommentsByEventId)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createEvent)
    .put('/:towerEventId', this.editEvent)
    .delete('/:towerEventId', this.eventCanceled)
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createEvent(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async getTowerEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents()
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async findEventById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.findEventById(req.params.towerEventId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  
  async editEvent(req, res, next) {
    try {
      const towerEventData = req.body
      const towerEventId = req.params.towerEventId
      const userId = req.userInfo.id
      const editedEvent = await towerEventsService.editEvent(towerEventData, towerEventId, userId)
      res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }
  
  async eventCanceled(req, res, next) {
    try {
      const towerEvent = await towerEventsService.eventCanceled(req.params.towerEventId, req.userInfo.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
 async findEventTickets(req, res, next) {
   try {
     const eventId = req.params.towerEventId
     const tickets = await ticketsService.findEventTickets(eventId)
     return res.send(tickets)
    } catch (error) {
      next(error)
    }
    
  }
  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEventId(req.params.towerEventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  
  
}