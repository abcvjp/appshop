import API from './apiClient';

const categoryApi = {
  getAll: (body) => API.get('/category/all', body),
  deleteCategory: (id) => API.delete(`/category/${id}`),
  deleteCategories: (categoryIds) => API.delete('/category', {
    data: { categoryIds }
  }),
  createCategory: (body) => API.post('/category', body),
  editCategory: (id, body) => API.put(`/category/${id}`, body)
};

export default categoryApi;
