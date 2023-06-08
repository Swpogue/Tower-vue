import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async getTowerEvents(){
    const res = await api.get('api/events')
    AppState.towerEvent = res.data.map(t => new TowerEvent(t))
    logger.log('EVENTS!', res.data)
  }


}

export const towerEventsService = new TowerEventsService()