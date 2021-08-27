import {
  useState, useEffect, useRef, useCallback
} from 'react';
import PropTypes from 'prop-types';

import {
  Typography, Box, Grid, makeStyles
} from '@material-ui/core';

import { Pagination } from '@material-ui/lab';
import { isArrayEmpty } from 'src/utils/utilFuncs';

import { productApi } from 'src/utils/api';

import * as uuid from 'short-uuid';
import SortSelector from '../accesscories/SortSelector';
import PageSizeSelector from '../accesscories/PageSizeSelector';
import Products from './Products';
import ProductCardSkeleton from '../skeletons.js/ProductCardSkeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
  },
  item: {
    width: '25%',
  },
  myflex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(2)
  }
}));

const ProductList = ({ filters, sortElemnents }) => {
  const classes = useStyles();

  const products = useRef([]);

  const initialState = {
    currentPage: 1,
    pageSize: 8,
    pageCount: 1,
    itemCount: 0,
    sort: sortElemnents[0].value,
  };

  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSortChange = useCallback((e) => {
    setState((prevState) => ({
      ...prevState,
      sort: e.target.value,
      currentPage: 1
    }));
  });

  const handlePageSizeChange = useCallback((e) => {
    setState((prevState) => ({
      ...prevState,
      pageSize: parseInt(e.target.value, 10),
      currentPage: 1
    }));
  });

  const handlePageChange = useCallback((e, page) => {
    setState((prevState) => ({ ...prevState, currentPage: page }));
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { currentPage, pageSize, sort } = state;
        const queryParams = {
          ...filters,
          current_page: currentPage,
          page_size: pageSize,
          sort
        };
        let response;
        if (filters && filters.q) {
          response = await productApi.searchProducts(queryParams);
        } else {
          response = await productApi.getAll(queryParams);
        }
        products.current = response.data.data;
        setState((prevState) => ({
          ...prevState,
          pageCount: response.data.pagination.pageCount,
          itemCount: response.data.pagination.count
        }));
      } catch (error) {
        products.current = [];
        setState({
          currentPage: 1,
          pageSize: 8,
          pageCount: 1,
          itemCount: 0,
          sort: '',
        });
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [state.currentPage, state.pageSize, state.sort]);

  return (
    <>
      <Box className={classes.myflex} key="box1">
        <Typography>
          {`Found ${state.itemCount} items`}
        </Typography>

        <SortSelector
          sortBy={state.sort}
          handleSortChange={handleSortChange}
          sortElemnents={sortElemnents}
        />
      </Box>

      {(!isArrayEmpty(products.current) && !isLoading) ? <Products products={products.current} /> : (
        <Grid
          className={classes.root}
          container
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={1}
        >
          {
              (new Array(state.pageSize)).fill(0).map(() => (
                <Grid item key={uuid.generate()} className={classes.item} xs={12} sm={4} md={3} xl={2}>
                  <ProductCardSkeleton />
                </Grid>
              ))
            }
        </Grid>
      )}

      <Box className={classes.myflex} key="box2">
        <Pagination
          size="large"
          color="primary"
          count={state.pageCount}
          page={state.currentPage}
          onChange={handlePageChange}
        />

        <PageSizeSelector
          pageSize={state.pageSize}
          handlePageSizeChange={handlePageSizeChange}
        />
      </Box>
    </>
  );
};

ProductList.propTypes = {
  filters: PropTypes.object,
  sortElemnents: PropTypes.array
};
ProductList.defaultProps = {
  sortElemnents: [
    { name: 'Newest', value: 'createdAt.desc' },
    { name: 'Oldest', value: 'createdAt.asc' },
    { name: 'Price (Low to High)', value: 'price.asc' },
    { name: 'Price (High to Low)', value: 'price.desc' },
    { name: 'Discount', value: 'discount.desc' },
    { name: 'Best Selling', value: 'sold.desc' }]
};

export default ProductList;
