import React from 'react'
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import {
	Container
} from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import OrderSummary from '../components/Order/OrderSummary'

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
	}
}));

function getSteps() {
	return ['Shipping', 'Review and Payment']
}

const CheckoutPage = ({ order_items }) => {
	const classes = useStyles()
	const [activeStep, setActiveStep] = React.useState(0)
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleReset = () => {
		setActiveStep(0);
	}

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <>
					<Typography variant="h5" className={classes.title}>Shipping Address</Typography>
					<Divider />
				</>
			case 1:
				return 'What is an ad group anyways?'
			default:
				return 'Unknown stepIndex'
		}
	}


	return (
		<>
			<Container className={classes.root} maxWidth="lg">
				<Typography variant="h4" className={classes.title}>Checkout</Typography>
				<div className={classes.stepper}>
					<Stepper activeStep={activeStep} alternativeLabel>
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
							{activeStep === steps.length ? (
								<div>
									<Typography className={classes.instructions}>All steps completed</Typography>
									<Button onClick={handleReset}>Reset</Button>
								</div>
							) : (
								<div>
									{getStepContent(activeStep)}
									<div>
										<Button
											disabled={activeStep === 0}
											onClick={handleBack}
											className={classes.backButton}
										>
											Back
										</Button>
										<Button variant="contained" color="primary" onClick={handleNext}>
											{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
										</Button>
									</div>
								</div>
							)}
						</div>
					</Grid>
					<Grid item md={4}>
						<OrderSummary />
					</Grid>
				</Grid>

			</Container>
		</>
	)
}

export default CheckoutPage