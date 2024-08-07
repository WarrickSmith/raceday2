import mongoose, { Schema, Document } from 'mongoose'

export interface IRaceMeeting extends Document {
  date: Date
  betslip_type: string
  code: string
  country: string
  id: string
  name: string
  number: number
  nz: boolean
  penetrometer: string | null
  status: string
  track_dir: string
  type: string
  venue: string
  races: Schema.Types.ObjectId[]
}

const RaceMeetingSchema: Schema = new Schema({
  date: { type: Date, required: false },
  betslip_type: { type: String, required: false },
  code: { type: String, required: false },
  country: { type: String, required: false },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  number: { type: Number, required: false },
  nz: { type: Boolean, required: false },
  penetrometer: { type: String, default: null },
  status: { type: String, required: false },
  track_dir: { type: String, required: false },
  type: { type: String, required: false },
  venue: { type: String, required: false },
  races: [{ type: Schema.Types.ObjectId, ref: 'Race' }],
})

export default mongoose.model<IRaceMeeting>('RaceMeeting', RaceMeetingSchema)
