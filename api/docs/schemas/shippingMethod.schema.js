module.exports = {
  ShippingMethod: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        format: 'integer',
        readOnly: true,
        nullable: false
      },
      enable: {
        type: 'boolean',
        nullable: false,
        default: true
      },
      fee: {
        type: 'number',
        format: 'double',
        minimum: 0,
        nullable: false
      },
      detail: {
        type: 'string',
        nullable: true
      }
    }
  }
};
