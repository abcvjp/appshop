import { cleanObj, convertObjToQuery } from '../functions';
import API from './apiClient';

const orderApi = {
  getOrders: (query) => {
    const url = '/order/all';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  getOrder: (id) => API.get(`/order/${id}`),
  deleteOrder: (id) => API.delete(`/order/${id}`),
  deleteOrders: (orderIds) => API.delete('/order/all', {
    data: { orderIds }
  }),
  createOrder: (data) => {
    const url = '/order';
    return API.post(url, cleanObj(data));
  },
  updateOrder: (id, data) => {
    const url = `/order/${id}`;
    return API.put(url, cleanObj(data));
  },
  updateOrdersStatus: (data) => API.put('/order', { orders: data }),
  editOrder: (id, body) => API.put(`/order/${id}`, body),
  searchOrders: (query) => {
    const url = '/search';
    return API.get(url + convertObjToQuery(cleanObj(query)));
  },
  confirmOrder: (id) => API.put(`/order/${id}/confirm`),
  cancelOrder: (id) => API.put(`/order/${id}/cancel`),
  completeOrder: (id) => API.put(`/order/${id}/complete`)
};

export default orderApi;
