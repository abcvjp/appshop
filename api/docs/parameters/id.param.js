module.exports = {
  IdParam: {
    name: 'id',
    in: 'query',
    schema: {
      type: 'string',
      format: 'uuidv4'
    },
    description: 'id of resource (uuidv4)'
  }
};
