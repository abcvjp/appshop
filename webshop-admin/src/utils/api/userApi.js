import API from './apiClient';
import { cleanObj } from '../functions';

const categoryApi = {
  login: (data) => API.post('/user/login', data),
  logout: () => API.get('user/logout'),
  signup: (data) => API.post('/user/signup', cleanObj(data)),
  getUser: (id) => API.get(`/user/${id}`)
};

export default categoryApi;
