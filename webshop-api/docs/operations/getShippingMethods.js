module.exports = {
  tags: ["shipping"],
  summary: "Get all shipping method",
  operationId: "getShippingMethods",
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
                  $ref: "#/components/schemas/ShippingMethod",
                },
              },
            },
          },
          example: {
            success: true,
            data: [
              {
                id: 1,
                name: "Nhận tại cửa hàng",
                enable: true,
                fee: 0,
                detail: "Nhận sản phẩm tại cửa hàng",
                createdAt: "2021-08-31T00:54:47.000Z",
                updatedAt: "2021-08-31T00:54:47.000Z",
              },
              {
                id: 2,
                name: "Giao hàng tận nơi",
                enable: true,
                fee: 1,
                detail: "Giao hàng đến tận nơi",
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
