module.exports = {
  Category: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuidv4",
        readOnly: true,
        nullable: false,
      },
      name: {
        type: "string",
        nullable: false,
      },
      published: {
        type: "boolean",
        nullable: false,
        default: true,
      },
      description: {
        type: "string",
        nullable: false,
      },
      path: {
        type: "string",
        nullable: false,
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
      parent_id: {
        type: "string",
        format: "uuidv4",
        nullable: true,
      },
    },
  },
};
