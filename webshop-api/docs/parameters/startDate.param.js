module.exports = {
  StartDateParam: {
    name: "start_date",
    in: "query",
    schema: {
      type: "string",
      format: "YYYY-MM-DD",
    },
    description: "start date in date range",
  },
};
