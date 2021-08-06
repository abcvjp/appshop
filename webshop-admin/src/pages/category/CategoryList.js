import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CategoryListToolbar from '../../components/category/CategoryListToolbar';
import { categoryApi } from '../../utils/api';
import CategoryListResults from '../../components/category/CategoryListResult';

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
    <>
      <Helmet>
        <title>Category | Webshop Admin</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CategoryListToolbar />
          <Box sx={{ pt: 3 }}>
            <CategoryListResults categories={state.categories} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryList;
