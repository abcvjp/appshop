'use strict';

const viewName = 'ProductStars';
const reviewTableName = 'Reviews';
const productTableName = 'Products';
const query = `
  SELECT r.product_id as product_id, ROUND(AVG(r.star),0) star
  FROM ${reviewTableName} as r JOIN ${productTableName} as p ON r.product_id = p.id
  GROUP BY r.product_id
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
  }
};
