import React, { useState, useEffect } from 'react';
import {
  Typography, Divider, makeStyles, TextField, Radio, FormControlLabel, RadioGroup, Grid
} from '@material-ui/core';
import API from '../../utils/apiClient';

/* eslint-disable react/prop-types */

const useStyles = makeStyles((theme) => ({
  title: {
    marginBlock: theme.spacing(2)
  },
  margin: {
    marginBlock: theme.spacing(2)
  },
  textField: {
    maxWidth: '70%'
  },
  shipfee: {
    fontWeight: 'bold'
  }
}));

const ShippingInfo = ({
  customer_name, email, phone_number, address, shipping_note, shipping_method,
  setCustomerName, setEmail, setPhoneNumber, setAddress, setShippingNote, setShippingMethod
}) => {
  const classes = useStyles();
  const [shippingMethods, setShippingMethods] = useState([]);

  const handleShippingMethodChange = (event) => {
    setShippingMethod(shippingMethods[parseInt(event.target.value, 8) - 1]);
  };

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await API.get('/shipping/shipping_method');
        setShippingMethods(response.data.data);
        setShippingMethod(response.data.data[0]);
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    };

    fetchShippingMethods();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className={classes.title}>
        <Typography variant="h5" className={classes.margin}>Shipping Address</Typography>
        <Divider />
      </div>
      <TextField
        InputLabelProps={{ shrink: true, color: 'primary' }}
        className={classes.textField}
        required
        fullWidth
        key="email"
        label="EMAIL"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <TextField
        InputLabelProps={{ shrink: true }}
        className={classes.textField}
        required
        fullWidth
        key="customer_name"
        label="FULL NAME"
        variant="outlined"
        margin="normal"
        value={customer_name}
        onChange={(e) => {
          setCustomerName(e.target.value);
        }}
      />

      <TextField
        InputLabelProps={{ shrink: true }}
        className={classes.textField}
        required
        fullWidth
        key="phone_number"
        label="PHONE NUMBER"
        variant="outlined"
        margin="normal"
        value={phone_number}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />

      <TextField
        InputLabelProps={{ shrink: true }}
        className={classes.textField}
        required
        fullWidth
        key="address"
        label="SHIPPING ADDRESS DETAIL (Street, district, city, ...)"
        variant="outlined"
        margin="normal"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />

      <TextField
        InputLabelProps={{ shrink: true }}
        className={classes.textField}
        required
        fullWidth
        multiline
        rows={4}
        key="shipping_note"
        label="SHIPPING NOTE"
        variant="outlined"
        margin="normal"
        value={shipping_note}
        onChange={(e) => {
          setShippingNote(e.target.value);
        }}
      />

      <div className={classes.title}>
        <Typography variant="h5" className={classes.margin}>Shipping Methods</Typography>
        <Divider />
      </div>

      {shippingMethods.length > 0
        ? (
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={shipping_method.id || ''}
            onChange={handleShippingMethodChange}
          >
            <Grid container direction="column">
              {shippingMethods.map((shippingMethod) => (
                <Grid key={`shipping_method_${shippingMethod.id}`} item container justifyContent="space-between" alignItems="center" spacing={8}>
                  <Grid key="shipping_name" item>
                    <FormControlLabel value={shippingMethod.id} control={<Radio />} label={shippingMethod.name} />
                  </Grid>
                  <Grid key="shipping_detail" item>
                    <Typography variant="caption">
                      {shippingMethod.detail}
                    </Typography>
                  </Grid>
                  <Grid key="shipping_fee" item className={classes.shipfee}>
                    $
                    {shippingMethod.fee}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        )
        : <Typography>Sorry, no available shipping method now!</Typography>}

    </div>
  );
};

export default ShippingInfo;
