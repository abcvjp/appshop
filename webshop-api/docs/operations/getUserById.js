module.exports = {
  tags: ["user"],
  summary: "Get an user by id",
  operationId: "getUserById",
  description: "Get an user by id",
  security: [
    {
      access_token: [],
    },
  ],
  parameters: [
    {
      name: "userId",
      in: "path",
      description: "user id",
      schema: {
        type: "string",
        format: "uuidv4",
      },
      required: true,
    },
  ],
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
                allOf: [
                  {
                    $ref: "#/components/schemas/User",
                  },
                  {
                    type: "object",
                    properties: {
                      category: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            format: "uuidv4",
                          },
                          name: {
                            type: "string",
                            nullable: false,
                          },
                          path: {
                            type: "string",
                            nullable: false,
                          },
                          slug: {
                            type: "string",
                            nullable: false,
                            readOnly: true,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
          example: {
            success: true,
            data: {
              id: "9e432cf8-0fbf-4723-b89d-f071dee0a47b",
              username: "toidaidot",
              role: "admin",
              full_name: "Peter Parker",
              email: "toidaidot@yahoo.com",
              avatar: null,
              createdAt: "2021-08-31T00:54:47.000Z",
              updatedAt: "2021-09-08T01:10:54.000Z",
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
