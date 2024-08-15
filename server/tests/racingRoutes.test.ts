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

      meetingId = data[0]._id

      expect(response.status).toBe(200)
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

      expect(response.status).toBe(200)
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
    })

    it('should return 404 for non-existent race meeting', async () => {
      const nonExistentId = '000000000000000000000000'
      const response = await app.handle(
        new Request(`http://localhost/meetings/${nonExistentId}`)
      )

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data).toEqual({ message: 'Race meeting not found' })
    })

    it('should return 400 for invalid race meeting ID format', async () => {
      const invalidId = 'invalid-id'
      const response = await app.handle(
        new Request(`http://localhost/meetings/${invalidId}`)
      )

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data).toEqual({ message: 'Invalid race meeting ID format' })
    })

    it("should fetch all today's data", async () => {
      const response = await app.handle(
        new Request('http://localhost/meetings/alltoday')
      )
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
    })

    it("should fetch today's race meetings", async () => {
      const response = await app.handle(
        new Request('http://localhost/meetings/today')
      )
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
    })
  })

  describe('Race Routes', () => {
    it('should fetch all races', async () => {
      const response = await app.handle(
        new Request('http://localhost/races/allraces')
      )
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
    })

    it('should fetch all races for a meeting', async () => {
      const response = await app.handle(
        new Request(`http://localhost/races/meeting/${meetingId}`)
      )
      const data = await response.json()

      raceId = data[0]._id

      expect(response.status).toBe(200)
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

    it('should return 404 for non-existent race', async () => {
      const nonExistentId = '000000000000000000000000'
      const response = await app.handle(
        new Request(`http://localhost/races/${nonExistentId}`)
      )

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data).toEqual({ message: 'Race not found' })
    })

    it('should return 400 for invalid race ID format', async () => {
      const invalidId = 'invalid-id'
      const response = await app.handle(
        new Request(`http://localhost/races/${invalidId}`)
      )

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data).toEqual({ message: 'Invalid race ID format' })
    })

    it("should fetch today's races", async () => {
      const response = await app.handle(
        new Request('http://localhost/races/today')
      )
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
    })
  })

  describe('Runner Routes', () => {
    it('should fetch all runners for a race', async () => {
      const response = await app.handle(
        new Request(`http://localhost/runners/race/${raceId}`)
      )
      const data = await response.json()

      expect(response.status).toBe(200)
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

      expect(response.status).toBe(200)
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

    it('should return 404 for non-existent runner', async () => {
      const nonExistentId = '000000000000000000000000'
      const response = await app.handle(
        new Request(`http://localhost/runners/${nonExistentId}`)
      )

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data).toEqual({ message: 'Runner not found' })
    })

    it('should return 400 for invalid runner ID format', async () => {
      const invalidId = 'invalid-id'
      const response = await app.handle(
        new Request(`http://localhost/runners/${invalidId}`)
      )

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data).toEqual({ message: 'Invalid runner ID format' })
    })
  })
})
