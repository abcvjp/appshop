import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Divider, makeStyles, Radio, FormControlLabel, RadioGroup, Grid
} from '@material-ui/core';
import API from '../../utils/apiClient';

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

const ShippingMethod = ({ shippingMethodId, setShippingMethod }) => {
  const classes = useStyles();
  const [shippingMethods, setShippingMethods] = useState([]);
  const handleShippingMethodChange = (e) => {
    setShippingMethod(shippingMethods.find((i) => i.id === parseInt(e.target.value, 8)));
  };

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await API.get('/shipping/shipping_method');
        setShippingMethods(response.data.data);
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
        <Typography variant="h5" className={classes.margin}>Shipping Methods</Typography>
        <Divider />
      </div>

      {shippingMethods.length > 0
        ? (
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={shippingMethodId}
            onChange={handleShippingMethodChange}
          >
            <Grid container direction="column">
              {shippingMethods.map((shippingMethod) => (
                <Grid key={`shipping_method_${shippingMethod.id}`} item container justifyContent="space-between" alignItems="center" spacing={8}>
                  <Grid key="shipping_name" item>
                    <FormControlLabel
                      value={shippingMethod.id}
                      control={<Radio />}
                      label={shippingMethod.name}
                    />
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

ShippingMethod.propTypes = {
  shippingMethodId: PropTypes.number,
  setShippingMethod: PropTypes.func.isRequired
};

export default ShippingMethod;
