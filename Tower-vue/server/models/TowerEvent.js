import { Schema } from "mongoose";



export const TowerEventSchema = new Schema({
  // towerEventId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, minLength: 3, maxLength: 80 },
  description: { type: String, default: '', minLength: 3, maxLength: 1500, required: true },
  location: { type: String, default: '', minLength: 3, maxLength: 100, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: {type: Boolean, required: true, default: false},
  type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital']},
  coverImg: { type: String, required: true, maxLength: 500, default: '' },

},
  { timestamps: true, toJSON: { virtuals: true } 
}
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})


TowerEventSchema.virtual('ticketCount',{
localField: '_id',
foreignField: 'eventId',
ref: 'Ticket',
count: true
})
