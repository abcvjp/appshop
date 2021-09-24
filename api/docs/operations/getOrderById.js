module.exports = {
  tags: ['order'],
  summary: 'Get an order by id',
  operationId: 'getOrderById',
  description:
    'Get an order by order id. Note that this operation is available for admin user',
  security: [
    {
      access_token: []
    }
  ],
  parameters: [
    {
      name: 'orderId',
      in: 'path',
      description: 'order id',
      schema: {
        type: 'string',
        format: 'uuidv4'
      },
      required: true
    }
  ],
  responses: {
    200: {
      description: 'successfull operation',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                description: 'Indicate request success or not',
                type: 'boolean',
                example: true
              },
              data: {
                $ref: '#/components/schemas/Order'
              }
            }
          },
          example: {
            success: true,
            data: {
              id: '9e648f69-8381-4f67-b7d7-4743a78f7f34',
              status: 'Pending',
              order_total: 10,
              item_total: 10,
              shipping_fee: 1,
              payment_status: 'Unpaid',
              shipping_status: 'Undelivered',
              customer_name: 'Vừ A Dính',
              address: '85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi',
              email: 'someone@gmail.com',
              phone_number: '0123456789',
              shipping_note: 'Shipper cẩn thận vì nhà có chó dữ',
              createdAt: '2021-08-31T00:54:47.000Z',
              updatedAt: '2021-08-31T00:54:47.000Z',
              payment_method: {
                name: 'COD'
              },
              shipping_method: {
                name: 'Giao hàng tận nơi'
              },
              order_items: [
                {
                  product_id: '08452667-319d-4f19-abfe-9db953a18587',
                  product_name: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY',
                  product_thumbnail: null,
                  price: 5,
                  quantity: 2
                }
              ]
            }
          }
        }
      }
    },
    404: {
      $ref: '#/components/responses/NotFound'
    },
    401: {
      $ref: '#/components/responses/Unauthorized'
    }
  }
};
