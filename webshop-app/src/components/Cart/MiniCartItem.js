import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Delete } from '@material-ui/icons';
import { IconButton, ListItemSecondaryAction, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

/* eslint-disable react/prop-types */

const useStyles = makeStyles(() => ({
  textField: {
    maxWidth: 80
  },
  itemText: {
    maxWidth: 300
  },
  deleteButton: {
    '&:hover': {
      background: 'none',
    }
  }
}));
const MiniCartItem = ({ item, deleteItem }) => {
  const classes = useStyles();
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar
          src={item.product_thumbnail}
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.itemText}
        primary={<Link to={`${item.product_slug}`}>{item.product_name}</Link>}
        secondary={`${item.price}$ - Qty: ${item.quantity}`}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={deleteItem} className={classes.deleteButton} edge="end" disableRipple disableFocusRipple disableTouchRipple>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default MiniCartItem;
