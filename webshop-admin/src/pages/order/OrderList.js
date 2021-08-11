import {
  useEffect, useReducer, createContext
} from 'react';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import { productApi } from 'src/utils/api';
import ProductListResults from 'src/components/product/ProductListResult';
import Page from '../../components/Page';

const initialState = {
  orders: [],
  pageSize: 10,
  currentPage: 0,
  count: 10,
  searchValue: '',
  triggerFetch: Date.now(),
  filters: {
    order_status: undefined,
    payment_status: undefined,
    shipping_status: undefined
  },
  sort: '',
  isLoading: false
};

function productListReducer(state, action) {
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
    case 'CHANGE_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.searchValue
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchValue: action.searchValue,
        triggerSearch: Date.now()
      };
    case 'CHANGE_SORT':
      return {
        ...state,
        sort: action.sort
      };
    case 'CHANGE_ENABLE':
      return {
        ...state,
        filters: {
          ...state.filters,
          order_status: action.order_status,
        },
        currentPage: 0
      };
    case 'CHANGE_INSTOCK':
      return {
        ...state,
        filters: {
          ...state.filters,
          payment_status: action.payment_status
        },
        currentPage: 0
      };
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        filters: {
          ...state.filters,
          shipping_status: action.shipping_status
        },
        currentPage: 0
      };
    case 'SET_PRODUCTS':
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
    default:
      return state;
  }
}
export const ListContext = createContext();

const ProductList = () => {
  const [state, dispatch] = useReducer(productListReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: 'SET_LOADING' });
    const response = await productApi.getAll({
      current_page: state.currentPage + 1,
      page_size: state.pageSize,
      category_id: state.filters.shipping_status,
      order_status: state.filters.order_status,
      in_stock: state.filters.payment_status,
      sort: state.sort
    });
    dispatch({
      type: 'SET_PRODUCTS',
      orders: response.data.data,
      count: response.data.pagination.count
    });
    dispatch({ type: 'SET_UNLOADING' });
  };

  const searchProducts = async () => {
    dispatch({ type: 'SET_LOADING' });
    const response = await productApi.searchProducts({
      q: state.searchValue,
      current_page: state.currentPage + 1,
      page_size: state.pageSize
    });
    dispatch({
      type: 'SET_PRODUCTS',
      orders: response.data.data,
      count: response.data.pagination.count
    });
    dispatch({ type: 'SET_UNLOADING' });
  };

  useEffect(() => {
    if (state.searchValue.length > 4) { searchProducts(); } else { fetchProducts(); }
  }, [state.pageSize, state.currentPage, state.filters, state.sort, state.triggerSearch]);

  return (
    <Page
      title="Products"
      context={ListContext}
      contextValue={{ state, dispatch }}
      toolbar={(
        <ProductListToolbar />
      )}
      main={(
        <ProductListResults />
      )}
    />
  );
};

export default ProductList;
