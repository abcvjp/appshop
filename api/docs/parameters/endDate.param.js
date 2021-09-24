module.exports = {
  EndDateParam: {
    name: 'end_date',
    in: 'query',
    schema: {
      type: 'string',
      format: 'YYYY-MM-DD'
    },
    description: 'end date in date range'
  }
};
