module.exports = {
  tags: ["user"],
  summary: "Login",
  operationId: "Login",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              nullable: false,
            },
            password: {
              type: "string",
              nullable: false,
            },
          },
          required: ["username", "password"],
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
              user: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuidv4",
                  },
                  username: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                    enum: ["user", "admin"],
                  },
                  full_name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  avatar: {
                    type: "string",
                    format: "uri",
                    nullable: true,
                  },
                },
              },
              access_token: {
                type: "string",
                format: "jwt",
              },
              refresh_token: {
                type: "string",
                format: "jwt",
              },
            },
          },
          example: {
            success: true,
            user: {
              id: "9e432cf8-0fbf-4723-b89d-f071dee0a47b",
              username: "toidaidot",
              full_name: "Peter Parker",
              email: "toidaidot@yahoo.com",
              role: "admin",
            },
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvaWRhaWRvdCIsInJvbGUiOiJhZG1pbiIsInRva2VuX2lkIjoiYzYwZDNiNzEtYzQxNy00Y2E2LWE0NTAtMWNiZDAxMWMyMzBiIiwiaWF0IjoxNjMxMDYzNDU0LCJleHAiOjE2MzExNDk4NTR9.qM8nLzGGhGJr6pVu2j4J2MaKKoXo8v_Xqx5M7TkZG7E",
            refresh_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvaWRhaWRvdCIsInJvbGUiOiJhZG1pbiIsInJlZnJlc2hfdG9rZW5faWQiOiIxNzk4ODBiNy0zY2MxLTQyNjgtOWZlMi0xY2U5MjNlMjQwODAiLCJpYXQiOjE2MzEwNjM0NTQsImV4cCI6MTYzMTY2ODI1NH0.dcipFDKNzo8VJbYxX4dSfkhSScGWAVZUatFuOrNGlSg",
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
  },
};
