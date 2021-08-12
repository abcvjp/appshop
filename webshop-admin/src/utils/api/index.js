import categoryApi from './categoryApi';
import productApi from './productApi';
import orderApi from './orderApi';

const API = {
  CATEGORY: categoryApi,
  PRODUCT: productApi,
  ORDER: orderApi
};

export default API;
export {
  categoryApi,
  productApi,
  orderApi
};
