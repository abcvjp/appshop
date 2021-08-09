import API from './apiClient';

const productApi = {
  getAll: (query) => {
    let url = '/product/all';
    Object.keys(query).forEach((key, index) => {
      if (index === 0) {
        url = url.concat(`?${key}=${query[key]}`);
      } else {
        url = url.concat(`&${key}=${query[key]}`);
      }
    });
    return API.get(url);
  },
  deleteProduct: (id) => API.delete(`/product/${id}`),
  deleteProducts: (productIds) => API.delete('/product', {
    data: { productIds }
  }),
  createProduct: (body) => API.post('/product', body),
  updateProducts: (products) => API.put('/product', { products }),
  editProduct: (id, body) => API.put(`/product/${id}`, body),
  searchProducts: (query) => {
    let url = '/search';
    Object.keys(query).forEach((key, index) => {
      if (index === 0) {
        url = url.concat(`?${key}=${query[key]}`);
      } else {
        url = url.concat(`&${key}=${query[key]}`);
      }
    });
    return API.get(url);
  }
};

export default productApi;
