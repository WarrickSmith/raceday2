import { Elysia, t } from 'elysia'
import { raceService } from '../services/raceService'

const convertToNZTime = (utcDate: Date) => {
  return new Date(utcDate).toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
  })
}

const raceRoutes = new Elysia({ prefix: '/races' })
raceRoutes
  .get('/', async ({ set }) => {
    try {
      const races = await raceService.getAllRaces()
      const formattedRaces = races.map((race) => ({
        ...race.toObject(),
        norm_time: convertToNZTime(race.norm_time),
      }))
      set.status = 200
      return formattedRaces
    } catch (error) {
      set.status = 500
      return { message: 'Error fetching races' }
    }
  })

  .get(
    '/meeting/:meetingId',
    async ({ params, set }) => {
      try {
        const races = await raceService.getRacesByMeetingId(params.meetingId)
        set.status = 200
        return races
      } catch (error) {
        set.status = 500
        return { message: 'Error fetching races for meeting' }
      }
    },
    {
      params: t.Object({
        meetingId: t.String(),
      }),
    }
  )

  .get('/today', async ({ set }) => {
    try {
      const races = await raceService.getTodaysRaces()
      set.status = 200
      return races
    } catch (error) {
      set.status = 500
      return { message: "Error fetching today's races" }
    }
  })

export default raceRoutes
