module.exports = {
  tags: ["report"],
  summary: "Get order reports with time filters",
  operationId: "getOrderReports",
  description:
    "Get order reports with time filters. This operation is available for admin user",
  security: [
    {
      access_token: [],
    },
  ],
  parameters: [
    {
      $ref: "#/parameters/CurrentPageParam",
    },
    {
      $ref: "#/parameters/PageSizeParam",
    },
    {
      $ref: "#/parameters/SortParam",
    },
    {
      $ref: "#/parameters/StartDateParam",
    },
    {
      $ref: "#/parameters/EndDateParam",
    },
    {
      name: "group_by",
      in: "query",
      schema: {
        type: "string",
        enum: ["day", "week", "month", "year"],
      },
      description: "time unit",
      require: true,
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
                type: "array",
                items: {
                  $ref: "#/components/schemas/OrderReport",
                },
              },
              pagination: {
                type: "object",
                properties: {
                  currentPage: {
                    type: "number",
                    format: "integer",
                    minimum: 1,
                    description: "current page",
                  },
                  pageCount: {
                    type: "number",
                    format: "integer",
                    minimum: 1,
                    description: "total number of pages",
                  },
                  pageSize: {
                    type: "number",
                    format: "integer",
                    minimum: 1,
                    description: "items number of per page",
                  },
                  count: {
                    type: "number",
                    format: "integer",
                    minimum: 0,
                    description: "total number of items",
                  },
                },
              },
            },
          },
          example: {
            success: true,
            data: [
              {
                time: "2021-09-08",
                orders_number: 1,
                completed_orders_number: 0,
                item_total: 7.91,
                items_number: 1,
                shipping_fee: 1,
                order_total: 8.91,
                expected_profit: 0.09,
              },
            ],
            pagination: {
              currentPage: 1,
              pageCount: 1,
              pageSize: 1,
              count: 1,
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
