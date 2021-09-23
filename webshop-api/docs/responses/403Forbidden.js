module.exports = {
  Forbidden: {
    description: 'Forbidden/authorize error',
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
                  type: 'string',
                  example: "You don't have permission to access this"
                }
              }
            }
          }
        }
      }
    }
  }
};
