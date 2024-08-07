import { Context } from 'elysia'
import { raceMeetingService } from '../services/raceMeetingService'

export const raceMeetingController = {
  fetchAndStoreRaceMeetings: async ({ set }: Context) => {
    try {
      const result = await raceMeetingService.fetchAndStoreRaceMeetings()
      set.status = 200
      return result
    } catch (error) {
      set.status = 500
      return { message: 'Error fetching and storing race meetings' }
    }
  },

  getAllRaceMeetings: async ({ set }: Context) => {
    try {
      const raceMeetings = await raceMeetingService.getAllRaceMeetings()
      set.status = 200
      return raceMeetings
    } catch (error) {
      set.status = 500
      return { message: 'Error fetching race meetings' }
    }
  },

  getRaceMeetingById: async ({ params, set }: Context) => {
    try {
      const raceMeeting = await raceMeetingService.getRaceMeetingById(params.id)
      if (!raceMeeting) {
        set.status = 404
        return { message: 'Race meeting not found' }
      }
      set.status = 200
      return raceMeeting
    } catch (error) {
      set.status = 500
      return { message: 'Error fetching race meeting' }
    }
  },

  createRaceMeeting: async ({ body, set }: Context) => {
    try {
      const newRaceMeeting = await raceMeetingService.createRaceMeeting(body)
      set.status = 201
      return newRaceMeeting
    } catch (error) {
      set.status = 500
      return { message: 'Error creating race meeting' }
    }
  },

  updateRaceMeeting: async ({ params, body, set }: Context) => {
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
      return updatedRaceMeeting
    } catch (error) {
      set.status = 500
      return { message: 'Error updating race meeting' }
    }
  },

  deleteRaceMeeting: async ({ params, set }: Context) => {
    try {
      const deleted = await raceMeetingService.deleteRaceMeeting(params.id)
      if (!deleted) {
        set.status = 404
        return { message: 'Race meeting not found' }
      }
      set.status = 204
      return null
    } catch (error) {
      set.status = 500
      return { message: 'Error deleting race meeting' }
    }
  },
}
