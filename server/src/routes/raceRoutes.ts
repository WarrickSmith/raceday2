// raceRoutes.ts
import { Elysia, t } from 'elysia'
import { raceService } from '../services/raceService'
import {
  handleError,
  handleSuccess,
  validateId,
  createDetailObject,
} from '../utils/routeUtils'

const raceRoutes = new Elysia({ prefix: '/races' })

raceRoutes
  .get(
    '/allraces',
    async ({ set }) => {
      try {
        const races = await raceService.getAllRaces()
        return handleSuccess(
          set,
          ` ✅ Successfully fetched ${races.length} races`,
          races
        )
      } catch (error) {
        return handleError(set, error, 'Error fetching races:')
      }
    },
    {
      detail: createDetailObject(
        'Fetch all races in the database',
        ['Races'],
        'RaceArray'
      ),
    }
  )

  .get(
    '/meeting/:meetingId',
    async ({ params, set }) => {
      try {
        validateId(params.meetingId)
        const races = await raceService.getRacesByMeetingId(params.meetingId)
        return handleSuccess(
          set,
          ` ✅ Successfully fetched ${races.length} races for meeting: ${params.meetingId}`,
          races
        )
      } catch (error) {
        if (error instanceof Error && error.message === 'Invalid ID format') {
          set.status = 400
          return { message: 'Invalid meeting ID format' }
        }
        return handleError(set, error, 'Error fetching races for meeting:')
      }
    },
    {
      params: t.Object({
        meetingId: t.String(),
      }),
      detail: createDetailObject(
        'Fetch all races for a meeting by the meeting ID',
        ['Races'],
        'RaceArray'
      ),
    }
  )

  .get(
    '/:id',
    async ({ params, set }) => {
      try {
        validateId(params.id)
        const race = await raceService.getRaceById(params.id)
        if (!race) {
          set.status = 404
          return { message: 'Race not found' }
        }
        return handleSuccess(
          set,
          ` ✅ Successfully fetched race: ${params.id}`,
          race
        )
      } catch (error) {
        if (error instanceof Error && error.message === 'Invalid ID format') {
          set.status = 400
          return { message: 'Invalid race ID format' }
        }
        return handleError(set, error, 'Error fetching race:')
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: createDetailObject(
        'Fetch a single race by the race ID',
        ['Races'],
        'Race'
      ),
    }
  )

  .get(
    '/today',
    async ({ set }) => {
      try {
        const races = await raceService.getTodaysRaces()
        return handleSuccess(
          set,
          ` ✅ Successfully fetched today's ${races.length} races`,
          races
        )
      } catch (error) {
        return handleError(set, error, "Error fetching today's races:")
      }
    },
    {
      detail: createDetailObject(
        'Fetch all races for today',
        ['Races'],
        'RaceArray'
      ),
    }
  )

export default raceRoutes
