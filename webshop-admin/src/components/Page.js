import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Page = ({ title, toolbar, main }) => (
  <>
    <Helmet>
      <title>
        {title}
        {' '}
        | Webshop Admin
      </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <PerfectScrollbar>
          {toolbar}
          <Box sx={{ pt: 3 }}>
            {main}
          </Box>
        </PerfectScrollbar>
      </Container>
    </Box>
  </>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  toolbar: PropTypes.node,
  main: PropTypes.node.isRequired
};

export default Page;
