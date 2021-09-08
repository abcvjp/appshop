module.exports = {
  tags: ["order"],
  summary: "Update status for multiple orders",
  description: "Update status for multiple orders",
  operationId: "updateOrdersStatus",
  security: [
    {
      access_token: [],
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            orders: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    description: "order id",
                  },
                  status: {
                    type: "string",
                    description: "Order status",
                    enum: ["Pending", "Handling", "Completed", "Canceled"],
                  },
                },
                required: ["id", "status"],
              },
            },
          },
          required: ["orders"],
        },
        example: {
          orders: [
            { id: "84ced9f5-34d8-4c0c-a1c0-6ba6bd559cfc", status: "Handling" },
          ],
        },
      },
    },
  },
  responses: {
    200: {
      $ref: "#/components/responses/OperationSuccess",
    },
    400: {
      $ref: "#/components/responses/ValidationFailed",
    },
    401: {
      $ref: "#/components/responses/Unauthorized",
    },
    403: {
      $ref: "#/components/responses/Forbidden",
    },
    409: {
      $ref: "#/components/responses/Conflict",
    },
  },
};
