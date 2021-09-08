module.exports = {
  SlugParam: {
    name: "slug",
    in: "query",
    schema: {
      type: "string",
      format: "slug",
    },
    description: "slug of resource's name",
  },
};
