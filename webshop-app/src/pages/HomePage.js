import { useEffect, useState, useRef } from 'react';
import {
  makeStyles,
  Container,
  Paper,
  Box,
  Typography
} from '@material-ui/core';
import Products from 'src/components/Product/Products';
import { productApi } from 'src/utils/api';
import { isArrayEmpty } from 'src/utils/utilFuncs';
import ProductListSkeleton from 'src/components/skeletons/ProductListSkeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBlock: theme.spacing(3)
  },
  title: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const data = useRef({
    newProducts: [],
    hotProducts: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // const [, forceRerender] = useState(Date.now());

  useEffect(() => {
    const fetchNewProducts = async () => {
      const response = await productApi.getAll({ sort: 'createdAt.desc', page_size: 4 });
      data.current.newProducts = response.data.data;
    };
    const fetchHotProducts = async () => {
      const response = await productApi.getAll({ sort: 'sold.desc', page_size: 4 });
      data.current.hotProducts = response.data.data;
    };
    Promise.all([fetchNewProducts(), fetchHotProducts()]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <Container className={classes.root}>
      <Typography variant="h5" className={classes.title}>New Product</Typography>
      <Paper elevation={0}>
        {
          // eslint-disable-next-line
          isLoading ? <ProductListSkeleton size={4} />
            : !isArrayEmpty(data.current.newProducts) ? <Products products={data.current.newProducts} />
              : (
                <Box m={2}>
                  <Typography>There are no available product now!</Typography>
                </Box>
              )
        }
      </Paper>
      <Typography variant="h5" className={classes.title}>Hot Sale</Typography>
      <Paper elevation={0}>
        {
          // eslint-disable-next-line
          isLoading ? <ProductListSkeleton size={4} />
            : !isArrayEmpty(data.current.hotProducts) ? <Products products={data.current.hotProducts} />
              : (
                <Box m={2}>
                  <Typography>There are no available product now!</Typography>
                </Box>
              )
        }
      </Paper>
    </Container>
  );
};

export default HomePage;
