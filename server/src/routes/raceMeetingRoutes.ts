// raceMeetingRoutes.ts
import { Elysia, t } from 'elysia'
import { raceMeetingService } from '../services/raceMeetingService'
import { IRunner } from '../models/Runner'
import { IRace } from '../models/Race'
import {
  handleError,
  handleSuccess,
  validateId,
  createDetailObject,
} from '../utils/routeUtils'

const raceMeetingRoutes = new Elysia({ prefix: '/meetings' })

raceMeetingRoutes
  .get(
    '/fetch-and-store',
    async ({ set }) => {
      try {
        const result = await raceMeetingService.fetchAndStoreRaceMeetings()
        return handleSuccess(
          set,
          ' ✅ Successfully fetched and stored race meetings',
          result
        )
      } catch (error) {
        return handleError(
          set,
          error,
          'Error fetching and storing race meetings:'
        )
      }
    },
    {
      detail: createDetailObject(
        'Fetch and store todays race meetings',
        ['Meetings'],
        'MeetingArray'
      ),
    }
  )

  .get(
    '/alltoday',
    async ({ set }) => {
      try {
        const result = await raceMeetingService.getAllTodaysData()
        const raceMeetingsCount = result.length
        const racesCount = result.reduce(
          (acc, meeting) => acc + meeting.races.length,
          0
        )
        const runnersCount = result.reduce(
          (acc, meeting) =>
            acc +
            meeting.races.reduce(
              (rAcc, race) =>
                rAcc +
                ((race as unknown as IRace).runners as unknown as IRunner[])
                  .length,
              0
            ),
          0
        )
        return handleSuccess(
          set,
          ` ✅ Successfully fetched all ${raceMeetingsCount} race meetings, ${racesCount} races and ${runnersCount} runners for today`,
          result
        )
      } catch (error) {
        return handleError(
          set,
          error,
          'Error fetching and storing race meetings'
        )
      }
    },
    {
      detail: createDetailObject(
        'Fetch all todays race meetings, races and runners',
        ['Meetings'],
        'MeetingArray'
      ),
    }
  )

  .get(
    '/allmeetings',
    async ({ set }) => {
      try {
        const raceMeetings = await raceMeetingService.getAllRaceMeetings()
        return handleSuccess(
          set,
          ` ✅ Successfully fetched all ${raceMeetings.length} race meetings`,
          raceMeetings
        )
      } catch (error) {
        return handleError(set, error, 'Error fetching race meetings')
      }
    },
    {
      detail: createDetailObject(
        'Fetch all race meetings in the database',
        ['Meetings'],
        'MeetingArray'
      ),
    }
  )

  .get(
    '/today',
    async ({ set }) => {
      try {
        const raceMeetings = await raceMeetingService.getTodaysRaceMeetings()
        return handleSuccess(
          set,
          ` ✅ Successfully fetched ${raceMeetings.length} race meetings for today`,
          raceMeetings
        )
      } catch (error) {
        return handleError(set, error, "Error fetching today's race meetings")
      }
    },
    {
      detail: createDetailObject(
        'Fetch all race meetings for today',
        ['Meetings'],
        'MeetingArray'
      ),
    }
  )

  .get(
    '/:id',
    async ({ params, set }) => {
      try {
        validateId(params.id)
        const raceMeeting = await raceMeetingService.getRaceMeetingById(
          params.id
        )
        if (!raceMeeting) {
          set.status = 404
          return { message: 'Race meeting not found' }
        }
        return handleSuccess(
          set,
          ` ✅ Successfully fetched race meeting with id ${params.id}`,
          raceMeeting.toJSON()
        )
      } catch (error) {
        if (error instanceof Error && error.message === 'Invalid ID format') {
          set.status = 400
          return { message: 'Invalid race meeting ID format' }
        }
        return handleError(set, error, 'Error fetching race meeting:')
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: createDetailObject(
        'Fetch a single race meeting by ID',
        ['Meetings'],
        'Meeting'
      ),
    }
  )

export default raceMeetingRoutes
