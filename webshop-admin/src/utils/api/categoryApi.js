import API from './apiClient';
import { cleanObj, convertObjToQuery, convertEmptyStringToNull } from '../functions';

const categoryApi = {
  getAll: (query) => {
    const url = '/category/all';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  deleteCategory: (id) => API.delete(`/category/${id}`),
  deleteCategories: (categoryIds) => API.delete('/category', {
    data: { categoryIds }
  }),
  createCategory: (data) => {
    const url = '/category';
    return API.post(url, cleanObj(data));
  },
  editCategory: (id, data) => API.put(`/category/${id}`, convertEmptyStringToNull(data)),
  searchCategories: (query) => {
    const url = '/search/category';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  }
};

export default categoryApi;
