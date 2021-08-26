import { cleanObj } from '../utilFuncs';
import API from './apiClient';

const orderApi = {
  createOrder: (data) => {
    const url = '/order';
    return API.post(url, cleanObj(data));
  }
};

export default orderApi;
