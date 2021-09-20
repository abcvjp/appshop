import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tab, Tabs, Paper, makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  description: {
    maxWidth: '100%',
    img: {
      maxWidth: '100%'
    }
  }
}));

const ProductDescription = ({ description }) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(1);

  const handleTabChange = (event, index) => {
    setTabIndex(index);
  };

  const tabPanel = (index) => {
    switch (index) {
      case 1:
        return <div className={classes.description} dangerouslySetInnerHTML={{ __html: description }} />; // eslint-disable-line
      case 2:
        return 'review';
      default:
        return 'hoai dep trai';
    }
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        indicatorColor="primary"
        textColor="inherit"
        onChange={handleTabChange}
      >
        <Tab label="Description" value={1} />
        <Tab label="Review" value={2} />
      </Tabs>
      <Paper square elevation={0} style={{ padding: 16 }}>
        {tabPanel(tabIndex)}
      </Paper>
    </>
  );
};

ProductDescription.propTypes = {
  description: PropTypes.string.isRequired
};

export default memo(ProductDescription);
