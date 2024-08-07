import mongoose, { Schema, Document } from 'mongoose'

export interface IRace extends Document {
  class: string
  id: string
  length: string
  name: string
  norm_time: Date
  number: number
  options: any[]
  overseas_number: number | null
  stake: string
  status: string
  track: string
  trackside_channel: string
  venue: string | null
  weather: string
  raceMeeting: Schema.Types.ObjectId
  runners: Schema.Types.ObjectId[]
}

const RaceSchema: Schema = new Schema({
  class: { type: String, required: false },
  id: { type: String, required: true, unique: true },
  length: { type: String, required: false },
  name: { type: String, required: false },
  norm_time: { type: Date, required: false },
  number: { type: Number, required: false },
  options: [{ type: Schema.Types.Mixed }],
  overseas_number: { type: Number, default: null },
  stake: { type: String, required: false },
  status: { type: String, required: false },
  track: { type: String, required: false },
  trackside_channel: { type: String, required: false },
  venue: { type: String, default: null },
  weather: { type: String, required: false },
  raceMeeting: {
    type: Schema.Types.ObjectId,
    ref: 'RaceMeeting',
    required: false,
  },
  runners: [{ type: Schema.Types.ObjectId, ref: 'Runner' }],
})

export default mongoose.model<IRace>('Race', RaceSchema)
