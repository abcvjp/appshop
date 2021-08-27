import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import {
  Checkbox, Divider, Grid, IconButton, makeStyles, Paper
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import * as uuid from 'short-uuid';
import {
  deleteItemCart, selectItemCart, checkAndChangeQuantity, unselectItemCart, selectAllCart, unselectAllCart, deleteCart
} from 'src/actions/cartActions';
import { openConfirmDialog } from 'src/actions/confirmDialog';
import CartItem from './CartItem';

/* eslint-disable react/prop-types */
const useStyles = makeStyles((theme) => ({
  root: {

  },
  itemsHeaderLeft: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  itemsHeaderRight: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
  },
  rightItem: {
    width: '25%',
    display: 'flex',
    justifyContent: 'center'
  },
  itemsHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },
  margin: {
    margin: theme.spacing(1)
  },
  delete: {
    color: 'grey'
  }
}));

const CartDetail = ({
  cartItems
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isSelectedAll = cartItems.filter((item) => item.buy_able === true).every((item) => item.isSelected === true);

  const handleSelectAllChange = useCallback(() => {
    if (!isSelectedAll) {
      dispatch(selectAllCart());
    } else dispatch(unselectAllCart());
  });

  const handleDeleteAll = useCallback(() => {
    dispatch(openConfirmDialog({
      message: 'Are you sure want to delete all items in your cart?',
      onConfirm: () => {
        dispatch(deleteCart());
      }
    }));
  });

  const handleSelectItemChange = useCallback((itemIndex) => (e) => {
    if (e.target.checked === true) {
      dispatch(selectItemCart({ itemIndex }));
    } else {
      dispatch(unselectItemCart({ itemIndex }));
    }
  });

  const handleDeleteItem = useCallback((itemIndex) => () => {
    dispatch(openConfirmDialog({
      message: 'Are you sure want to delete this item?',
      onConfirm: () => {
        dispatch(deleteItemCart({ itemIndex }));
      }
    }));
  });

  const handleChangeQtyItem = useCallback((itemIndex) => (event) => {
    const quantity = parseInt(event.target.value, 10);
    dispatch(checkAndChangeQuantity({ itemIndex, quantity }));
  });

  return (
    <Paper elevation={0}>
      <Grid key="header" className={classes.itemsHeader} container>
        <Grid key="item" className={`${classes.margin} ${classes.itemsHeaderLeft}`} item container sm={7} spacing={3}>
          <Checkbox
            disableRipple
            checked={isSelectedAll}
            onChange={handleSelectAllChange}
          />
          {// eslint-disable-next-line
          `All (${cartItems.length} items)`}
        </Grid>
        <Grid key="other" className={`${classes.margin} ${classes.itemsHeaderRight}`} item container sm={5}>
          <Grid item key="price" className={classes.rightItem}>Price</Grid>
          <Grid item key="quantity" className={classes.rightItem}>Qty</Grid>
          <Grid item key="subtotal" className={classes.rightItem}>Subtotal</Grid>
          <Grid item key="delete" className={classes.rightItem}>
            <IconButton
              className={classes.delete}
              disableFocusRipple
              disableRipple
              onClick={handleDeleteAll}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {
        cartItems.map((item, index) => (
          <div key={uuid.generate()}>
            <Divider variant="middle" />
            <CartItem
              item={item}
              handleSelectItemChange={handleSelectItemChange(index)}
              handleDeleteItem={handleDeleteItem(index)}
              handleChangeQtyItem={handleChangeQtyItem(index)}
            />
          </div>
        ))
      }

    </Paper>
  );
};

export default CartDetail;
