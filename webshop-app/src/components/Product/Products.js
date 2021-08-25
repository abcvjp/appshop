import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { makeStyles, Grid } from '@material-ui/core';

import { checkAndAddToCart } from '../../actions/cartActions';
import ProductCard from './ProductCard';

const useStyles = makeStyles(() => ({
  root: {
    flexWrap: 'wrap',
  },
  item: {

  }
}));

const Products = ({ products }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddtoCart = (product) => () => {
    dispatch(checkAndAddToCart({
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      price: product.price,
      quantity: 1
    }));
  };

  return (
    <Grid className={classes.root} container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={1}>
      {
        products.map((product) => (
          <Grid item key={product.id} className={classes.item} xs={12} sm={4} md={3} xl={2}>
            <ProductCard
              product={product}
              handleAddToCart={handleAddtoCart(product)}
            />
          </Grid>
        ))
      }
    </Grid>
  );
};

Products.propTypes = {
  products: PropTypes.array
};

export default Products;
