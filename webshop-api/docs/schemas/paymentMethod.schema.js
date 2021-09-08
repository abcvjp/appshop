module.exports = {
  PaymentMethod: {
    type: "object",
    properties: {
      id: {
        type: "number",
        format: "integer",
        readOnly: true,
        nullable: false,
      },
      enable: {
        type: "boolean",
        nullable: false,
        default: true,
      },
      detail: {
        type: "string",
        nullable: true,
      },
    },
  },
};
