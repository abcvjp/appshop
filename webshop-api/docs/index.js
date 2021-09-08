const schemas = require("./schemas");
const parameters = require("./parameters");
const responses = require("./responses");

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

let paths = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    paths = { ...paths, ...require(path.join(__dirname, file)) };
  });

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Webshop API",
    version: "1.0.0",
    description:
      "This is API document for Webshop App - an ecommerce platform.",
    termsOfService: "http://swagger.io/terms/",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Ha Van Hoai",
      url: "https://facebook.com/hoai.ha.756",
      email: "hoai.hv@zinza.com.vn",
    },
  },
  servers: [
    {
      url: "http://api.webshop.local",
      description: "Development server",
    },
    {
      url: "https://webshop--api.herokuapp.com",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "user",
      description: "Operations about user",
    },
    {
      name: "category",
      description: "Operations about category",
    },
    {
      name: "product",
      description: "Operations about product",
    },
    {
      name: "order",
      description: "Operations about order",
    },
    {
      name: "shipping",
      description: "Operations about shipping",
    },
    {
      name: "payment",
      description: "Operations about payment",
    },
    {
      name: "cart",
      description: "Operations about cart",
    },
  ],
  paths,
  parameters,
  components: {
    schemas,
    responses,
    securitySchemes: {
      access_token: {
        type: "apiKey",
        name: "access_token",
        in: "cookie",
      },
    },
  },
};

module.exports = swaggerDoc;
