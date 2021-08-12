import React, { useState, useContext } from 'react';
import { useCategories } from 'src/utils/customHooks';

import { ProductListContext } from 'src/utils/contexts';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  InputAdornment,
  SvgIcon,
  InputLabel
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const sortOptions = [
  { name: 'Newest', value: 'createdAt.desc' },
  { name: 'Price (Low to High)', value: 'price.asc' },
  { name: 'Price (High to Low)', value: 'price.desc' },
  { name: 'Discount', value: 'discount.desc' },
  { name: 'Best Selling', value: 'sold.desc' }
];

const enableOptions = [
  { name: 'All', value: '' },
  { name: 'Enabled', value: true },
  { name: 'Disabled', value: false }
];

const instockOptions = [
  { name: 'All', value: '' },
  { name: 'In stock', value: true },
  { name: 'Out of stock', value: false }
];

const ProductListToolbar = () => {
  const { state, dispatch } = useContext(ProductListContext);
  const [searchValue, setSearchValue] = useState('');
  const [categories] = useCategories();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'SET_SEARCH', searchValue });
    }
  };

  const handleSortChange = (event) => {
    dispatch({
      type: 'CHANGE_SORT',
      sort: event.target.value
    });
  };

  const handleEnableChange = (event) => {
    dispatch({
      type: 'CHANGE_ENABLE',
      enable: event.target.value
    });
  };

  const handleInstockChange = (event) => {
    dispatch({
      type: 'CHANGE_INSTOCK',
      inStock: event.target.value
    });
  };

  const handleCategoryChange = (event) => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      categoryId: event.target.value
    });
  };

  return (
    <Box>
      <Box
        key={1}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button key="import">
          Import
        </Button>
        <Button key="export" sx={{ mx: 1 }}>
          Export
        </Button>
        <Button
          key="add product"
          color="primary"
          variant="contained"
          component={RouterLink}
          to="add"
        >
          Add product
        </Button>
      </Box>
      <Box key={2} sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid item key="search">
                <Box sx={{ maxWidth: 400 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search product"
                    variant="outlined"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                  />
                </Box>
              </Grid>
              <Grid item key="sort">
                <InputLabel>Sort</InputLabel>
                <Select
                  native
                  value={state.sort}
                  onChange={handleSortChange}
                >
                  {
                    sortOptions.map((element) => <option key={element.name} value={element.value}>{element.name}</option>)
                  }
                </Select>
              </Grid>
              <Grid item key="category">
                <InputLabel>Category</InputLabel>
                <Select
                  native
                  value={state.filters.categoryId}
                  onChange={handleCategoryChange}
                >
                  <option key="All" value={undefined}>All</option>
                  {categories.length > 0 && categories.map((category) => <option key={category.name} value={category.id}>{category.name}</option>)}
                </Select>
              </Grid>
              <Grid item key="enable">
                <InputLabel>Enable</InputLabel>
                <Select
                  native
                  value={state.filters.enable}
                  onChange={handleEnableChange}
                >
                  {enableOptions.map((element) => <option key={element.name} value={element.value}>{element.name}</option>)}
                </Select>
              </Grid>
              <Grid item key="in-stock">
                <InputLabel>In stock</InputLabel>
                <Select
                  native
                  value={state.filters.inStock}
                  onChange={handleInstockChange}
                >
                  {instockOptions.map((element) => <option key={element.name} value={element.value}>{element.name}</option>)}
                </Select>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductListToolbar;
