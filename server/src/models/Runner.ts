import mongoose, { Schema, Document } from 'mongoose'

export interface IRunner extends Document {
  allowance: string | null
  barrier: string
  handicap: number | null
  jockey: string
  name: string
  number: number
  scratched: boolean
  weight: number
  race: Schema.Types.ObjectId
  raceMeeting: Schema.Types.ObjectId
}

const RunnerSchema: Schema = new Schema({
  allowance: { type: String, default: null },
  barrier: { type: String, required: false },
  handicap: { type: Number, default: null },
  jockey: { type: String, required: false },
  name: { type: String, required: false },
  number: { type: Number, required: false },
  scratched: { type: Boolean, required: false },
  weight: { type: Number, required: false },
  race: { type: Schema.Types.ObjectId, ref: 'Race', required: false },
  raceMeeting: {
    type: Schema.Types.ObjectId,
    ref: 'RaceMeeting',
    required: false,
  },
})

RunnerSchema.index({ name: 1, race: 1 }, { unique: true })

export default mongoose.model<IRunner>('Runner', RunnerSchema)
