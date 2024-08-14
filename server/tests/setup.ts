import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { Elysia } from 'elysia'
import raceMeetingRoutes from '../src/routes/raceMeetingRoutes'
import raceRoutes from '../src/routes/raceRoutes'
import runnerRoutes from '../src/routes/runnerRoutes'
import { errorHandler } from '../src/utils/errorHandler'

let mongoServer: MongoMemoryServer

export const setupTestEnvironment = async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  process.env.MONGODB_URI = mongoUri

  await mongoose.connect(mongoUri)
  console.log(`\x1b[92m  Connected to TEST MongoDB : ${mongoUri}\x1b[0m`)

  const app = new Elysia()
  app.use(raceMeetingRoutes)
  app.use(raceRoutes)
  app.use(runnerRoutes)
  app.onError((error) => errorHandler(error))

  // Wait for the connection to be fully established
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { app, connection: mongoose.connection }
}

export const teardownTestEnvironment = async (
  connection: mongoose.Connection
) => {
  await connection.close()
  await mongoServer.stop()
}
