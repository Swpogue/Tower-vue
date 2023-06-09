import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService{
async createTicket(eventId){
  // let existingTicket = AppState.tickets.find(t=> t.eventId == eventId);
  // if (existingTicket) {
  //   Pop.error('You Only get ONE Ticket!')
    
  // } else {
    const res = await api.post('api/tickets', { eventId })
    AppState.activeEvent.ticketCount++
    AppState.tickets.push(new Ticket(res.data))
    // logger.log('TICKET TO EVENT', res.data)
    
  
}

async getTicketHoldersByEventId(eventId){
const res = await api.get(`api/events/${eventId}/tickets`)
AppState.tickets = res.data.map(t => new Ticket(t))
logger.log('GETTING TICKET HOLDERS', res.data)
}

async getMyTickets(){
  const res = await api.get(`account/tickets`)
  logger.log('GETTING MY TICKETS', res.data)
  AppState.myTickets = res.data.map(m => new Ticket(m))
  logger.log(res.data)
}
 
async deleteTicket(myTicketId){
  const res = await api.delete(`api/tickets/${myTicketId}`)
  AppState.myTickets = AppState.myTickets.filter(t => t.id != myTicketId)
  logger.log(res.data)
}

}


export const ticketsService = new TicketsService()