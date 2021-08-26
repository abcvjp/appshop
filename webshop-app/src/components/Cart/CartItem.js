import React from 'react';
import {
  Avatar, IconButton, makeStyles, TextField, Box, Checkbox,
  Grid
} from '@material-ui/core';

import { Delete } from '@material-ui/icons';

/* eslint-disable react/prop-types */

const useStyles = makeStyles((theme) => ({
  root: {

  },
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },
  name: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productName: {
    alignSelf: 'flex-start',
    flexGrow: 1,
    maxWidth: theme.spacing(30)
  },
  metrics: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  metricItem: {
    width: '25%',
    display: 'flex',
    justifyContent: 'center'
  },
  margin: {
    margin: theme.spacing(1)
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  qtyfield: {
    maxWidth: theme.spacing(10)
  },
  delete: {
    color: 'grey'
  },
  error: {
    color: 'red',
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: 0,
    marginTop: 0,
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const CartItem = ({
  item, error, isSelected, handleChangeQtyItem, handleDeleteItem, setSelectedItem
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.main} container>
        <Grid key="item" className={`${classes.margin} ${classes.name}`} item container xs={12} sm={7} spacing={3}>
          <Checkbox
            disableRipple
            checked={item.buy_able ? isSelected : false}
            onChange={setSelectedItem}
          />
          <Grid item key="thumbnail">
            <Avatar className={classes.avatar} src={item.product_thumbnail.url} alt={item.product_name} variant="square" />
          </Grid>
          <Grid item key="item_name" className={classes.productName}>{item.product_name}</Grid>
        </Grid>
        <Grid key="other" className={`${classes.margin} ${classes.metrics}`} item container sm={5}>
          <Grid key="price" item className={classes.metricItem}>{item.price}</Grid>
          <Grid key="quantity" item className={classes.metricItem}>
            <TextField
              className={classes.qtyfield}
              type="Number"
              variant="outlined"
              margin="none"
              defaultValue={item.quantity}
              onChange={(e) => {
                if (e.target.value < 1) {
                  e.target.value = 1;
                }
              }}
              onBlur={handleChangeQtyItem}
            />
          </Grid>
          <Grid key="subtotal" item className={classes.metricItem}>
            {parseFloat(item.price * item.quantity)}
          </Grid>
          <Grid key="delete" item className={classes.metricItem}>
            <IconButton
              className={classes.delete}
              disableFocusRipple
              disableRipple
              onClick={handleDeleteItem}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {error && <Box className={classes.error} key="error">{error.map((err) => `  ${err}`)}</Box>}
    </>
  );
};

export default CartItem;
