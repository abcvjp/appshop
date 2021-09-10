const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "OrderReports", deps: []
 * createTable() => "PaymentMethods", deps: []
 * createTable() => "ShippingMethods", deps: []
 * createTable() => "Users", deps: []
 * createTable() => "Categories", deps: [Categories]
 * createTable() => "Orders", deps: [PaymentMethods, ShippingMethods]
 * createTable() => "Products", deps: [Categories]
 * createTable() => "OrderItems", deps: [Orders, Products]
 * addIndex(name_title_keyword_idx) => "Products"
 *
 */

const info = {
  revision: 1,
  name: "initialize-database",
  created: "2021-09-10T06:39:07.822Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "OrderReports",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        day: { type: Sequelize.STRING, field: "day", allowNull: false },
        orders_number: {
          type: Sequelize.INTEGER,
          field: "orders_number",
          defaultValue: 0,
          allowNull: false,
        },
        completed_orders_number: {
          type: Sequelize.INTEGER,
          field: "completed_orders_number",
          defaultValue: 0,
          allowNull: false,
        },
        item_total: {
          type: Sequelize.DOUBLE,
          field: "item_total",
          defaultValue: 0,
          allowNull: false,
        },
        items_number: {
          type: Sequelize.INTEGER,
          field: "items_number",
          defaultValue: 0,
          allowNull: false,
        },
        shipping_fee: {
          type: Sequelize.DOUBLE,
          field: "shipping_fee",
          defaultValue: 0,
          allowNull: false,
        },
        order_total: {
          type: Sequelize.DOUBLE,
          field: "order_total",
          defaultValue: 0,
          allowNull: false,
        },
        expected_profit: {
          type: Sequelize.DOUBLE,
          field: "expected_profit",
          defaultValue: 0,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "PaymentMethods",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          unique: true,
          allowNull: false,
        },
        enable: {
          type: Sequelize.BOOLEAN,
          field: "enable",
          defaultValue: true,
          allowNull: false,
        },
        detail: { type: Sequelize.STRING, field: "detail", allowNull: true },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "ShippingMethods",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          unique: true,
          allowNull: false,
        },
        enable: {
          type: Sequelize.BOOLEAN,
          field: "enable",
          defaultValue: true,
          allowNull: false,
        },
        fee: {
          type: Sequelize.DOUBLE,
          field: "fee",
          defaultValue: 0,
          allowNull: false,
        },
        detail: { type: Sequelize.STRING, field: "detail", allowNull: true },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          field: "username",
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "user",
          field: "role",
        },
        full_name: {
          type: Sequelize.STRING,
          allowNull: false,
          field: "full_name",
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          field: "email",
        },
        hash: { type: Sequelize.STRING, allowNull: false, field: "hash" },
        avatar: { type: Sequelize.STRING, allowNull: true, field: "avatar" },
        refresh_token: {
          type: Sequelize.TEXT,
          allowNull: true,
          field: "refresh_token",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Categories",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          unique: true,
          allowNull: false,
        },
        published: {
          type: Sequelize.BOOLEAN,
          field: "published",
          defaultValue: true,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING,
          field: "path",
          unique: true,
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING,
          field: "slug",
          unique: true,
          allowNull: false,
        },
        meta_title: {
          type: Sequelize.STRING,
          field: "meta_title",
          allowNull: false,
        },
        meta_description: {
          type: Sequelize.STRING,
          field: "meta_description",
          allowNull: true,
        },
        meta_keywords: {
          type: Sequelize.STRING,
          field: "meta_keywords",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        parent_id: {
          type: Sequelize.UUID,
          field: "parent_id",
          onUpdate: "cascade",
          onDelete: "cascade",
          references: { model: "Categories", key: "id" },
          name: "parent_id",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Orders",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        status: {
          type: Sequelize.ENUM("Pending", "Handling", "Completed", "Canceled"),
          field: "status",
          defaultValue: "Pending",
          allowNull: false,
        },
        order_total: {
          type: Sequelize.DOUBLE,
          field: "order_total",
          allowNull: false,
        },
        item_total: {
          type: Sequelize.DOUBLE,
          field: "item_total",
          allowNull: false,
        },
        shipping_fee: {
          type: Sequelize.DOUBLE,
          field: "shipping_fee",
          allowNull: false,
        },
        payment_status: {
          type: Sequelize.ENUM("Unpaid", "Paid"),
          field: "payment_status",
          defaultValue: "Unpaid",
          allowNull: false,
        },
        shipping_status: {
          type: Sequelize.ENUM(
            "Undelivered",
            "Delivering",
            "Successfully delivered",
            "Delivery failed"
          ),
          field: "shipping_status",
          defaultValue: "Undelivered",
          allowNull: false,
        },
        customer_name: {
          type: Sequelize.STRING,
          field: "customer_name",
          allowNull: false,
        },
        address: { type: Sequelize.STRING, field: "address", allowNull: false },
        email: { type: Sequelize.STRING, field: "email", allowNull: true },
        phone_number: {
          type: Sequelize.STRING,
          field: "phone_number",
          allowNull: false,
        },
        shipping_note: {
          type: Sequelize.STRING,
          field: "shipping_note",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        payment_method_id: {
          type: Sequelize.INTEGER,
          field: "payment_method_id",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "PaymentMethods", key: "id" },
          name: "payment_method_id",
          allowNull: false,
        },
        shipping_method_id: {
          type: Sequelize.INTEGER,
          field: "shipping_method_id",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "ShippingMethods", key: "id" },
          name: "shipping_method_id",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Products",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        enable: {
          type: Sequelize.BOOLEAN,
          field: "enable",
          defaultValue: true,
          allowNull: false,
        },
        published: {
          type: Sequelize.BOOLEAN,
          field: "published",
          defaultValue: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          unique: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        price: { type: Sequelize.DOUBLE, field: "price", allowNull: false },
        quantity: {
          type: Sequelize.INTEGER,
          field: "quantity",
          allowNull: false,
        },
        sold: {
          type: Sequelize.INTEGER,
          field: "sold",
          defaultValue: 0,
          allowNull: false,
        },
        root_price: {
          type: Sequelize.DOUBLE,
          field: "root_price",
          allowNull: false,
        },
        short_description: {
          type: Sequelize.STRING,
          field: "short_description",
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT("long"),
          field: "description",
          allowNull: false,
        },
        images: { type: Sequelize.JSON, field: "images", allowNull: true },
        slug: {
          type: Sequelize.STRING,
          field: "slug",
          unique: true,
          allowNull: false,
        },
        meta_title: {
          type: Sequelize.STRING,
          field: "meta_title",
          allowNull: false,
        },
        meta_description: {
          type: Sequelize.STRING,
          field: "meta_description",
          allowNull: true,
        },
        meta_keywords: {
          type: Sequelize.STRING,
          field: "meta_keywords",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        category_id: {
          type: Sequelize.UUID,
          field: "category_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Categories", key: "id" },
          name: "category_id",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "OrderItems",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        price: { type: Sequelize.DOUBLE, field: "price", allowNull: false },
        quantity: {
          type: Sequelize.INTEGER,
          field: "quantity",
          defaultValue: 1,
          allowNull: false,
        },
        product_name: {
          type: Sequelize.STRING,
          field: "product_name",
          allowNull: false,
        },
        product_thumbnail: {
          type: Sequelize.STRING,
          field: "product_thumbnail",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        order_id: {
          type: Sequelize.UUID,
          field: "order_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Orders", key: "id" },
          name: "order_id",
          allowNull: false,
        },
        product_id: {
          type: Sequelize.UUID,
          field: "product_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Products", key: "id" },
          name: "product_id",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "Products",
      ["name", "title", "meta_keywords"],
      {
        indexName: "name_title_keyword_idx",
        name: "name_title_keyword_idx",
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["OrderItems", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Products", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Orders", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["OrderReports", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["PaymentMethods", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["ShippingMethods", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
