module.exports = {
  tags: ["payment"],
  summary: "Get all payment method",
  operationId: "getPaymentMethods",
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
                  $ref: "#/components/schemas/PaymentMethod",
                },
              },
            },
          },
          example: {
            success: true,
            data: [
              {
                id: 1,
                name: "COD",
                enable: true,
                detail: "Thanh toán bằng tiền mặt khi nhận hàng",
                createdAt: "2021-08-31T00:54:47.000Z",
                updatedAt: "2021-08-31T00:54:47.000Z",
              },
              {
                id: 2,
                name: "Chuyển khoản ngân hàng",
                enable: true,
                detail: "Chuyển khoản ngân hàng tới nơi nào có em",
                createdAt: "2021-08-31T00:54:47.000Z",
                updatedAt: "2021-08-31T00:54:47.000Z",
              },
            ],
          },
        },
      },
    },
    404: {
      $ref: "#/components/responses/NotFound",
    },
  },
};
