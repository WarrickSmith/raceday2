import mongoose from 'mongoose'

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/raceday2'

console.log('\x1b[32m', 'MONGODB_URI set to: ', MONGODB_URI)

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI)
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
