module.exports = {
  tags: ["product"],
  summary: "Edit multiple products",
  description:
    "Edit multiple products and return those product if it would success",
  operationId: "updateProducts",
  security: [
    {
      access_token: [],
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            products: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        example: {
          products: [
            {
              id: "08452667-319d-4f19-abfe-9db953a18587",
              enable: true,
              price: 7.9123,
            },
            {
              id: "f68b2e44-b078-40f6-b9da-5c33759daa96",
              enable: false,
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
                type: "array",
                items: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          example: {
            success: true,
            data: {
              success: true,
              result: [
                {
                  id: "08452667-319d-4f19-abfe-9db953a18587",
                  enable: true,
                  published: true,
                  name: "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY",
                  title:
                    "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn",
                  price: 7.91,
                  quantity: 100,
                  sold: 0,
                  root_price: 8,
                  short_description:
                    "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG",
                  description:
                    '<p style="text-align:start;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Tên sản phẩm: Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn- HÀNG CHÍNH HÃNG</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Chất liệu: Kaki cao cấp</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Màu sắc: 2 Màu (Đen và xanh rêu)</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Size: S – M – L – XL – 2XL</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Áo Lính dạng hộp độc đáo, phong cách lính khỏe khoắn, mạnh mẽ.</span></p>\n',
                  images: [
                    {
                      url: "https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg",
                    },
                    {
                      url: "https://salt.tikicdn.com/ts/product/53/bd/48/fd85de4aaa30597279083e2b6203f924.jpg",
                    },
                    {
                      url: "https://salt.tikicdn.com/ts/product/f0/f9/63/6f987aed1912faf0248639e533616f50.jpg",
                    },
                  ],
                  slug: "ao-so-mi-dai-tay-linh-my-u458-us-army",
                  meta_title:
                    "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp",
                  meta_description: null,
                  meta_keywords: null,
                  createdAt: "2021-08-31T00:54:47.000Z",
                  updatedAt: "2021-09-06T10:17:24.434Z",
                  category_id: "d08e5a2d-fba2-4d5b-90cd-8cc1cd90e989",
                },
                {
                  id: "42b9177b-8bbb-4dae-88da-c2e20e8db908",
                  enable: false,
                  published: true,
                  name: "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 4",
                  title:
                    "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn 4",
                  price: 5,
                  quantity: 100,
                  sold: 0,
                  root_price: 8,
                  short_description:
                    "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG",
                  description:
                    '<p style="text-align:start;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Tên sản phẩm: Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn- HÀNG CHÍNH HÃNG</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Chất liệu: Kaki cao cấp</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Màu sắc: 2 Màu (Đen và xanh rêu)</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Size: S – M – L – XL – 2XL</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Áo Lính dạng hộp độc đáo, phong cách lính khỏe khoắn, mạnh mẽ.</span></p>\n',
                  images: [
                    {
                      url: "https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg",
                    },
                    {
                      url: "https://salt.tikicdn.com/ts/product/53/bd/48/fd85de4aaa30597279083e2b6203f924.jpg",
                    },
                    {
                      url: "https://salt.tikicdn.com/ts/product/f0/f9/63/6f987aed1912faf0248639e533616f50.jpg",
                    },
                  ],
                  slug: "ao-so-mi-dai-tay-linh-my-u458-us-army-4",
                  meta_title:
                    "Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp 4",
                  meta_description: null,
                  meta_keywords: null,
                  createdAt: "2021-08-31T00:54:47.000Z",
                  updatedAt: "2021-09-06T10:17:24.435Z",
                  category_id: "d649137e-2e01-45cf-8ef7-50b737fd8548",
                },
              ],
            },
          },
        },
      },
    },
  },
};
