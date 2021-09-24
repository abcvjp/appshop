module.exports = {
  EnableParam: {
    name: 'enable',
    in: 'query',
    schema: {
      type: 'boolean',
      enum: [true, false]
    },
    description: 'enable or disable'
  }
};
