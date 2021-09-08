module.exports = {
  User: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuidv4",
        readOnly: true,
        nullable: false,
      },
      username: {
        type: "string",
        nullable: false,
      },
      role: {
        type: "string",
        enum: ["user", "admin"],
      },
      full_name: {
        type: "string",
        nullable: false,
      },
      email: {
        type: "string",
        nullable: false,
      },
      avatar: {
        type: "string",
        format: "uri",
        nullable: true,
      },
      hash: {
        type: "string",
        nullable: false,
        readOnly: true,
      },
      refresh_token: {
        type: "string",
        nullable: false,
        readOnly: true,
      },
    },
  },
};
