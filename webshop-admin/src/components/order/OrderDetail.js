import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, makeStyles, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableRow
} from '@material-ui/core';
import OrderItemList from './OrderItemList';

const useStyles = makeStyles((theme) => ({
  status: {
    marginBottom: theme.spacing(2)
  },
  title: {
    padding: theme.spacing(2)
  }
}));
const OrderDetail = ({ order }) => {
  const classes = useStyles();
  const createInfoField = (field, value) => ({ field, value });

  const orderStatus = [
    createInfoField('Status', order.status),
    createInfoField('Payment Status', order.payment_status),
    createInfoField('Shipping Status', order.shipping_status)
  ];
  const orderInfo = [
    createInfoField('Order ID', order.id),
    createInfoField('Created At', (new Date(order.createdAt)).toLocaleString('en-us')),
    createInfoField('Last Update', (new Date(order.updatedAt)).toLocaleString('en-us')),
    createInfoField('Order Total', `$${order.cost}`),
    createInfoField('Customer Name', order.customer_name),
    createInfoField('Email', order.email),
    createInfoField('Phone Number', order.phone_number),
    createInfoField('Payment Method', order.payment_method.name),
    createInfoField('Shipping Method', order.shipping_method.name),
    createInfoField('Shipping Address', order.address),
    createInfoField('Shipping Note', order.shipping_note)
  ];

  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.status}>
          <Typography className={classes.title} variant="h3">Order Status</Typography>
          <Divider />
          <TableContainer>
            <Table>
              <TableBody>
                {orderStatus.map((row) => (
                  <TableRow key={row.field} hover>
                    <TableCell align="left">
                      {row.field}
                    </TableCell>
                    <TableCell align="left">
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper>
          <Typography className={classes.title} variant="h3">Order Info</Typography>
          <Divider />
          <TableContainer>
            <Table>
              <TableBody>
                {orderInfo.map((row) => (
                  <TableRow key={row.field} hover>
                    <TableCell align="left">
                      {row.field}
                    </TableCell>
                    <TableCell align="left">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Grid item sm={6}>
        <Paper>
          <Typography className={classes.title} variant="h3">Order Items</Typography>
          <Divider />
          <OrderItemList items={order.order_items} />
        </Paper>
      </Grid>
    </Grid>
  );
};

OrderDetail.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderDetail;
