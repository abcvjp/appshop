import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Dialog, DialogActions, DialogContent, DialogContentText, Button, Grid, makeStyles, Typography,
} from '@material-ui/core';

import API from '../utils/apiClient';

import {
  updateCart, checkAndChangeQuantity, deleteItemCart, deleteCart,
} from '../actions/cartActions';
import { showAlertMessage } from '../actions/alertMessageActions';

import CartItem from '../components/Cart/CartItem';
import CartDetail from '../components/Cart/CartDetail';
import CartSummary from '../components/Cart/CartSummary';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  title: {
    marginBlock: theme.spacing(2),
  },
  detail: {
    flexGrow: 1,
  },
  summary: {
    flexGrow: 1,
    flexShrink: 1,
  },

  margin: {
    margin: theme.spacing(1.5),
  },
}));

const CartPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, forceRerender] = useState(Date.now());

  const cart_items = useSelector((state) => state.cart); // eslint-disable-line
  const selectedItems = useRef([]);
  const cart_status = useRef({
    isValid: true,
    isSelectedAll: false,
    errors: {},
  });
  const [openDeleteAllConfirm, setOpenDeleteAllConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState({
    isOpenConfirm: false,
    itemIndex: null,
  });

  const handleDeleteAllConfirmOpen = () => {
    setOpenDeleteAllConfirm(true);
  };
  const handleDeleteAllConfirmClose = () => {
    setOpenDeleteAllConfirm(false);
  };
  const handleDeleteAllAgree = () => {
    setOpenDeleteAllConfirm(false);
    dispatch(deleteCart());
  };
  const handleDeleteAllDisagree = () => {
    setOpenDeleteAllConfirm(false);
  };
  const handleDeleteItemConfirmOpen = (itemIndex) => () => {
    setDeleteItem({
      isOpenConfirm: true,
      itemIndex,
    });
  };
  const handleDeleteItemConfirmClose = () => {
    setDeleteItem({
      isOpenConfirm: false,
      itemIndex: null,
    });
  };
  const handleDeleteItemAgree = () => {
    dispatch(deleteItemCart({ itemIndex: deleteItem.itemIndex }));
    setDeleteItem({
      isOpenConfirm: false,
      itemIndex: null,
    });
  };
  const handleDeleteItemDisagree = () => {
    setDeleteItem({
      isOpenConfirm: false,
      itemToDelete: null,
    });
  };
  const setSelectedItem = (item) => () => {
    selectedItems.current.push(item);
    if (selectedItems.current.length === cart_items.length) {
      cart_status.current.isSelectedAll = true;
    }
    forceRerender(Date.now());
  };
  const setUnselectedItem = (item) => () => {
    const temp = selectedItems.current.filter((i) => i.product_id !== item.product_id);
    selectedItems.current = temp;
    if (cart_status.current.isSelectedAll) {
      cart_status.current.isSelectedAll = false;
    }
    forceRerender(Date.now());
  };
  const handleSelectAllChange = () => {
    const { isSelectedAll } = cart_status.current;
    if (!isSelectedAll) {
      const cannotSelect = cart_items.some((item) => item.buy_able === false);
      if (cannotSelect) {
        dispatch(showAlertMessage({ type: 'error', content: 'You can\'t select all item, some item is cannot be purchased' }));
      } else {
        selectedItems.current = [...cart_items];
        forceRerender(Date.now());
      }
    } else {
      selectedItems.current = [];
      cart_status.current.isSelectedAll = false;
      forceRerender(Date.now());
    }
  };
  const handleChangeQtyItem = (itemIndex) => (event) => {
    const quantity = parseInt(event.target.value, 8);
    dispatch(checkAndChangeQuantity({ itemIndex, quantity }));
  };

  const checkValid = async (cartItems, success_callback, fail_callback) => {
    API.post('/cart/check_valid', {
      cart_items: cartItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        quantity: item.quantity,
      })),
    }).then((response) => response.data).then((response) => {
      if (response.success === true) {
        cart_status.current.isValid = true;
        if (success_callback) success_callback(response);
      } else {
        cart_status.current = {
          isValid: false,
          errors: response.errors,
        };
        if (fail_callback) fail_callback(response);
      }
    });
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.current.length > 0) {
      checkValid(selectedItems.current, () => {
        navigate('/checkout', {
          state: {
            pathname: '/checkout',
            orderItems: selectedItems.current,
          }
        });
      }, () => {
        dispatch(showAlertMessage({ type: 'warning', content: 'Something wrong with your cart, you should check again' }));
      });
    } else {
      dispatch(showAlertMessage({ type: 'warning', content: 'You must select items to order' }));
    }
  };

  useEffect(() => {
    checkValid(cart_items, () => {
      selectedItems.current = [...cart_items];
      cart_status.current.isSelectedAll = true;
      forceRerender(Date.now());
    }, (response) => {
      dispatch(updateCart({ items: response.valid_items }));
      dispatch(showAlertMessage({ type: 'warning', content: 'Something wrong with your cart, you should check again' }));
      forceRerender(Date.now());
    });
    // eslint-disable-next-line
	}, [])

  const cartItemComponents = cart_items.length > 0 ? cart_items.map((item, index) => (
    <CartItem
      item={item}
      error={cart_status.current.errors[index]}
      handleDeleteItem={handleDeleteItemConfirmOpen(index)}
      handleChangeQtyItem={handleChangeQtyItem(index)}
      setSelectedItem={setSelectedItem}
      setUnselectedItem={setUnselectedItem}
    />
  )) : null;

  const subtotal = selectedItems.current.reduce((accumul, cur) => (accumul + cur.quantity * cur.price), 0);

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>Shopping Cart</Typography>
      {cart_items.length > 0
        ? (
          <>
            <Grid container className={classes.main} alignItems="flex-start" justifyContent="space-between" spacing={2}>
              <Grid item xs={12} md={9} key="cart_detail" className={classes.detail}>
                <CartDetail
                  cartItems={cartItemComponents}
                  isSelectedAll={cart_status.current.isSelectedAll}
                  handleSelectedAllChange={handleSelectAllChange}
                  handleDeleteAllConfirmOpen={handleDeleteAllConfirmOpen}
                />
              </Grid>
              <Grid item md={3} key="cart_summary" className={classes.summary}>
                <CartSummary
                  subtotal={subtotal}
                  handleProceedToCheckout={handleProceedToCheckout}
                />
              </Grid>
            </Grid>

            <Dialog open={openDeleteAllConfirm} onClose={handleDeleteAllConfirmClose}>
              <DialogContent>
                <DialogContentText>Are you sure want to delete ALL product from your cart?</DialogContentText>
                <DialogActions>
                  <Button onClick={handleDeleteAllDisagree} color="primary" autoFocus>
                    Disagree
                  </Button>
                  <Button onClick={handleDeleteAllAgree} color="secondary">
                    Agree
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>

            <Dialog open={deleteItem.isOpenConfirm} onClose={handleDeleteItemConfirmClose}>
              <DialogContent>
                <DialogContentText>Are you sure want to delete this product from your cart?</DialogContentText>
                <DialogActions>
                  <Button onClick={handleDeleteItemDisagree} color="primary" autoFocus>
                    Disagree
                  </Button>
                  <Button onClick={handleDeleteItemAgree} color="secondary">
                    Agree
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </>
        )
        : <Typography>Your cart is empty</Typography>}

    </div>
  );
};

export default CartPage;
