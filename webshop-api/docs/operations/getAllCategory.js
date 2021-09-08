module.exports = {
  tags: ["category"],
  summary: "Get all category",
  operationId: "getAllCategory",
  responses: {
    200: {
      description: "successfull operation",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                description: "Indicate request success or not",
                type: "boolean",
                example: true,
              },
              data: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Category",
                },
              },
            },
          },
        },
      },
    },
    404: {
      $ref: "#/components/responses/NotFound",
    },
  },
};
