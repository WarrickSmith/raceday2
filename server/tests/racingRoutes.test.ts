import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { Elysia } from 'elysia'
import mongoose from 'mongoose'
import { setupTestEnvironment, teardownTestEnvironment } from './setup'
import { createTestData } from './createTestData'

let meetingId = ''
let raceId = ''
let runnerId = ''

describe('Routes', () => {
  let app: Elysia
  let connection: mongoose.Connection

  beforeAll(async () => {
    const setup = await setupTestEnvironment()
    app = setup.app
    connection = setup.connection
    await createTestData()
  })

  afterAll(async () => {
    await teardownTestEnvironment(connection)
  })

  describe('Race Meeting Routes', () => {
    it('should fetch all race meetings', async () => {
      const response = await app.handle(
        new Request('http://localhost/meetings/allmeetings')
      )
      const data = await response.json()

      // save a meeting ID for subsequent tests
      meetingId = data[0]._id

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

  describe('Race Routes', () => {
    it('should fetch all races for a meeting', async () => {
      const response = await app.handle(
        new Request(`http://localhost/races/meeting/${meetingId}`)
      )
      const data = await response.json()

      // save a race ID for subsequent tests
      raceId = data[0]._id

      expect(data[0].raceMeeting).toBe(meetingId)

      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            number: expect.any(Number),
            length: expect.any(String),
            track: expect.any(String),
          }),
        ])
      )
    })

    it('should fetch a race by ID', async () => {
      const response = await app.handle(
        new Request(`http://localhost/races/${raceId}`)
      )
      const data = await response.json()
      runnerId = data.runners[0]._id

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('_id')
      expect(data).toHaveProperty('class')
      expect(data).toHaveProperty('norm_time')
      expect(data).toHaveProperty('runners')
    })
  })

  describe('Runner Routes', () => {
    it('should fetch all runners for a race', async () => {
      const response = await app.handle(
        new Request(`http://localhost/runners/race/${raceId}`)
      )
      const data = await response.json()
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            race: expect.any(String),
            number: expect.any(Number),
            scratched: expect.any(Boolean),
          }),
        ])
      )
    })

    it('should fetch a runner by ID', async () => {
      const response = await app.handle(
        new Request(`http://localhost/runners/${runnerId}`)
      )
      const data = await response.json()
      expect(data).toHaveProperty('_id')
      expect(data).toHaveProperty('barrier')
      expect(data).toHaveProperty('handicap')
      expect(data).toHaveProperty('jockey')
      expect(data).toMatchObject({
        _id: expect.any(String),
        name: expect.any(String),
        number: expect.any(Number),
        scratched: expect.any(Boolean),
      })
    })
  })
})
