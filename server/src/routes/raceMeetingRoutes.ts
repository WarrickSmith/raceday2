import { Elysia } from 'elysia'
import { raceMeetingService } from '../services/raceMeetingService'

const raceMeetingRoutes = new Elysia({ prefix: '/race-meetings' })

raceMeetingRoutes
  .get('/fetch', async ({ set }) => {
    try {
      const result = await raceMeetingService.fetchAndStoreRaceMeetings()
      set.status = 200
      console.log(
        '\x1b[35m%s\x1b[0m',
        'Successfully fetched and stored race meetings'
      )
      return result
    } catch (error) {
      set.status = 500
      return { message: 'Error fetching and storing race meetings' }
    }
  })
  .get('/', async ({ set }) => {
    try {
      const raceMeetings = await raceMeetingService.getAllRaceMeetings()
      set.status = 200
      console.log('\x1b[35m%s\x1b[0m', 'Successfully fetched all race meetings')
      return raceMeetings
    } catch (error) {
      set.status = 500
      return { message: 'Error fetching race meetings' }
    }
  })
  .get('/today', async ({ set }) => {
    try {
      const raceMeetings = await raceMeetingService.getTodaysRaceMeetings()
      set.status = 200
      console.log(
        '\x1b[35m%s\x1b[0m',
        "Successfully fetched today's race meetings"
      )
      return raceMeetings
    } catch (error) {
      set.status = 500
      return { message: "Error fetching today's race meetings" }
    }
  })
  .get('/:id', async ({ params, set }) => {
    try {
      const raceMeeting = await raceMeetingService.getRaceMeetingById(params.id)
      if (!raceMeeting) {
        set.status = 404
        return { message: 'Race meeting not found' }
      }
      set.status = 200
      console.log(
        '\x1b[35m%s\x1b[0m',
        `Successfully fetched race meeting with id ${params.id}`
      )
      return raceMeeting
    } catch (error) {
      set.status = 500
      return { message: 'Error fetching race meeting' }
    }
  })
  .post('/', async ({ body, set }) => {
    try {
      const newRaceMeeting = await raceMeetingService.createRaceMeeting(body)
      set.status = 201
      console.log('\x1b[35m%s\x1b[0m', 'Successfully created new race meeting')
      return newRaceMeeting
    } catch (error) {
      set.status = 500
      return { message: 'Error creating race meeting' }
    }
  })
  .put('/:id', async ({ params, body, set }) => {
    try {
      const updatedRaceMeeting = await raceMeetingService.updateRaceMeeting(
        params.id,
        body
      )
      if (!updatedRaceMeeting) {
        set.status = 404
        return { message: 'Race meeting not found' }
      }
      set.status = 200
      console.log(
        '\x1b[35m%s\x1b[0m',
        `Successfully updated race meeting with id ${params.id}`
      )
      return updatedRaceMeeting
    } catch (error) {
      set.status = 500
      return { message: 'Error updating race meeting' }
    }
  })
  .delete('/:id', async ({ params, set }) => {
    try {
      const deleted = await raceMeetingService.deleteRaceMeeting(params.id)
      if (!deleted) {
        set.status = 404
        return { message: 'Race meeting not found' }
      }
      set.status = 204
      console.log(
        '\x1b[35m%s\x1b[0m',
        `Successfully deleted race meeting with id ${params.id}`
      )
      return null
    } catch (error) {
      set.status = 500
      return { message: 'Error deleting race meeting' }
    }
  })

export default raceMeetingRoutes
