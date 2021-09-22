import { cleanObj, convertEmptyStringToNull, convertObjToQuery } from '../functions';
import API from './apiClient';

const productApi = {
  getAll: (query) => {
    const url = '/product/all';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  getProduct: (query) => {
    const url = '/product';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  deleteProduct: (id) => API.delete(`/product/${id}`),
  deleteProducts: (productIds) => API.delete('/product', {
    data: { productIds }
  }),
  createProduct: (data) => {
    const url = '/product';
    return API.post(url, cleanObj(data));
  },
  editProduct: (id, data) => {
    const url = `/product/${id}`;
    return API.put(url, convertEmptyStringToNull(data));
  },
  searchProducts: (query) => {
    const url = '/search';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  }
};

export default productApi;
