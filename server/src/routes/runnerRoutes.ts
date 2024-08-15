// runnerRoutes.ts
import { Elysia, t } from 'elysia'
import { runnerService } from '../services/runnerService'
import {
  handleError,
  handleSuccess,
  validateId,
  createDetailObject,
} from '../utils/routeUtils'

const runnerRoutes = new Elysia({ prefix: '/runners' })

runnerRoutes
  .get(
    '/:id',
    async ({ params, set }) => {
      try {
        validateId(params.id)
        const runner = await runnerService.getRunnerById(params.id)
        if (!runner) {
          set.status = 404
          return { message: 'Runner not found' }
        }
        return handleSuccess(
          set,
          ` ✅ Successfully fetched runner ID: ${params.id}`,
          runner.toJSON()
        )
      } catch (error) {
        if (error instanceof Error && error.message === 'Invalid ID format') {
          set.status = 400
          return { message: 'Invalid runner ID format' }
        }
        return handleError(set, error, 'Error fetching runner:')
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: createDetailObject(
        'Fetch a single runner by the runner ID',
        ['Runners'],
        'Runner'
      ),
    }
  )

  .get(
    '/race/:raceId',
    async ({ params, set }) => {
      try {
        validateId(params.raceId)
        const runners = await runnerService.getRunnersByRaceId(params.raceId)
        return handleSuccess(
          set,
          ` ✅ Successfully fetched ${runners.length} runners for race ID: ${params.raceId}`,
          runners
        )
      } catch (error) {
        if (error instanceof Error && error.message === 'Invalid ID format') {
          set.status = 400
          return { message: 'Invalid race ID format' }
        }
        return handleError(set, error, 'Error fetching runners for race:')
      }
    },
    {
      params: t.Object({
        raceId: t.String(),
      }),
      detail: createDetailObject(
        'Fetch all runners for a single race by the race ID',
        ['Runners'],
        'RunnerArray'
      ),
    }
  )

export default runnerRoutes
