import { Elysia, t } from 'elysia'
import { runnerService } from '../services/runnerService'

const runnerRoutes = new Elysia({ prefix: '/runners' })

runnerRoutes
  .get(
    '/:id',
    async ({ params, set }) => {
      try {
        if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
          set.status = 400
          return { message: 'Invalid runner ID format' }
        }
        const runner = await runnerService.getRunnerById(params.id)
        if (!runner) {
          set.status = 404
          return { message: 'Runner not found' }
        }
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched runner ID: ${params.id}`
        )
        return runner.toJSON()
      } catch (error) {
        set.status = 500
        console.error('\x1b[31m%s\x1b[0m', 'Error fetching runner:', error)
        return { message: 'Error fetching runner' }
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: 'Fetch a single runner by the runner ID',
        tags: ['Runners'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Runner' },
              },
            },
          },
          '400': {
            description: 'Invalid runner ID format',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          '404': {
            description: 'Runner not found',
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
    '/race/:raceId',
    async ({ params, set }) => {
      try {
        if (!params.raceId.match(/^[0-9a-fA-F]{24}$/)) {
          set.status = 400
          return { message: 'Invalid race ID format' }
        }
        const runners = await runnerService.getRunnersByRaceId(params.raceId)
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched ${runners.length} runners for race ID: ${params.raceId}`
        )
        return runners
      } catch (error) {
        set.status = 500
        console.error(
          '\x1b[31m%s\x1b[0m',
          'Error fetching runners for race:',
          error
        )
        return { message: 'Error fetching runners for race' }
      }
    },
    {
      params: t.Object({
        raceId: t.String(),
      }),
      detail: {
        summary: 'Fetch all runners for a single race by the race ID',
        tags: ['Runners'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RunnerArray' },
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

export default runnerRoutes
