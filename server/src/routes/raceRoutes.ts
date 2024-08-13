import { Elysia, t } from 'elysia'
import { raceService } from '../services/raceService'

const raceRoutes = new Elysia({ prefix: '/races' })

raceRoutes
  .get('/', async ({ set }) => {
    try {
      const races = await raceService.getAllRaces()
      set.status = 200
      console.log('\x1b[35m%s\x1b[0m', ' ✅ Successfully fetched all races')
      return races
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
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched races for meeting: ${params.meetingId}`
        )
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

  .get(
    '/:id',
    async ({ params, set }) => {
      try {
        const race = await raceService.getRaceById(params.id)
        if (!race) {
          set.status = 404
          return { message: 'Race not found' }
        }
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched race: ${params.id}`
        )
        return race
      } catch (error) {
        set.status = 500
        return { message: 'Error fetching race' }
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  .get('/today', async ({ set }) => {
    try {
      const races = await raceService.getTodaysRaces()
      set.status = 200
      console.log('\x1b[35m%s\x1b[0m', " ✅ Successfully fetched today's races")
      return races
    } catch (error) {
      set.status = 500
      return { message: "Error fetching today's races" }
    }
  })

export default raceRoutes
