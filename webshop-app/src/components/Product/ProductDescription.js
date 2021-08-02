import React from 'react'
import { Tab, Tabs, Paper } from '@material-ui/core'

const ProductDescription = ({ description }) => {
	const [tabIndex, setTabIndex] = React.useState(1);

	const handleTabChange = (event, index) => {
		setTabIndex(index)
	}
	const tabPanel = (index) => {
		switch (index) {
			case 1:
				return <div dangerouslySetInnerHTML={{ __html: description }}></div>
			case 2:
				return 'hoai dep trai'
			default:
				return 'hoai dep trai'
		}
	}

	return (
		<div>
			<Tabs
				value={tabIndex}
				indicatorColor="primary"
				textColor="primary"
				onChange={handleTabChange}
				aria-label="disabled tabs example"
			>
				<Tab label="Description" value={1} />
				<Tab label="Review" value={2} />
			</Tabs>
			<Paper square elevation={0} style={{ padding: 16 }}>
				{tabPanel(tabIndex)}
			</Paper>
		</div>
	)
}

export default ProductDescription
