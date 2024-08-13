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
        return runner
      } catch (error) {
        set.status = 500
        return { message: 'Error fetching runner' }
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  .get(
    '/race/:raceId',
    async ({ params, set }) => {
      try {
        const runners = await runnerService.getRunnersByRaceId(params.raceId)
        set.status = 200
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
    }
  )

export default runnerRoutes
