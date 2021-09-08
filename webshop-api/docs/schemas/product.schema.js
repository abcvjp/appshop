module.exports = {
  Product: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuidv4",
        readOnly: true,
        nullable: false,
      },
      enable: {
        type: "boolean",
        nullable: false,
        default: true,
      },
      published: {
        type: "boolean",
        nullable: false,
        default: true,
      },
      name: {
        type: "string",
        nullable: false,
      },
      title: {
        type: "string",
        nullable: false,
      },
      price: {
        type: "number",
        format: "double",
        minimum: 0,
        nullable: false,
      },
      quantity: {
        type: "integer",
        minimum: 0,
        nullable: false,
      },
      sold: {
        type: "integer",
        minimum: 0,
        nullable: false,
        readOnly: true,
      },
      root_price: {
        type: "number",
        format: "double",
        minimum: 0,
        nullable: false,
      },
      short_description: {
        type: "string",
        nullable: false,
        minLength: 20,
        maxLength: 255,
      },
      description: {
        type: "string",
        nullable: false,
        minLength: 20,
        maxLength: 30000,
      },
      images: {
        type: "array",
        items: {
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
        },
        nullable: true,
      },
      slug: {
        type: "string",
        nullable: false,
        readOnly: true,
      },
      meta_title: {
        type: "string",
        nullable: false,
      },
      meta_description: {
        type: "string",
        nullable: true,
      },
      meta_keyword: {
        type: "string",
        nullable: true,
      },
    },
  },
};
