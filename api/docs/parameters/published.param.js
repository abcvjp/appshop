module.exports = {
  PublishedParam: {
    name: 'published',
    in: 'query',
    schema: {
      type: 'boolean',
      enum: [true, false]
    },
    description: 'published or unpublished'
  }
};
