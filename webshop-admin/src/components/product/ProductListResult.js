import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Checkbox,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { openConfirmDialog } from '../../actions/confirmDialog';

import { productApi } from '../../utils/api';

const ProductListResults = ({
  products, pageSize, currentPage, count, handlePageChange, handleLimitChange, fetchProducts
}) => {
  const dispatch = useDispatch();
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedProductIds;

    if (event.target.checked) {
      newSelectedProductIds = products.map((product) => product.id);
    } else {
      newSelectedProductIds = [];
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductIds.indexOf(id);
    let newSelectedProductIds = [];

    if (selectedIndex === -1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(1));
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleDeleteSelected = () => {
    dispatch(openConfirmDialog({
      message: 'Are you sure want to delete all selected products?',
      onConfirm: async () => {
        await productApi.deleteProducts(selectedProductIds);
        setSelectedProductIds([]);
        await fetchProducts();
      }
    }));
  };

  const handleDisableSelected = () => {
    dispatch(openConfirmDialog({
      message: 'Are you sure want to disable all selected products?',
      onConfirm: async () => {
        const productsToDisable = selectedProductIds.map((id) => ({
          id,
          enable: false
        }));
        await productApi.updateProducts(productsToDisable);
        selectedProductIds.forEach((id) => {
          products[products.findIndex((item) => item.id === id)].enable = false; //eslint-disable-line
        });
        setSelectedProductIds([]);
      }
    }));
  };

  const handleEnableSelected = () => {
    dispatch(openConfirmDialog({
      message: 'Are you sure want to enable all selected products?',
      onConfirm: async () => {
        const productsToEnable = selectedProductIds.map((id) => ({
          id,
          enable: true
        }));
        await productApi.updateProducts(productsToEnable);
        selectedProductIds.forEach((id) => {
          products[products.findIndex((item) => item.id === id)].enable = true; //eslint-disable-line
        });
        setSelectedProductIds([]);
      }
    }));
  };

  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedProductIds.length === products.length}
                  color="primary"
                  indeterminate={
                      selectedProductIds.length > 0
                      && selectedProductIds.length < products.length
                    }
                  onChange={handleSelectAll}
                />
              </TableCell>
              {selectedProductIds.length === 0
                ? (
                  <>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell>
                      Category
                    </TableCell>
                    <TableCell>
                      Enable
                    </TableCell>
                    <TableCell>
                      Price
                    </TableCell>
                    <TableCell>
                      Quantity
                    </TableCell>
                    <TableCell>
                      Sold
                    </TableCell>
                    <TableCell align="right">
                      Actions
                    </TableCell>
                  </>
                ) : (
                  <TableCell>
                    <Box m={0.5} display="inline-block">
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={handleDeleteSelected}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Box m={0.5} display="inline-block">
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={handleDisableSelected}
                      >
                        Disable
                      </Button>
                    </Box>
                    <Box m={0.5} display="inline-block">
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={handleEnableSelected}
                      >
                        Enable
                      </Button>
                    </Box>
                  </TableCell>
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                hover
                key={product.id}
                selected={selectedProductIds.indexOf(product.id) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProductIds.indexOf(product.id) !== -1}
                    onChange={(event) => handleSelectOne(event, product.id)}
                    value="true"
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Link
                      target="_blank"
                      href={`${process.env.REACT_APP_APP_BASE}/product/${product.slug}`}
                      rel="noreferrer"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {product.name}
                      </Typography>
                    </Link>
                  </Box>
                </TableCell>
                <TableCell>
                  {product.category.name}
                </TableCell>
                <TableCell>
                  {product.enable
                    ? <Typography color="green">ENABLED</Typography>
                    : <Typography color="red">DISABLED</Typography>}
                </TableCell>
                <TableCell>
                  {product.price}
                </TableCell>
                <TableCell>
                  {product.quantity}
                </TableCell>
                <TableCell>
                  {product.sold}
                </TableCell>
                <TableCell align="right">
                  <Box m={0.5} display="inline-block">
                    <Button
                      color="primary"
                      component={RouterLink}
                      size="small"
                      to={`${product.id}/edit`}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={currentPage}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductListResults.propTypes = {
  products: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleLimitChange: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired
};

export default ProductListResults;
