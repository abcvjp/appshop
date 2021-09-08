module.exports = {
  PageSizeParam: {
    name: "page_size",
    description: "page size",
    in: "query",
    schema: {
      type: "integer",
      minimum: 1,
      default: 8,
    },
    required: true,
  },
};
