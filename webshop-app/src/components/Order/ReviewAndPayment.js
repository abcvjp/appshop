import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Divider, Radio, FormControlLabel, RadioGroup, Grid, makeStyles
} from '@material-ui/core';
import API from '../../utils/apiClient';

/* eslint-disable react/prop-types */

const useStyles = makeStyles((theme) => ({
  title: {
    marginBlock: theme.spacing(2)
  },
  margin: {
    marginBlock: theme.spacing(2)
  }
}));
const ReviewAndPayment = ({ paymentMethodId, setPaymentMethod }) => {
  const classes = useStyles();
  const [paymentMethods, setPaymentMethods] = useState([]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(paymentMethods.find((i) => i.id === parseInt(e.target.value, 8)));
  };

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await API.get('/payment/payment_method');
        setPaymentMethods(response.data.data);
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

    fetchPaymentMethods();
    // eslint-disable-next-line
	}, [])

  return (
    <div>
      <div className={classes.title}>
        <Typography variant="h5" className={classes.margin}>Payment Method</Typography>
        <Divider />
      </div>

      {paymentMethods.length > 0
        ? (
          <RadioGroup aria-label="gender" name="gender1" value={paymentMethodId} onChange={handlePaymentMethodChange}>
            <Grid container direction="column">
              {paymentMethods.map((paymentMethod) => ( // eslint-disable-line
                <Grid key={`shipping_method_${paymentMethod.id}`} item container justifyContent="space-between" alignItems="center" spacing={8}>
                  <Grid key="shipping_name" item>
                    <FormControlLabel
                      value={paymentMethod.id}
                      control={<Radio />}
                      label={paymentMethod.name}
                    />
                  </Grid>
                  <Grid key="shipping_detail" item>
                    <Typography variant="caption">
                      {paymentMethod.detail}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        )
        : <Typography>Sorry, no available payment method now!</Typography>}
    </div>
  );
};

ReviewAndPayment.propTypes = {
  paymentMethodId: PropTypes.number,
  setPaymentMethod: PropTypes.func.isRequired
};

export default ReviewAndPayment;
