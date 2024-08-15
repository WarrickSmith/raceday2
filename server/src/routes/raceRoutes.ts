import { Elysia, t } from 'elysia'
import { raceService } from '../services/raceService'

const raceRoutes = new Elysia({ prefix: '/races' })

raceRoutes
  .get(
    '/allraces',
    async ({ set }) => {
      try {
        const races = await raceService.getAllRaces()
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched ${races.length} races`
        )
        return races
      } catch (error) {
        set.status = 500
        console.error('\x1b[31m%s\x1b[0m', 'Error fetching races:', error)
        return { message: 'Error fetching races' }
      }
    },
    {
      detail: {
        summary: 'Fetch all races in the database',
        tags: ['Races'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RaceArray' },
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
    '/meeting/:meetingId',
    async ({ params, set }) => {
      try {
        if (!params.meetingId.match(/^[0-9a-fA-F]{24}$/)) {
          set.status = 400
          return { message: 'Invalid meeting ID format' }
        }
        const races = await raceService.getRacesByMeetingId(params.meetingId)
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched ${races.length} races for meeting: ${params.meetingId}`
        )
        return races
      } catch (error) {
        set.status = 500
        console.error(
          '\x1b[31m%s\x1b[0m',
          'Error fetching races for meeting:',
          error
        )
        return { message: 'Error fetching races for meeting' }
      }
    },
    {
      params: t.Object({
        meetingId: t.String(),
      }),
      detail: {
        summary: 'Fetch all races for a meeting by the meeting ID',
        tags: ['Races'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RaceArray' },
              },
            },
          },
          '400': {
            description: 'Invalid meeting ID format',
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
    '/:id',
    async ({ params, set }) => {
      try {
        if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
          set.status = 400
          return { message: 'Invalid race ID format' }
        }
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
        console.error('\x1b[31m%s\x1b[0m', 'Error fetching race:', error)
        return { message: 'Error fetching race' }
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: 'Fetch a single race by the race ID',
        tags: ['Races'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Race' },
              },
            },
          },
          '400': {
            description: 'Invalid race ID format',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '404': {
            description: 'Race not found',
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
    '/today',
    async ({ set }) => {
      try {
        const races = await raceService.getTodaysRaces()
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched today's ${races.length} races`
        )
        return races
      } catch (error) {
        set.status = 500
        console.error(
          '\x1b[31m%s\x1b[0m',
          "Error fetching today's races:",
          error
        )
        return { message: "Error fetching today's races" }
      }
    },
    {
      detail: {
        summary: 'Fetch all races for today',
        tags: ['Races'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RaceArray' },
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

export default raceRoutes
