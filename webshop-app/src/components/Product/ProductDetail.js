import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  margin: {
    marginBlock: theme.spacing(2)
  },
  price: {
    fontSize: theme.spacing(4),
    fontWeight: 500,
    clear: 'both',
    color: 'red',
    marginRight: theme.spacing(1)
  },
  root_price: {
    textDecoration: 'line-through',
    fontSize: theme.spacing(3),
    verticalAlign: 'middle',
    color: '#a5a5a5'
  },
  shortDes: {
    fontSize: theme.spacing(2),
    fontWeight: 400,
    clear: 'both',
    color: grey[700]
  },
  qty: {
    width: theme.spacing(8),
    height: theme.spacing(6)
  },
  plus: {
    width: theme.spacing(8),
    height: theme.spacing(6)
  }
}));

const ProductDetail = ({ product }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6">{product.title}</Typography>
      <Rating size="medium" defaultValue={2.5} precision={0.5} readOnly />
      <Box display="flex" direction="row" alignItems="center">
        <div className={classes.price}>
          $
          {product.price}
        </div>
        <div className={classes.root_price}>
          $
          {product.root_price}
        </div>
      </Box>
      <div className={`${classes.margin} ${classes.shortDes}`}>
        {product.short_description}
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductDetail;
