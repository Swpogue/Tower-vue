import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TowerEventsService {
  async createEvent(towerData) {
    
    const towerEvent = await dbContext.TowerEvents.create(towerData)
    await towerEvent.populate('creator ticketCount')
    return towerEvent
  }
  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator ticketCount')
    return towerEvents
    
  }
  async findEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator ticketCount')
    if (!towerEvent) throw new BadRequest(`Event at id: ${towerEventId} could not be found.`)
    return towerEvent
  }
  async editEvent(towerEventData, towerEventId, userId) {
    const originalEvent = await this.findEventById(towerEventId)
    
    if (originalEvent.creatorId != userId) {
      throw new Forbidden("You can't Edit This!")
    }
    if (originalEvent.isCanceled == true) throw new BadRequest("Can't UnCancel An Event!")
    originalEvent.name = towerEventData.name || originalEvent.name
    originalEvent.description = towerEventData.description || originalEvent.description
    originalEvent.location = towerEventData.location || originalEvent.location
    originalEvent.capacity = towerEventData.capacity || originalEvent.capacity
    originalEvent.startDate = towerEventData.startDate || originalEvent.startDate
    // originalEvent.isCanceled = towerEventData.isCanceled || originalEvent.isCanceled
    originalEvent.type = towerEventData.type || originalEvent.type
    originalEvent.coverImg = towerEventData.coverImg || originalEvent.coverImg
    
    await originalEvent.save()
    return originalEvent
  }

  async eventCanceled(towerEventId, userId) {
   const towerEvent = await this.findEventById(towerEventId)

   if (towerEvent.creatorId != userId) throw new Forbidden("Not your Event!")

   towerEvent.isCanceled = true
   await towerEvent.save()
   return towerEvent

  }
  
}

export const towerEventsService = new TowerEventsService