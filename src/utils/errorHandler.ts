import { ErrorHandler } from 'elysia'

export const errorHandler: ErrorHandler = ({ code, error, set }) => {
  console.error('Error:', error)

  if (code === 'NOT_FOUND') {
    set.status = 404
    return { error: 'Not Found' }
  }

  if (error.name === 'ValidationError') {
    set.status = 400
    return { error: 'Validation Error', details: error.message }
  }

  set.status = 500
  return { error: 'Internal Server Error' }
}
