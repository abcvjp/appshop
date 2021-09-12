import {
  useEffect, useReducer
} from 'react';
import { orderApi } from 'src/utils/api';
import OrderListToolbar from 'src/components/order/OrderListToolbar';
import OrderListResults from 'src/components/order/OrderListResult';
import { OrderListContext } from 'src/utils/contexts';
import Page from '../../components/Page';

const initialState = {
  orders: [],
  pageSize: 10,
  currentPage: 0,
  count: 10,
  triggerFetch: Date.now(),
  filters: {
    id: '',
    status: '',
    payment_status: '',
    shipping_status: '',
    customer_name: '',
    email: '',
    phone_number: '',
    start_date: '',
    end_date: ''
  },
  sort: '',
  isLoading: false
};

function orderListReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_PAGE_SIZE':
      return {
        ...state,
        pageSize: action.pageSize,
        currentPage: 0
      };
    case 'CHANGE_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters,
        currentPage: 0,
        triggerFetch: Date.now()
      };
    case 'CHANGE_SORT':
      return {
        ...state,
        sort: action.sort
      };
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.orders,
        count: action.count
      };
    case 'TRIGGER_FETCH':
      return {
        ...state,
        currentPage: 0,
        triggerFetch: Date.now()
      };
    case 'REFRESH':
      return {
        ...state,
        triggerFetch: Date.now()
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'SET_UNLOADING':
      return {
        ...state,
        isLoading: false
      };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map((i) => {
          if (i.id === action.order.id) {
            return { ...i, ...action.order };
          } return i;
        })
      };
    case 'UPDATE_ORDERS': {
      const newOrders = state.orders.slice();
      action.orders.forEach((order) => {
        const index = newOrders.findIndex((curOrder) => curOrder.id === order.id);
        if (index !== -1) {
          newOrders[index] = { ...newOrders[index], ...order };
        }
      });
      return {
        ...state,
        orders: newOrders
      };
    }
    default:
      return state;
  }
}

const OrderList = () => {
  const [state, dispatch] = useReducer(orderListReducer, initialState);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: 'SET_LOADING' });
      const { filters } = state;
      try {
        const response = await orderApi.getOrders({
          current_page: state.currentPage + 1,
          page_size: state.pageSize,
          ...filters,
          sort: state.sort
        });
        dispatch({
          type: 'SET_ORDERS',
          orders: response.data.data,
          count: response.data.pagination.count
        });
      } catch (err) {
        console.log(err);
      }
      dispatch({ type: 'SET_UNLOADING' });
    };
    fetchOrders();
  }, [state.pageSize, state.currentPage, state.filters, state.sort, state.triggerFetch]);

  return (
    <Page
      title="Orders"
      context={OrderListContext}
      contextValue={{ state, dispatch }}
      toolbar={(
        <OrderListToolbar />
      )}
      main={(
        <OrderListResults />
      )}
    />
  );
};

export default OrderList;
