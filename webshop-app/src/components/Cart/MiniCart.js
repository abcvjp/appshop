import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles, Popover, Typography, Box, Button
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MiniCartDetail from './MiniCartDetail';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    pointerEvents: 'auto',
    padding: theme.spacing(1)
  },
  checkOut: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  }
}));
const MiniCart = () => {
  const classes = useStyles();
  const cart_items = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const itemCount = cart_items.reduce((accumul, cur) => (accumul + cur.quantity), 0);

  return (
    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <IconButton component={RouterLink} to="/cart" color="inherit">
        <Badge badgeContent={itemCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        animation="false"
        disableRestoreFocus
        onClose={handlePopoverClose}
      >
        {itemCount > 0
          ? (
            <>
              <MiniCartDetail cart_items={cart_items} />
              <Button className={classes.checkOut} variant="contained" color="primary" size="large" href="/cart" fullWidth>
                VIEW CART & CHECK OUT
              </Button>

            </>
          )
          : <Box m={1}><Typography>Your cart is current empty, let buy some product!</Typography></Box>}
      </Popover>
    </div>
  );
};

export default MiniCart;
