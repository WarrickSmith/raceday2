import { Elysia, t } from 'elysia'
import { raceMeetingService } from '../services/raceMeetingService'
import { IRunner } from '../models/Runner'
import { IRace } from '../models/Race'

const raceMeetingRoutes = new Elysia({ prefix: '/meetings' })

raceMeetingRoutes
  .get(
    '/fetch-and-store',
    async ({ set }) => {
      try {
        const result = await raceMeetingService.fetchAndStoreRaceMeetings()
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ' ✅ Successfully fetched and stored race meetings'
        )
        return result
      } catch (error) {
        set.status = 500
        console.error(
          '\x1b[31m%s\x1b[0m',
          'Error fetching and storing race meetings:',
          error
        )
        return { message: 'Error fetching and storing race meetings' }
      }
    },
    {
      detail: {
        summary: 'Fetch and store todays race meetings',
        tags: ['Meetings'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MeetingArray' },
              },
            },
          },
          '400': {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    }
  )

  .get(
    '/alltoday',
    async ({ set }) => {
      try {
        const result = await raceMeetingService.getAllTodaysData()
        set.status = 200
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

        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched all ${raceMeetingsCount} race meetings, ${racesCount} races and ${runnersCount} runners for today`
        )
        return result
      } catch (error) {
        set.status = 500
        return { message: 'Error fetching and storing race meetings' }
      }
    },
    {
      detail: {
        summary: 'Fetch all todays race meetings, races and runners',
        tags: ['Meetings'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MeetingArray' },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    }
  )

  .get(
    '/allmeetings',
    async ({ set }) => {
      try {
        const raceMeetings = await raceMeetingService.getAllRaceMeetings()
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched all ${raceMeetings.length} race meetings`
        )
        return raceMeetings
      } catch (error) {
        set.status = 500
        return { message: 'Error fetching race meetings' }
      }
    },
    {
      detail: {
        summary: 'Fetch all race meetings in the database',
        tags: ['Meetings'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MeetingArray' },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    }
  )

  .get(
    '/today',
    async ({ set }) => {
      try {
        const raceMeetings = await raceMeetingService.getTodaysRaceMeetings()
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched ${raceMeetings.length} race meetings for today`
        )
        return raceMeetings
      } catch (error) {
        set.status = 500
        return { message: "Error fetching today's race meetings" }
      }
    },
    {
      detail: {
        summary: 'Fetch all race meetings for today',
        tags: ['Meetings'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MeetingArray' },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    }
  )

  .get(
    '/:id',
    async ({ params, set }) => {
      try {
        if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
          set.status = 400
          return { message: 'Invalid race meeting ID format' }
        }
        const raceMeeting = await raceMeetingService.getRaceMeetingById(
          params.id
        )
        if (!raceMeeting) {
          set.status = 404
          return { message: 'Race meeting not found' }
        }
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched race meeting with id ${params.id}`
        )
        return raceMeeting.toJSON()
      } catch (error) {
        set.status = 500
        console.error(
          '\x1b[31m%s\x1b[0m',
          'Error fetching race meeting:',
          error
        )
        return { message: 'Error fetching race meeting' }
      }
    },
    {
      detail: {
        summary: 'Fetch a single race meeting by ID',
        tags: ['Meetings'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Meeting' },
              },
            },
          },
          '400': {
            description: 'Invalid ID format',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '404': {
            description: 'Race meeting not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    }
  )

export default raceMeetingRoutes
