module.exports = {
  tags: ['order'],
  summary: 'Get orders with multiple filters',
  operationId: 'getOrders',
  description:
    'Get orders with multiple filters. This operation is available for admin user',
  security: [
    {
      access_token: []
    }
  ],
  parameters: [
    {
      $ref: '#/parameters/CurrentPageParam'
    },
    {
      $ref: '#/parameters/PageSizeParam'
    },
    {
      $ref: '#/parameters/SortParam'
    },
    {
      $ref: '#/parameters/StartDateParam'
    },
    {
      $ref: '#/parameters/EndDateParam'
    },
    {
      $ref: '#parameters/OrderStatusParam'
    },
    {
      $ref: '#parameters/PaymentStatusParam'
    },
    {
      $ref: '#parameters/ShippingStatusParam'
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
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Order'
                }
              },
              pagination: {
                type: 'object',
                properties: {
                  currentPage: {
                    type: 'number',
                    format: 'integer',
                    minimum: 1,
                    description: 'current page'
                  },
                  pageCount: {
                    type: 'number',
                    format: 'integer',
                    minimum: 1,
                    description: 'total number of pages'
                  },
                  pageSize: {
                    type: 'number',
                    format: 'integer',
                    minimum: 1,
                    description: 'items number of per page'
                  },
                  count: {
                    type: 'number',
                    format: 'integer',
                    minimum: 0,
                    description: 'total number of items'
                  }
                }
              }
            }
          },
          example: {
            success: true,
            data: [
              {
                id: 'f6ca91da-e150-46e9-9fcc-9c50f0b0e098',
                status: 'Pending',
                order_total: 11,
                item_total: 10,
                shipping_fee: 1,
                payment_status: 'Unpaid',
                shipping_status: 'Undelivered',
                customer_name: 'Hoai dep trai',
                address: '85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi',
                email: 'example@example.com',
                phone_number: '0364120570',
                shipping_note: 'Giao hang xong nho khen hoai dep trai',
                createdAt: '2021-08-20T08:21:28.000Z',
                updatedAt: '2021-08-20T08:21:28.000Z',
                payment_method: {
                  name: 'COD'
                },
                shipping_method: {
                  name: 'Giao hàng tận nơi'
                },
                order_items: [
                  {
                    product_id: '08452667-319d-4f19-abfe-9db953a18587',
                    product_name: 'ÁO KHOÁC DÙ NAM HAHAMAN',
                    product_thumbnail:
                      'https://salt.tikicdn.com/cache/w444/ts/product/56/dd/e2/2612def5999d6417d9916a828cf054df.jpg',
                    price: 5,
                    quantity: 2
                  }
                ]
              },
              {
                id: '55929a15-cfef-4929-8a8e-05ec33281dba',
                status: 'Pending',
                order_total: 11,
                item_total: 10,
                shipping_fee: 1,
                payment_status: 'Unpaid',
                shipping_status: 'Undelivered',
                customer_name: 'Hoai dep trai',
                address: '85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi',
                email: 'example@example.com',
                phone_number: '0364120570',
                shipping_note: 'Giao hang xong nho khen hoai dep trai',
                createdAt: '2021-08-20T08:21:27.000Z',
                updatedAt: '2021-08-20T08:21:27.000Z',
                payment_method: {
                  name: 'COD'
                },
                shipping_method: {
                  name: 'Giao hàng tận nơi'
                },
                order_items: [
                  {
                    product_id: '08452667-319d-4f19-abfe-9db953a18587',
                    product_name: 'ÁO KHOÁC DÙ NAM HAHAMAN',
                    product_thumbnail:
                      'https://salt.tikicdn.com/cache/w444/ts/product/56/dd/e2/2612def5999d6417d9916a828cf054df.jpg',
                    price: 5,
                    quantity: 2
                  }
                ]
              },
              {
                id: '9e648f69-8381-4f67-b7d7-4743a78f7f34',
                status: 'Pending',
                order_total: 10,
                item_total: 10,
                shipping_fee: 1,
                payment_status: 'Unpaid',
                shipping_status: 'Undelivered',
                customer_name: 'Hoai dep trai',
                address: '85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi',
                email: 'example@example.com',
                phone_number: '0364120570',
                shipping_note: 'Giao hang xong nho khen hoai dep trai',
                createdAt: '2021-08-20T04:46:19.000Z',
                updatedAt: '2021-08-20T04:46:19.000Z',
                payment_method: {
                  name: 'COD'
                },
                shipping_method: {
                  name: 'Giao hàng tận nơi'
                },
                order_items: [
                  {
                    product_id: '08452667-319d-4f19-abfe-9db953a18587',
                    product_name: 'ÁO KHOÁC DÙ NAM HAHAMAN',
                    product_thumbnail: null,
                    price: 5,
                    quantity: 2
                  }
                ]
              }
            ],
            pagination: {
              currentPage: 1,
              pageCount: 1,
              pageSize: 3,
              count: 3
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
