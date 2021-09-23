module.exports = {
  SortParam: {
    name: 'sort',
    description:
      'sort by element with asc or desc order, default is sort by create time',
    in: 'query',
    schema: {
      type: 'string',
      default: 'createdAt.desc'
    }
  }
};
