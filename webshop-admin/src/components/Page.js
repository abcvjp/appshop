import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Page = ({
  title, toolbar, main, context, contextValue
}) => (
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
          { context ? (
            <context.Provider value={contextValue}>
              {toolbar}
              <Box sx={{ pt: 3 }}>
                {main}
              </Box>
            </context.Provider>
          ) : (
            <>
              {toolbar}
              <Box sx={{ pt: 3 }}>
                {main}
              </Box>
            </>
          )}
        </PerfectScrollbar>
      </Container>
    </Box>
  </>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  toolbar: PropTypes.node,
  main: PropTypes.node.isRequired,
  context: PropTypes.object,
  contextValue: PropTypes.object
};

export default Page;
