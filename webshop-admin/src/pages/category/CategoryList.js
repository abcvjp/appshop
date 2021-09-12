import {
  useEffect, useReducer
} from 'react';
import { categoryApi } from 'src/utils/api';
import CategoryListToolbar from 'src/components/category/CategoryListToolbar';
import CategoryListResults from 'src/components/category/CategoryListResult';
import { CategoryListContext } from 'src/utils/contexts';
import Page from '../../components/Page';

const initialState = {
  categories: [],
  pageSize: 10,
  currentPage: 0,
  count: 10,
  triggerFetch: Date.now(),
  filters: {
    published: '',
  },
  sort: '',
  isLoading: false
};

function categoryListReducer(state, action) {
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
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
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
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((i) => {
          if (i.id === action.category.id) {
            return { ...i, ...action.category };
          } return i;
        })
      };
    case 'UPDATE_CATEGORIES': {
      const newCategories = state.categories.slice();
      action.categories.forEach((category) => {
        const index = newCategories.findIndex((curCategory) => curCategory.id === category.id);
        if (index !== -1) {
          newCategories[index] = { ...newCategories[index], ...category };
        }
      });
      return {
        ...state,
        categories: newCategories
      };
    }
    default:
      return state;
  }
}

const CategoryList = () => {
  const [state, dispatch] = useReducer(categoryListReducer, initialState);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch({ type: 'SET_LOADING' });
      const { filters } = state;
      try {
        const response = await categoryApi.getAll({
          current_page: state.currentPage + 1,
          page_size: state.pageSize,
          ...filters,
          sort: state.sort
        });
        dispatch({
          type: 'SET_CATEGORIES',
          categories: response.data.data,
          count: response.data.pagination.count
        });
      } catch (err) {
        console.log(err);
      }
      dispatch({ type: 'SET_UNLOADING' });
    };
    fetchCategories();
  }, [state.pageSize, state.currentPage, state.filters, state.sort, state.triggerFetch]);

  return (
    <Page
      title="Categories"
      context={CategoryListContext}
      contextValue={{ state, dispatch }}
      toolbar={(
        <CategoryListToolbar />
      )}
      main={(
        <CategoryListResults />
      )}
    />
  );
};

export default CategoryList;
