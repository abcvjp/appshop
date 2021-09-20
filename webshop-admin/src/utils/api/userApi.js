import API from './apiClient';
import { cleanObj } from '../functions';

const categoryApi = {
  login: (data) => API.post('/user/login', data),
  logout: () => API.get('user/logout'),
  signup: (data) => API.post('/user/signup', cleanObj(data)),
  getUser: (id) => API.get(`/user/${id}`),
  getUsers: () => API.get('/user'),
  updateUserInfo: (id, data) => API.put(`/user/${id}`, cleanObj(data))
};

export default categoryApi;
