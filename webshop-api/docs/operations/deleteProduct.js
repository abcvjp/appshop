module.exports = {
  tags: ["product"],
  summary: "delete a product",
  operationId: "deleteProduct",
  security: [
    {
      access_token: [],
    },
  ],
  parameters: [
    {
      name: "productId",
      in: "path",
      description: "product id",
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
  },
};
