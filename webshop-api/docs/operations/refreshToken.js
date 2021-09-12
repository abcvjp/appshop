module.exports = {
  tags: ["user"],
  summary: "Refresh token",
  operationId: "refreshToken",
	parameters: {
		name: "refresh_token",
		in: "cookie",
		description: "refresh token",
		schema: {
			type: "string",
			format: "jwt"
		},
		required: true
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
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvaWRhaWRvdCIsInJvbGUiOiJhZG1pbiIsInRva2VuX2lkIjoiYzYwZDNiNzEtYzQxNy00Y2E2LWE0NTAtMWNiZDAxMWMyMzBiIiwiaWF0IjoxNjMxMDYzNDU0LCJleHAiOjE2MzExNDk4NTR9.qM8nLzGGhGJr6pVu2j4J2MaKKoXo8v_Xqx5M7TkZG7E",
            refresh_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvaWRhaWRvdCIsInJvbGUiOiJhZG1pbiIsInJlZnJlc2hfdG9rZW5faWQiOiIxNzk4ODBiNy0zY2MxLTQyNjgtOWZlMi0xY2U5MjNlMjQwODAiLCJpYXQiOjE2MzEwNjM0NTQsImV4cCI6MTYzMTY2ODI1NH0.dcipFDKNzo8VJbYxX4dSfkhSScGWAVZUatFuOrNGlSg",
          },
        },
      },
    },
		400: {
      $ref: "#/components/responses/BadRequest",
    },
		401: {
      $ref: "#/components/responses/Unauthorized",
    },
  },
};