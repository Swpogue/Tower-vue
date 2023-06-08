import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId



export const CommentSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
  body: { type: String, minLength: 3, maxLength: 500, required: true },
},
{timestamps: true, toJSON: { virtuals: true }
}
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})