import React from 'react';

import { useLocation } from 'react-router';

import {
  Grid, makeStyles, Paper, List, Typography
} from '@material-ui/core';

import ProductList from '../components/Product/ProductList';
import Breadcrumbs from '../components/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  main: {
  },
  margin: {
    margin: theme.spacing(2)
  },
  bar: {
    padding: theme.spacing(1.5),
    borderRight: '1px solid #e6e6e6'
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const classes = useStyles();
  const keyword = useQuery().get('q');

  const fetchProductQuery = `/search?q=${keyword}`;

  return (
    <>
      <Breadcrumbs breadcrumbs={[{
        name: `Search results for: '${keyword}'`,
        path: `${fetchProductQuery}`
      }]}
      />

      <Paper elevation={1} square>
        <Grid container spacing={0} wrap="wrap">
          <Grid key="childs_category" item xs={12} sm={2} className={classes.bar}>
            <List />
          </Grid>
          <Grid key="product_list" item sm={10} className={classes.main}>
            <Typography className={classes.margin} variant="h4">
              Search for:
              {' '}
              {`"$
              {keyword}
              "`}
            </Typography>
            <ProductList fetchQuery={fetchProductQuery} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SearchPage;
