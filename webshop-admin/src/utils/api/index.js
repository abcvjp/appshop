import categoryApi from './categoryApi';
import productApi from './productApi';

const API = {
  CATEGORY: categoryApi,
  PRODUCT: productApi
};

export default API;
export {
  categoryApi,
  productApi
};
