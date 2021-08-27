import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { useNavigate } from 'react-router-dom';

import OrderSummary from 'src/components/Order/OrderSummary';
import ShippingForm from 'src/components/Order/ShippingForm';
import ReviewAndPayment from 'src/components/Order/ReviewAndPayment';
import SuccessDialog from 'src/components/Order/SuccessDialog';

import ShippingMethod from 'src/components/Order/ShippingMethod';
import { orderApi } from 'src/utils/api';
import { openConfirmDialog } from 'src/actions/confirmDialog';
import { closeFullScreenLoading, openFullScreenLoading } from 'src/actions/fullscreenLoading';
import ErrorDialog from 'src/components/Order/ErrorDialog';
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

const steps = ['Shipping', 'Review and Payment'];

const CheckoutPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = useRef([]);
  const shippingFormRef = useRef();

  const [, forceRerender] = useState(Date.now());

  const [state, setState] = useState({
    activeStep: 0,
    isOrderSuccess: false,
    placedOrder: {},
    error: ''
  });

  const [orderInfo, setOrderInfo] = useState({
    email: '',
    customer_name: '',
    phone_number: '',
    address: '',
    shipping_note: '',
    shipping_method: null,
    payment_method: null
  });

  console.log(orderInfo);

  const {
    email, customer_name, phone_number, address, shipping_note
  } = orderInfo;
  const shipping_method_id = orderInfo.shipping_method ? orderInfo.shipping_method.id : null;
  const payment_method_id = orderInfo.payment_method ? orderInfo.payment_method.id : null;

  useEffect(() => {
    orderItems.current = location.state.orderItems;
    if (isArrayEmpty(orderItems.current)) {
      navigate('/cart');
    }
    forceRerender(Date.now());
  }, [location]);

  const handleSubmitShippingForm = async (values) => {
    setOrderInfo((prevState) => ({ ...prevState, ...values }));
  };

  const handleShippingNext = () => {
    shippingFormRef.current.handleSubmit();
  };

  const handleNext = () => {
    if (state.activeStep === 0) {
      handleShippingNext();
    }
    setState((prevState) => ({ ...prevState, activeStep: prevState.activeStep + 1 }));
  };
  const handleBack = (data) => {
    setState((prevState) => ({ ...prevState, ...data, activeStep: prevState.activeStep - 1 }));
  };

  const callPlaceOrder = () => {
    const order_items = orderItems.current.map((item) => {
      const {
        buy_able, product_slug, product_thumbnail, ...temp
      } = item;
      return temp;
    });
    return orderApi.createOrder({
      email,
      customer_name,
      phone_number,
      address,
      shipping_note,
      shipping_method_id,
      payment_method_id,
      order_items
    });
  };

  const handlePlaceOrder = () => {
    dispatch(openConfirmDialog({
      message: 'Confirm order?',
      onConfirm: async () => {
        dispatch(openFullScreenLoading());
        try {
          const response = await callPlaceOrder();
          setState((prevState) => ({ ...prevState, isOrderSuccess: true, placedOrder: response.data.result }));
        } catch (error) {
          if (error.response) {
            setState((prevState) => ({ ...prevState, isOrderSuccess: false, error: error.response.data.error.message }));
          }
        }
        dispatch(closeFullScreenLoading());
      }
    }));
  };

  const setPaymentMethod = (payment_method) => {
    setOrderInfo((prevState) => ({ ...prevState, payment_method }));
  };

  const setShippingMethod = (shipping_method) => {
    setOrderInfo((prevState) => ({ ...prevState, shipping_method }));
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <ShippingForm
              initialValues={{
                email, customer_name, phone_number, address, shipping_note
              }}
              ref={shippingFormRef}
              onSubmit={handleSubmitShippingForm}
            />
            <ShippingMethod
              shippingMethodId={shipping_method_id}
              setShippingMethod={setShippingMethod}
            />
          </>
        );
      case 1:
        return (
          <ReviewAndPayment
            paymentMethodId={payment_method_id}
            setPaymentMethod={setPaymentMethod}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <>
      {!isArrayEmpty(orderItems.current) && (
        <>
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
                <>
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
                </>
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
            {state.error && <ErrorDialog error={state.error} />}
          </Container>
        </>
      )}
    </>
  );
};

export default CheckoutPage;
