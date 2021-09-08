module.exports = {
  tags: ["category"],
  summary: "Get a category",
  operationId: "getCategory",
  description:
    "Get a category by id or slug (just by one), contain it's children or not",
  parameters: [
    {
      $ref: "#/parameters/IdParam",
    },
    {
      $ref: "#/parameters/SlugParam",
    },
    {
      name: "include_childs",
      in: "query",
      description: "Include categogy's children or not",
      required: false,
    },
    {
      name: "include_products",
      in: "query",
      description: "Include categogy's products or not",
      required: false,
    },
  ],
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
                allOf: [
                  {
                    $ref: "#/components/schemas/Category",
                  },
                  {
                    type: "object",
                    properties: {
                      childs: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Category",
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
          example: {
            success: true,
            data: {
              id: "d08e5a2d-fba2-4d5b-90cd-8cc1cd90e989",
              name: "Thời trang nam",
              published: true,
              description: "Thời trang dành riêng cho nam giới",
              path: "Thời trang nam",
              slug: "thoi-trang-nam",
              meta_title: "Thời trang nam",
              meta_description: null,
              meta_keywords: null,
              createdAt: "2021-08-31T00:54:47.000Z",
              updatedAt: "2021-08-31T00:54:47.000Z",
              parent_id: null,
            },
          },
        },
      },
    },
    404: {
      $ref: "#/components/responses/NotFound",
    },
  },
};
