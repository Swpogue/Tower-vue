import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const TicketSchema = new Schema({
// id: {type: ObjectId, required: true, ref: 'Account'},
accountId: { type: ObjectId, required: true, ref: 'Account' },
eventId: { type: ObjectId, required: true, ref: 'TowerEvent' }
},
{ timestamps: true, toJSON: { virtuals: true } 
})

TicketSchema.virtual('event',{
  localField: 'eventId',
  foreignField: '_id',
  ref: 'TowerEvent',
  justOne: true
})

TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})