module.exports = {
  tags: ["order"],
  summary: "Create a new order",
  description:
    "Create (place) a new order and return that order if it would success",
  operationId: "createOrder",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            customer_name: {
              type: "string",
              nullable: false,
            },
            email: {
              type: "string",
              format: "email",
              nullable: false,
            },
            phone_number: {
              type: "string",
              format: "phone-number",
              nullable: false,
            },
            address: {
              type: "string",
              nullable: false,
            },
            shipping_note: {
              type: "string",
              nullable: false,
            },
            order_items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/OrderItem",
              },
            },
          },
          required: [
            "customer_name",
            "email",
            "phone_number",
            "address",
            "order_items",
          ],
        },
        example: {
          customer_name: "Hoai dep trai",
          address: "85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi",
          email: "example@example.com",
          phone_number: "0123456789",
          shipping_note: "Giao hang xong nho khen hoai dep trai",
          payment_method_id: 1,
          shipping_method_id: 2,
          order_items: [
            {
              product_id: "08452667-319d-4f19-abfe-9db953a18587",
              price: 7.91,
              quantity: 1,
              product_name: "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY",
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
            type: "object",
            properties: {
              success: {
                description: "Indicate request success or not",
                type: "boolean",
                enum: ["true"],
                example: true,
              },
              result: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
          example: {
            success: true,
            result: {
              id: "84ced9f5-34d8-4c0c-a1c0-6ba6bd559cfc",
              order_total: 8.91,
              item_total: 7.91,
              shipping_fee: 1,
              customer_name: "Hoai dep trai",
              address: "85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi",
              email: "example@example.com",
              phone_number: "0123456789",
              shipping_note: "Giao hang xong nho khen hoai dep trai",
              payment_method_id: 1,
              shipping_method_id: 2,
              order_items: [
                {
                  product_id: "08452667-319d-4f19-abfe-9db953a18587",
                  price: 7.91,
                  quantity: 1,
                  product_name: "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY",
                  product_thumbnail:
                    "https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg",
                },
              ],
            },
          },
        },
      },
    },
    400: {
      $ref: "#/components/responses/ValidationFailed",
    },
  },
};
