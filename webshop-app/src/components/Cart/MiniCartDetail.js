import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { uuid } from 'uuidv4';
import MiniCartItem from './MiniCartItem';
import { deleteItemCart } from '../../actions/cartActions';

/* eslint-disable react/prop-types */

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  subTotal: {
    margin: theme.spacing(2)
  }
}));

const MiniCartDetail = ({ cart_items }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteItem = (itemIndex) => () => dispatch(deleteItemCart({ itemIndex }));

  return (
    <>
      <List className={classes.root} disablePadding dense>
        {cart_items.map((item, itemIndex) => (
          <MiniCartItem
            key={uuid()}
            item={item}
            deleteItem={deleteItem(itemIndex)}
          />
        ))}
      </List>
    </>
  );
};

export default MiniCartDetail;
