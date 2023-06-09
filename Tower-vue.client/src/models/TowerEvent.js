

export class TowerEvent{
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.coverImg = data.coverImg
    this.creatorId = data.creatorId
    this.ticketCount = data.ticketCount
    this.creator = data.creator
  }
}

