import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async getTowerEvents(){
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.towerEvents = res.data.map(t => new TowerEvent(t))
    logger.log('EVENTS!', res.data)
  }

  async getEventById(eventId){
    const res = await api.get(`api/events/${eventId}`)
    AppState.activeEvent = new TowerEvent(res.data)
    logger.log('GETTING AN EVENT!', res.data)
  }

  async createEvent(formData){
    const res = await api.post('api/events', formData)
    return res.data
  }

  async cancelEvent(towerEventId) {
    // const towerEventId = AppState.towerEvents.id
    const res = await api.delete(`api/events/${towerEventId}`)
    logger.log('CANCELED!', res.data)
    AppState.towerEvents.isCanceled = true
  }


}

export const towerEventsService = new TowerEventsService()