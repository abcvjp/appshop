import { useEffect, useReducer } from 'react';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import { productApi } from 'src/utils/api';
import ProductListResults from 'src/components/product/ProductListResult';
import Page from '../../components/Page';

const initialState = {
  products: [],
  pageSize: 10,
  currentPage: 0,
  count: 10,
  searchValue: '',
  triggerSearch: Date.now(),
  filter: {
    enable: null,
    inStock: null,
    categoryId: null
  },
  sort: []
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
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.products,
        count: action.count
      };
    case 'TRIGGER_SEARCH':
      return {
        ...state,
        currentPage: 0,
        triggerSearch: Date.now()
      };
    default:
      return state;
  }
}

const ProductList = () => {
  const [state, dispatch] = useReducer(productListReducer, initialState);
  console.log(state);

  const handleLimitChange = (event) => {
    dispatch({
      type: 'CHANGE_PAGE_SIZE',
      pageSize: event.target.value
    });
  };

  const handlePageChange = (event, newPage) => {
    dispatch({
      type: 'CHANGE_CURRENT_PAGE',
      currentPage: newPage
    });
  };

  const handleSearchChange = (event) => {
    dispatch({
      type: 'CHANGE_SEARCH_VALUE',
      searchValue: event.target.value
    });
  };

  const fetchProducts = async () => {
    const response = await productApi.getAll({
      current_page: state.currentPage + 1,
      page_size: state.pageSize
    });
    dispatch({
      type: 'SET_PRODUCTS',
      products: response.data.data,
      count: response.data.pagination.count
    });
  };

  const searchProducts = async () => {
    const response = await productApi.searchProducts({
      q: state.searchValue,
      current_page: state.currentPage + 1,
      page_size: state.pageSize
    });
    dispatch({
      type: 'SET_PRODUCTS',
      products: response.data.data,
      count: response.data.pagination.count
    });
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'TRIGGER_SEARCH' });
    }
  };

  useEffect(() => {
    if (state.searchValue.length > 4) { searchProducts(); } else { fetchProducts(); }
  }, [state.pageSize, state.currentPage, state.triggerSearch]);

  return (
    <Page
      title="Products"
      toolbar={(
        <ProductListToolbar
          searchValue={state.searchValue}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      )}
      main={(
        <ProductListResults
          products={state.products}
          pageSize={state.pageSize}
          currentPage={state.currentPage}
          count={state.count}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
          fetchProducts={fetchProducts}
        />
      )}
    />
  );
};

export default ProductList;
