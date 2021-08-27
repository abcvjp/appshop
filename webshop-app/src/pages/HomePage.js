import {
  makeStyles,
  Container
} from '@material-ui/core';
import ProductList from '../components/Product/ProductList';

const useStyles = makeStyles({
  container: {
  },
});

const HomePage = () => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.container}>
        <ProductList />
      </Container>
    </>
  );
};

export default HomePage;
