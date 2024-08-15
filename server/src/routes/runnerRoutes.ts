// src/routes/runnerRoutes.ts
import { Elysia, t } from 'elysia'
import { runnerService } from '../services/runnerService'

const runnerRoutes = new Elysia({ prefix: '/runners' })

runnerRoutes
  .get(
    '/:id',
    async ({ params, set }) => {
      try {
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
        const runners = await runnerService.getRunnersByRaceId(params.raceId)
        set.status = 200
        console.log(
          '\x1b[35m%s\x1b[0m',
          ` ✅ Successfully fetched ${runners.length} runners for race ID: ${params.raceId}`
        )
        return runners
      } catch (error) {
        set.status = 500
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
