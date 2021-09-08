module.exports = {
  tags: ["category"],
  summary: "Create a new category",
  description:
    "Create a new category and return that category if it would success",
  operationId: "createCategory",
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
          $ref: "#/components/schemas/Category",
        },
      },
    },
  },
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
                enum: ["true"],
                example: true,
              },
              result: {
                $ref: "#/components/schemas/Category",
              },
            },
          },
          example: {
            success: true,
            result: {
              id: "d08e5a2d-fba2-4d5b-90cd-8cc1cd90e989",
              name: "Thời trang nam",
              published: true,
              description: "Thời trang dành riêng cho nam giới",
              path: "Thời trang nam",
              slug: "thoi-trang-nam",
              meta_title: "Thời trang nam",
              meta_description: null,
              meta_keywords: null,
              createdAt: "2021-08-31T00:54:47.000Z",
              updatedAt: "2021-08-31T00:54:47.000Z",
              parent_id: null,
            },
          },
        },
      },
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
