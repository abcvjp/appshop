module.exports = {
  OrderStatusParam: {
    name: "status",
    in: "query",
    schema: {
      type: "string",
      enum: ["Pending", "Handling", "Completed", "Canceled"],
    },
    description: "status of order",
  },
};
