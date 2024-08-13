import { Elysia } from 'elysia'
import { connect } from './config/database'
import raceMeetingRoutes from './routes/raceMeetingRoutes'
import raceRoutes from './routes/raceRoutes'
import runnerRoutes from './routes/runnerRoutes'
import { errorHandler } from './utils/errorHandler'
import { raceMeetingService } from './services/raceMeetingService'
import cron from 'node-cron'

const app = new Elysia()

// Connect to MongoDB
connect()
  .then(() => {
    console.log('\x1b[32m', 'Connected to MongoDB')

    // Invoke fetchAndStoreRaceMeetings immediately
    raceMeetingService
      .fetchAndStoreRaceMeetings()
      .then(() =>
        console.log(
          '\x1b[33m',
          `${
            new Date()
              .toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })
              .split(',')[0]
          } Initial race meetings fetch completed`
        )
      )
      .catch((error) =>
        console.error(
          '\x1b[31m',
          'Error in initial race meetings fetch:',
          error
        )
      )

    // Schedule daily fetch at 8:00 AM
    cron.schedule('0 8 * * *', () => {
      raceMeetingService
        .fetchAndStoreRaceMeetings()
        .then(() =>
          console.log(
            '\x1b[33m',
            `${
              new Date()
                .toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })
                .split(',')[0]
            } Daily race meetings fetch completed`
          )
        )
        .catch((error) =>
          console.error(
            '\x1b[31m',
            'Error in daily race meetings fetch:',
            error
          )
        )
    })

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
