module.exports = {
  tags: ["order"],
  summary: "Update an order's information",
  description:
    "Edit an order's infomation and return that order if it would success",
  operationId: "updateOrder",
  security: [
    {
      access_token: [],
    },
  ],
  parameters: [
    {
      name: "orderId",
      in: "path",
      description: "order id",
      schema: {
        type: "string",
        format: "uuidv4",
      },
      required: true,
    },
  ],
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
          },
          required: ["customer_name", "email", "phone_number", "address"],
        },
        example: {
          customer_name: "Hoai dep trai",
          address: "85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi",
          email: "example@example.com",
          phone_number: "0123456789",
          shipping_note: "Giao hang xong nho khen hoai dep trai",
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
                $ref: "#/components/schemas/Order",
              },
            },
          },
          example: {
            success: true,
            result: {
              success: true,
              result: {
                id: "9e648f69-8381-4f67-b7d7-4743a78f7f34",
                status: "Pending",
                order_total: 10,
                item_total: 10,
                shipping_fee: 1,
                payment_status: "Unpaid",
                shipping_status: "Undelivered",
                customer_name: "Hoai dep trai",
                address: "85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi",
                email: "example@example.com",
                phone_number: "0123456789",
                shipping_note: "Giao hang xong nho khen hoai dep trai",
                createdAt: "2021-08-31T00:54:47.000Z",
                updatedAt: "2021-09-08T03:17:57.464Z",
                payment_method_id: 1,
                shipping_method_id: 2,
              },
            },
          },
        },
      },
    },
  },
};
