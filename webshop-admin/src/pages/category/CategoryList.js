import { useEffect, useState } from 'react';
import CategoryListToolbar from '../../components/category/CategoryListToolbar';
import { categoryApi } from '../../utils/api';
import CategoryListResults from '../../components/category/CategoryListResult';
import Page from '../../components/Page';

const CategoryList = () => {
  const [state, setState] = useState({
    categories: []
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await categoryApi.getAll();
      setState((prevState) => ({ ...prevState, categories: response.data.data }));
    };
    fetchCategory();
  }, []);

  return (
    <Page
      title="Category"
      toolbar={<CategoryListToolbar />}
      main={<CategoryListResults categories={state.categories} />}
    />
  );
};

export default CategoryList;
