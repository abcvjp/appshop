module.exports = {
  tags: ['product'],
  summary: 'Get a product',
  operationId: 'getProduct',
  description: 'Get a product by id or slug (just by one)',
  parameters: [
    {
      $ref: '#/parameters/IdParam'
    },
    {
      $ref: '#/parameters/SlugParam'
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
                allOf: [
                  {
                    $ref: '#/components/schemas/Product'
                  },
                  {
                    type: 'object',
                    properties: {
                      category: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            format: 'uuidv4'
                          },
                          name: {
                            type: 'string',
                            nullable: false
                          },
                          path: {
                            type: 'string',
                            nullable: false
                          },
                          slug: {
                            type: 'string',
                            nullable: false,
                            readOnly: true
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          },
          example: {
            success: true,
            data: {
              id: '08452667-319d-4f19-abfe-9db953a18587',
              enable: true,
              published: true,
              name: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY',
              title:
                'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn',
              price: 5,
              quantity: 100,
              sold: 0,
              root_price: 8,
              short_description:
                'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG',
              description:
                '<strong>THÔNG TIN SẢN PHẨM:</strong></span></p>\n<p style="text-align:justify;"><span style="color: rgb(36,36,36);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Helvetica, Arial, sans-serif;">+ Tên sản phẩm: Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn- HÀNG CHÍNH HÃNG</span></p>',
              images: [
                {
                  url: 'https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg'
                },
                {
                  url: 'https://salt.tikicdn.com/ts/product/53/bd/48/fd85de4aaa30597279083e2b6203f924.jpg'
                },
                {
                  url: 'https://salt.tikicdn.com/ts/product/f0/f9/63/6f987aed1912faf0248639e533616f50.jpg'
                }
              ],
              slug: 'ao-so-mi-dai-tay-linh-my-u458-us-army',
              meta_title:
                'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp',
              meta_description: null,
              meta_keywords: null,
              createdAt: '2021-08-31T00:54:47.000Z',
              updatedAt: '2021-08-31T00:54:47.000Z',
              category: {
                id: 'd08e5a2d-fba2-4d5b-90cd-8cc1cd90e989',
                name: 'Thời trang nam',
                path: 'Thời trang nam',
                slug: 'thoi-trang-nam'
              }
            }
          }
        }
      }
    },
    404: {
      $ref: '#/components/responses/NotFound'
    }
  }
};
