import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TicketsService{
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('event profile')
    return ticket
  }
  
  async removeTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('event profile')
    if (!ticket) throw new BadRequest(`Ticket ${ticketId} does not exist`)
    if (ticket.accountId != userId) throw new Forbidden("Not your Account!")
    
    await ticket.remove()
    return `${ticket.profile.name} and ${ticket.towerEvent.name} is canceled.`
    
  }
  async findEventTickets(eventId) {
    const ticket = await dbContext.Tickets.find({ eventId: eventId}).populate('event profile')
    return ticket
  }
  
  async getAccountTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId: accountId}).populate('event profile')
    return tickets
    
  }
  
}

export const ticketsService = new TicketsService()