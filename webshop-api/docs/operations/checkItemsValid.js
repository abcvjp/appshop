module.exports = {
  tags: ["cart"],
  summary: "Check whether items in cart are valid or not",
  description:
    "Check whether items in cart are valid or not. If not, there will be an additional property - 'errors' - contain all error for each item",
  operationId: "checkItemsValid",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            cart_items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product_id: {
                    type: "string",
                    format: "uuidv4",
                    nullable: false,
                  },
                  price: {
                    type: "number",
                    format: "double",
                    minimum: 0,
                    nullable: false,
                  },
                  quantity: {
                    type: "number",
                    format: "double",
                    minimum: 0,
                    nullable: false,
                  },
                  product_name: {
                    type: "string",
                    nullable: false,
                  },
                },
                required: ["product_id", "price", "quantity", "product_name"],
              },
            },
          },
        },
        example: {
          cart_items: [
            {
              product_id: "08452667-319d-4f19-abfe-9db953a18587",
              product_name: "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY",
              price: 5,
              quantity: 2,
            },
            {
              product_id: "42b9177b-8bbb-4dae-88da-c2e20e8db908",
              product_name: "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 4",
              price: 5,
              quantity: 1,
            },
          ],
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
            oneOf: [
              {
                type: "object",
                properties: {
                  success: {
                    description: "Indicate all item is valid or not",
                    type: "boolean",
                    enum: ["true"],
                    example: true,
                  },
                  valid_items: {
                    allOf: [
                      {
                        $ref: "#/components/schemas/OrderItem",
                      },
                      {
                        type: "object",
                        properties: {
                          buy_able: {
                            type: "boolean",
                            enum: [true],
                          },
                        },
                      },
                    ],
                  },
                },
              },
              {
                type: "object",
                properties: {
                  success: {
                    description: "Indicate request success or not",
                    type: "boolean",
                    enum: ["false"],
                    example: false,
                  },
                  errors: {
                    type: "object",
                  },
                  valid_items: {
                    allOf: [
                      {
                        $ref: "#/components/schemas/OrderItem",
                      },
                      {
                        type: "object",
                        properties: {
                          buy_able: {
                            type: "boolean",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
          example: [
            {
              success: false,
              errors: {
                0: [
                  "Price of product has been changed, you should check again",
                ],
                1: ["Product is disabled"],
              },
              valid_items: [
                {
                  product_id: "08452667-319d-4f19-abfe-9db953a18587",
                  product_name: "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY",
                  price: 7.91,
                  quantity: 2,
                  buy_able: true,
                  product_thumbnail: {
                    url: "https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg",
                  },
                },
                {
                  product_id: "42b9177b-8bbb-4dae-88da-c2e20e8db908",
                  product_name: "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 4",
                  price: 5,
                  quantity: 1,
                  buy_able: false,
                  product_thumbnail: {
                    url: "https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg",
                  },
                },
              ],
            },
          ],
        },
      },
    },
  },
};
