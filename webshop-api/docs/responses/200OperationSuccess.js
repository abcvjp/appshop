module.exports = {
  OperationSuccess: {
    description: 'successfull operation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              description: 'Indicate request success or not',
              type: 'boolean',
              enum: ['true'],
              example: true
            }
          }
        },
        example: {
          success: true
        }
      }
    }
  }
};
