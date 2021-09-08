module.exports = {
  tags: ["user"],
  summary: "Logout",
  operationId: "Logout",
  security: [
    {
      access_token: [],
    },
  ],
  responses: {
    200: {
      $ref: "#/components/responses/OperationSuccess",
    },
  },
};
