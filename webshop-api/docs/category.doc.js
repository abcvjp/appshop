const createCategory = require("./operations/createCategory");
const deleteCategories = require("./operations/deleteCategories");
const deleteCategory = require("./operations/deleteCategory");
const getAllCategory = require("./operations/getAllCategory");
const getCategory = require("./operations/getCategory");
const updateCategory = require("./operations/updateCategory");

module.exports = {
  "/category/all": {
    get: getAllCategory,
  },
  "/category": {
    get: getCategory,
    post: createCategory,
    put: updateCategory,
    delete: deleteCategories,
  },
  "/category/{categoryId}": {
    delete: deleteCategory,
  },
};
