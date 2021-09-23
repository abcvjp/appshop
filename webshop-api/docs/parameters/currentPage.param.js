module.exports = {
  CurrentPageParam: {
    name: 'current_page',
    description: 'current page to get resource',
    in: 'query',
    schema: {
      type: 'integer',
      minimum: 1,
      default: 1
    },
    required: true
  }
};
