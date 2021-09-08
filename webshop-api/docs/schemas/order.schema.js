module.exports = {
  Order: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuidv4",
        readOnly: true,
        nullable: false,
      },
      status: {
        type: "string",
        description: "Order status",
        enum: ["Pending", "Handling", "Completed", "Canceled"],
        default: "Pending",
        nullable: false,
        readOnly: true,
      },
      payment_status: {
        type: "string",
        description: "Payment status",
        enum: ["Unpaid", "Paid"],
        default: "Unpaid",
        nullable: false,
      },
      shipping_status: {
        type: "string",
        description: "Shipping status",
        enum: [
          "Undelivered",
          "Delivering",
          "Successfully delivered",
          "Delivery failed",
        ],
        default: "Undelivered",
        nullable: false,
      },
      order_total: {
        type: "number",
        format: "double",
        readOnly: true,
        minimum: 0,
        nullable: false,
        readOnly: true,
      },
      item_total: {
        type: "number",
        format: "double",
        readOnly: true,
        minimum: 0,
        nullable: false,
        readOnly: true,
      },
      shipping_fee: {
        type: "number",
        format: "double",
        minimum: 0,
        nullable: false,
        readOnly: true,
      },
      customer_name: {
        type: "string",
        nullable: false,
      },
      email: {
        type: "string",
        format: "email",
        nullable: false,
      },
      phone_number: {
        type: "string",
        format: "phone-number",
        nullable: false,
      },
      address: {
        type: "string",
        nullable: false,
      },
      shipping_note: {
        type: "string",
        nullable: false,
      },
      order_items: {
        type: "array",
        items: {
          $ref: "#/components/schemas/OrderItem",
        },
      },
    },
  },
};
