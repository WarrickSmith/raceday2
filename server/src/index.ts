import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { connect } from './config/database'
import raceMeetingRoutes from './routes/raceMeetingRoutes'
import raceRoutes from './routes/raceRoutes'
import runnerRoutes from './routes/runnerRoutes'
import { errorHandler } from './utils/errorHandler'
import { raceMeetingService } from './services/raceMeetingService'
import { swaggerSchemas } from './models/swaggerSchemas'
import cron from 'node-cron'

const app = new Elysia()

// Connect to MongoDB
connect()
  .then(() => {
    console.log('\x1b[32m', 'Connected to MongoDB')

    // Invoke fetchAndStoreRaceMeetings immediately
    raceMeetingService
      .fetchAndStoreRaceMeetings()
      .then(() => {
        const ServerTime = new Date().toLocaleString()
        const nzTime = new Date().toLocaleString('en-NZ', {
          timeZone: 'Pacific/Auckland',
        })
        console.log(
          '\x1b[33m',
          `Initial race meetings fetch completed at:
        Server Time time: ${ServerTime}
        New Zealand time: ${nzTime}`
        )
      })
      .catch((error) =>
        console.error(
          '\x1b[31m',
          'Error in initial race meetings fetch:',
          error
        )
      )

    // Schedule daily fetch at 8:00 AM
    // Schedule daily fetch at 8:00 AM New Zealand time
    cron.schedule(
      '0 8 * * *',
      () => {
        raceMeetingService
          .fetchAndStoreRaceMeetings()
          .then(() => {
            const ServerTime = new Date().toLocaleString()
            const nzTime = new Date().toLocaleString('en-NZ', {
              timeZone: 'Pacific/Auckland',
            })
            console.log(
              '\x1b[33m',
              `Daily race meetings fetch completed at:
        Server Time time: ${ServerTime}
        New Zealand time: ${nzTime}`
            )
          })
          .catch((error) =>
            console.error(
              '\x1b[31m',
              'Error in daily race meetings fetch:',
              error
            )
          )
      },
      {
        scheduled: true,
        timezone: 'Pacific/Auckland',
      }
    )

    // Add cross origin domain support
    app.use(cors())

    //Set up Open API Documentation on /swagger... with scalar UI
    app.use(
      swagger({
        path: '/docs',
        scalarConfig: {
          theme: 'solarized',
        },
        documentation: {
          info: {
            title: 'Race Day API Documentation',
            version: '1.0.0',
          },
          tags: [
            { name: 'Meetings', description: 'Meeting endpoints' },
            { name: 'Races', description: 'Race endpoints' },
            { name: 'Runners', description: 'Runner endpoints' },
          ],
          components: {
            schemas: swaggerSchemas as any,
          },
          servers: [
            {
              url: 'https://warricksmith.com/raceday2api',
              description: 'Production server',
            },
            {
              url: 'http://localhost:5020',
              description: 'Development server',
            },
          ],
        },
      })
    )

    // Set up routes
    app.use(raceMeetingRoutes)
    app.use(raceRoutes)
    app.use(runnerRoutes)

    // Error handling
    app.onError((error) => errorHandler(error))

    // Start the server
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log('\x1b[36m', `Server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('\x1b[31m', 'Failed to connect to MongoDB:', error)
    process.exit(1)
  })
