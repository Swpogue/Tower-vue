import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class TicketsController extends BaseController {

  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTickets)
      .delete('/:ticketId', this.deleteTicket)
  }
  async createTickets(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticketData = await ticketsService.createTicket(req.body)
      return res.send(ticketData)
    } catch (error) {
      next(error)
    }
  }
  async deleteTicket(req, res, next) {
    try {
      const message = await ticketsService.removeTicket(req.params.ticketId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }


}