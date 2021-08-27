import {
  Box, Paper, Divider, Typography, Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  margin: {
    marginBlock: theme.spacing(2)
  },
  total: {
    fontWeight: 'bold',
    fontSize: 'large',
    color: 'red'
  },
  checkout: {
    fontWeight: 'bold'
  }
}));

/* eslint-disable react/prop-types */

const CartSummary = ({ subtotal, discount = 0, handleProceedToCheckout }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.root}>
      <Typography className={classes.margin} variant="h6">Summary</Typography>
      <Divider key="divider_1" variant="fullWidth" />
      <Box className={classes.margin} display="flex" justifyContent="space-between">
        <Typography>Subtotal</Typography>
        <Typography>
          $
          {subtotal}
        </Typography>
      </Box>
      <Box className={classes.margin} display="flex" justifyContent="space-between">
        <Typography>Discount</Typography>
        <Typography>
          $
          {discount}
        </Typography>
      </Box>
      <Divider key="divider_2" variant="fullWidth" />
      <Box className={classes.margin} display="flex" justifyContent="space-between">
        <Typography>Order Total</Typography>
        <Typography className={classes.total}>
          $
          {discount + subtotal}
        </Typography>
      </Box>
      <Button
        className={classes.checkout}
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        disableElevation
        onClick={handleProceedToCheckout}
      >
        Proceed To Checkout
      </Button>
    </Paper>
  );
};

export default CartSummary;
