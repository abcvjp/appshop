module.exports = {
  CategoryIdParam: {
    name: "category_id",
    in: "query",
    schema: {
      type: "string",
      format: "uuidv4",
    },
    description: "category id",
  },
};
