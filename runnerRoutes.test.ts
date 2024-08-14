import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'bun:test'
import { Elysia } from 'elysia'
import mongoose from 'mongoose'
import { setupTestEnvironment, teardownTestEnvironment } from './setup'
import { createTestData } from './createTestData'

describe('raceMeetingRoutes', () => {
  let app: Elysia
  let connection: mongoose.Connection

  beforeAll(async () => {
    const setup = await setupTestEnvironment()
    app = setup.app
    connection = setup.connection

    // Create test data after connection is established
    await createTestData()
  })

  afterAll(async () => {
    await teardownTestEnvironment(connection)
  })

  beforeEach(async () => {
    // Clear data before each test if needed
    // await RaceMeeting.deleteMany({})
  })

  // Test cases here...
})
