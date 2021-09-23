module.exports = {
  tags: ['order'],
  summary: 'complete an order',
  operationId: 'completeOrder',
  security: [
    {
      access_token: []
    }
  ],
  parameters: [
    {
      name: 'orderId',
      in: 'path',
      description: 'order id',
      required: true,
      schema: {
        type: 'string',
        format: 'uuidv4'
      }
    }
  ],
  responses: {
    200: {
      $ref: '#/components/responses/OperationSuccess'
    },
    401: {
      $ref: '#/components/responses/Unauthorized'
    },
    403: {
      $ref: '#/components/responses/Forbidden'
    },
    409: {
      $ref: '#/components/responses/Conflict'
    }
  }
};
