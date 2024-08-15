export const handleError = (set: any, error: unknown, message: string) => {
  set.status = 500
  console.error('\x1b[31m%s\x1b[0m', message, error)
  return { message: error instanceof Error ? error.message : message }
}

export const handleSuccess = (set: any, message: string, data: any) => {
  set.status = 200
  console.log('\x1b[35m%s\x1b[0m', message)
  return data
}

export const validateId = (id: string) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error('Invalid ID format')
  }
}

export const commonResponses = {
  '400': {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Error' },
      },
    },
  },
  '404': {
    description: 'Not Found',
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
}

export const createDetailObject = (
  summary: string,
  tags: string[],
  responseSchema: string
) => ({
  summary,
  tags,
  responses: {
    '200': {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: { $ref: `#/components/schemas/${responseSchema}` },
        },
      },
    },
    ...commonResponses,
  },
})
