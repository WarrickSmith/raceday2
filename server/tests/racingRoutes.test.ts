import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'bun:test'
import { Elysia } from 'elysia'
import mongoose from 'mongoose'
import { setupTestEnvironment, teardownTestEnvironment } from './setup'
import { createTestData } from './createTestData'

let meetingId = ''
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

  // Test Cases
  it('should fetch all race meetings', async () => {
    const response = await app.handle(new Request('http://localhost/meetings'))
    const data = await response.json()

    // save a meeting ID for subsequentsts
    meetingId = data[0]._id
    console.log('meetingId: ', meetingId)

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          country: expect.any(String),
          type: expect.any(String),
          number: expect.any(Number),
          date: expect.any(String),
          status: expect.any(String),
          races: expect.any(Array),
        }),
      ])
    )
  })

  it('should fetch a race meeting by ID', async () => {
    const response = await app.handle(
      new Request(`http://localhost/meetings/${meetingId}`)
    )
    const data = await response.json()
    expect(data._id).toBe(meetingId)
    expect(data).toHaveProperty('_id')
    expect(data).toHaveProperty('betslip_type')
    expect(data).toHaveProperty('code')
    expect(data).toHaveProperty('country')
    expect(data).toHaveProperty('date')
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('number')
    expect(data).toHaveProperty('nz')
    expect(data).toHaveProperty('penetrometer')
    expect(data).toHaveProperty('races')
    expect(data).toHaveProperty('status')
    expect(data).toHaveProperty('track_dir')
    expect(data).toHaveProperty('type')
    expect(data).toHaveProperty('venue')

    expect(data).toMatchObject({
      _id: expect.any(String),
      betslip_type: expect.any(String),
      code: expect.any(String),
      country: expect.any(String),
      date: expect.any(String),
      id: expect.any(String),
      name: expect.any(String),
      number: expect.any(Number),
      nz: expect.any(Boolean),
    })
  })
})
