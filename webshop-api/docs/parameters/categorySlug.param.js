module.exports = {
  CategorySlugParam: {
    name: 'category_slug',
    in: 'query',
    schema: {
      type: 'string',
      format: 'slug'
    },
    description: 'category slug'
  }
};
