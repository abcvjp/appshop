module.exports = {
  SearchKeywordParam: {
    name: 'q',
    in: 'query',
    schema: {
      type: 'string',
      minLength: 5
    },
    require: true,
    description: 'keyword to search by'
  }
};
