const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

let parameters = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    parameters = { ...parameters, ...require(path.join(__dirname, file)) };
  });

module.exports = parameters;
