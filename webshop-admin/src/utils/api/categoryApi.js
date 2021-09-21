import API from './apiClient';
import { cleanObj, convertObjToQuery } from '../functions';

const categoryApi = {
  getAll: (body) => API.get('/category/all', body),
  deleteCategory: (id) => API.delete(`/category/${id}`),
  deleteCategories: (categoryIds) => API.delete('/category', {
    data: { categoryIds }
  }),
  createCategory: (data) => {
    const url = '/category';
    return API.post(url, cleanObj(data));
  },
  editCategory: (id, body) => API.put(`/category/${id}`, body),
  updateCategory: (id, data) => {
    const url = `/category/${id}`;
    return API.put(url, cleanObj(data));
  },
  searchCategories: (query) => {
    const url = '/search/category';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  }
};

export default categoryApi;
