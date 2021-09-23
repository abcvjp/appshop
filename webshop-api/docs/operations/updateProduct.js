module.exports = {
  tags: ['product'],
  summary: 'Edit a product',
  description: 'Edit a product and return that product if it would success',
  operationId: 'updateProduct',
  security: [
    {
      access_token: []
    }
  ],
  parameters: [
    {
      name: 'productId',
      in: 'path',
      description: 'product id',
      schema: {
        type: 'string',
        format: 'uuidv4'
      },
      required: true
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Product'
        },
        example: {
          category_id: 'd649137e-2e01-45cf-8ef7-50b737fd8548',
          description:
            '<p style="text-align:start;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Tên sản phẩm: Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn- HÀNG CHÍNH HÃNG</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Chất liệu: Kaki cao cấp</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Màu sắc: 2 Màu (Đen và xanh rêu)</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Size: S – M – L – XL – 2XL</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Áo Lính dạng hộp độc đáo, phong cách lính khỏe khoắn, mạnh mẽ.</span></p>\n',
          enable: true,
          meta_description:
            'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG',
          meta_keywords: 'ao so mi, ao linh my',
          meta_title:
            'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp',
          name: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
          price: 10,
          published: true,
          quantity: 30,
          root_price: 15,
          short_description:
            'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG',
          title:
            'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn',
          images: [
            {
              url: 'https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg',
              alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
              title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
            },
            {
              url: 'https://salt.tikicdn.com/ts/product/53/bd/48/fd85de4aaa30597279083e2b6203f924.jpg',
              alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
              title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
            },
            {
              url: 'https://salt.tikicdn.com/ts/product/f0/f9/63/6f987aed1912faf0248639e533616f50.jpg',
              alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
              title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
            }
          ]
        }
      }
    }
  },
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
                enum: ['true'],
                example: true
              },
              result: {
                $ref: '#/components/schemas/Product'
              }
            }
          },
          example: {
            success: true,
            data: {
              category_id: 'd649137e-2e01-45cf-8ef7-50b737fd8548',
              description:
                '<p style="text-align:start;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Tên sản phẩm: Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn- HÀNG CHÍNH HÃNG</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Chất liệu: Kaki cao cấp</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Màu sắc: 2 Màu (Đen và xanh rêu)</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Size: S – M – L – XL – 2XL</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Áo Lính dạng hộp độc đáo, phong cách lính khỏe khoắn, mạnh mẽ.</span></p>\n',
              enable: true,
              meta_description:
                'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG',
              meta_keywords: 'ao so mi, ao linh my',
              meta_title:
                'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp',
              name: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
              price: 10,
              published: true,
              quantity: 30,
              root_price: 15,
              short_description:
                'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG',
              title:
                'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn',
              images: [
                {
                  url: 'https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg',
                  alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
                  title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
                },
                {
                  url: 'https://salt.tikicdn.com/ts/product/53/bd/48/fd85de4aaa30597279083e2b6203f924.jpg',
                  alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
                  title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
                },
                {
                  url: 'https://salt.tikicdn.com/ts/product/f0/f9/63/6f987aed1912faf0248639e533616f50.jpg',
                  alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
                  title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
                }
              ]
            }
          }
        }
      }
    },
    400: {
      $ref: '#/components/responses/ValidationFailed'
    },
    401: {
      $ref: '#/components/responses/Unauthorized'
    },
    403: {
      $ref: '#/components/responses/Forbidden'
    }
  }
};
