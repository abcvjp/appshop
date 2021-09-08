module.exports = {
  tags: ["product"],
  summary: "delete products",
  operationId: "deleteProducts",
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
            categoryIds: {
              type: "array",
              items: {
                type: "string",
                format: "uuidv4",
                description: "product id",
              },
            },
          },
          example: {
            productIds: [
              "d08e5a2d-fba2-4d5b-90cd-8cc1cd90e989",
              "d278a1cb-d2e9-47a0-afd2-36925ca84e60",
            ],
          },
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
  },
};
