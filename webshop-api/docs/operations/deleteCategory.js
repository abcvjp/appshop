module.exports = {
  tags: ["category"],
  summary: "delete a category",
  operationId: "deleteCategory",
  security: [
    {
      access_token: [],
    },
  ],
  parameters: [
    {
      name: "categoryId",
      in: "path",
      description: "category id",
      required: true,
      schema: {
        type: "string",
        format: "uuidv4",
      },
    },
  ],
  responses: {
    200: {
      $ref: "#/components/responses/OperationSuccess",
    },
    401: {
      $ref: "#/components/responses/Unauthorized",
    },
    403: {
      $ref: "#/components/responses/Forbidden",
    },
  },
};
