import React, { useEffect, useRef, useState } from 'react';
import {
  Grid, makeStyles, Typography,
  Container,
  Box
} from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';
import OrderSummary from 'src/components/Order/OrderSummary';
import ShippingInfo from 'src/components/Order/ShippingInfo';
import ReviewAndPayment from 'src/components/Order/ReviewAndPayment';
import SuccessDialog from 'src/components/Order/SuccessDialog';

import API from '../utils/apiClient';
import { isArrayEmpty } from '../utils/utilFuncs';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  title: {
    marginBlock: theme.spacing(2)
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  stepper: {
    maxWidth: 600,
    marginBlock: theme.spacing(4)
  },
  nextback: {
    display: 'flex',
    width: '100%',
    marginBlock: theme.spacing(2),
    justifyContent: 'space-between'
  },
  error: {
    fontColor: 'red',
    marginBlock: theme.spacing(1)
  }
}));

const CheckoutPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const orderItems = useRef([]);

  const [, forceRerender] = useState(Date.now());

  const [state, setState] = useState({
    activeStep: 0,
    isOrderSuccess: false,
    placedOrder: {},
    errors: []
  });

  const [orderInfo, setOrderInfo] = useState({
    email: '',
    customer_name: '',
    phone_number: '',
    address: '',
    shipping_note: '',
    shipping_method: {},
    payment_method: {}
  });

  useEffect(() => {
    orderItems.current = location.orderItems;
    forceRerender(Date.now());
  }, [location]);

  const handleNext = () => {
    setState((prevState) => ({ ...prevState, activeStep: prevState.activeStep + 1 }));
  };
  const handleBack = (data) => {
    setState((prevState) => ({ ...prevState, ...data, activeStep: prevState.activeStep - 1 }));
  };

  const handleReset = () => {
    setState((prevState) => ({ ...prevState, activeStep: 0 }));
  };

  const handlePlaceOrder = () => {
    const {
      email, customer_name, phone_number, address, shipping_note
    } = orderInfo;
    const shipping_method_id = orderInfo.shipping_method.id;
    const payment_method_id = orderInfo.payment_method.id;
    const order_items = orderItems.current.map((item) => {
      const {
        buy_able, product_slug, product_thumbnail, ...temp
      } = item;
      return temp;
    });
    API.post('/order', {
      email,
      customer_name,
      phone_number,
      address,
      shipping_note,
      shipping_method_id,
      payment_method_id,
      order_items
    }).then((response) => response.data.result).then((order) => {
      setState((prevState) => ({ ...prevState, isOrderSuccess: true, placedOrder: order }));
    }).catch(() => {

    });
  };

  const setCustomerName = (name) => {
    setOrderInfo((prevState) => ({ ...prevState, customer_name: name }));
  };

  const setEmail = (email) => {
    setOrderInfo((prevState) => ({ ...prevState, email }));
  };

  const setPhoneNumber = (phone_number) => {
    setOrderInfo((prevState) => ({ ...prevState, phone_number }));
  };

  const setAddress = (address) => {
    setOrderInfo((prevState) => ({ ...prevState, address }));
  };

  const setShippingNote = (shipping_note) => {
    setOrderInfo((prevState) => ({ ...prevState, shipping_note }));
  };

  const setShippingMethod = (shipping_method) => {
    setOrderInfo((prevState) => ({ ...prevState, shipping_method }));
  };

  const setPaymentMethod = (payment_method) => {
    setOrderInfo((prevState) => ({ ...prevState, payment_method }));
  };

  const steps = ['Shipping', 'Review and Payment'];

  function getStepContent(stepIndex) {
    const {
      email, customer_name, phone_number, address, shipping_note, shipping_method, payment_method
    } = orderInfo;
    switch (stepIndex) {
      case 0:
        return (
          <ShippingInfo
            email={email}
            customer_name={customer_name}
            phone_number={phone_number}
            address={address}
            shipping_note={shipping_note}
            shipping_method={shipping_method}
            setCustomerName={setCustomerName}
            setEmail={setEmail}
            setPhoneNumber={setPhoneNumber}
            setAddress={setAddress}
            setShippingNote={setShippingNote}
            setShippingMethod={setShippingMethod}
          />
        );
      case 1:
        return (
          <ReviewAndPayment
            paymentMethod={payment_method}
            setPaymentMethod={setPaymentMethod}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <>
      {isArrayEmpty(location.orderItems) && <Redirect to="/cart" />}
      <Container className={classes.root} maxWidth="lg">
        <Typography variant="h4" className={classes.title}>Checkout</Typography>
        <div className={classes.stepper}>
          <Stepper activeStep={state.activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <Grid container spacing={3} justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <div>

              {state.errors.length > 0 && state.errors.map((error) => (
                <Typography className={classes.error}>{error}</Typography>
              ))}

              {state.activeStep === steps.length
                ? (
                  <div>
                    <Typography className={classes.instructions}>All steps completed</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                )
                : (
                  <div>
                    {getStepContent(state.activeStep)}
                    <Box className={classes.nextback}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={state.activeStep === 0}
                        onClick={handleBack}
                      >
                        BACK
                      </Button>
                      {state.activeStep === steps.length - 1
                        ? (
                          <Button variant="contained" color="primary" size="large" onClick={handlePlaceOrder}>
                            PLACE ORDER
                          </Button>
                        )
                        : (
                          <Button variant="contained" color="primary" size="large" onClick={handleNext}>
                            {state.activeStep === steps.length - 1 ? 'PLACE ORDER' : 'NEXT'}
                          </Button>
                        )}
                    </Box>
                  </div>
                )}
            </div>
          </Grid>

          <Grid item md={4} style={{ flexGrow: 1 }}>
            <OrderSummary
              orderItems={orderItems.current}
              shippingMethod={orderInfo.shipping_method}
              paymentMethod={orderInfo.payment_method}
            />
          </Grid>
        </Grid>

        {state.isOrderSuccess && <SuccessDialog order={state.placedOrder} />}

      </Container>
    </>
  );
};

export default CheckoutPage;
