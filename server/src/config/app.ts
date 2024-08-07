import { Elysia } from 'elysia'

export const configureApp = (app: Elysia) => {
  // Add any global middleware or configurations here
  app.onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = 404
      return 'Route not found'
    }
    console.error(error)
    set.status = 500
    return 'Internal Server Error'
  })

  return app
}
