module.exports = {
  ValidationFailed: {
    description: 'Validation Failed',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              description: 'Indicate request success or not',
              type: 'boolean',
              const: false,
              enum: [false]
              // default: false,
            },
            error: {
              type: 'object',
              description: 'Summary the error',
              properties: {
                message: {
                  type: 'string'
                },
                details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: {
                        type: 'string'
                      },
                      errorDetail: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
