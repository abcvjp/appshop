module.exports = {
  OrderItem: {
    type: "object",
    properties: {
      order_id: {
        type: "string",
        format: "uuidv4",
        readOnly: true,
        nullable: false,
      },
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
      product_thumbnail: {
        type: "object",
        properties: {
          url: {
            type: "string",
            format: "uri",
            nullable: false,
          },
          alt: {
            type: "string",
            nullable: true,
          },
          title: {
            type: "string",
            nullable: true,
          },
        },
        nullable: true,
      },
    },
  },
};
