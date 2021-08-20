import React, { useState, useContext } from 'react';
import { useCategories } from 'src/utils/customHooks';

import { ProductListContext } from 'src/utils/contexts';
import { Link as RouterLink } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import {
  Box,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  InputAdornment,
  SvgIcon,
  InputLabel
} from '@material-ui/core';
import { Search as SearchIcon, RefreshCcw as RefreshIcon, X } from 'react-feather';

const sortOptions = [
  { name: 'Newest', value: 'createdAt.desc' },
  { name: 'Oldest', value: 'createdAt.asc' },
  { name: 'Price (Low to High)', value: 'price.asc' },
  { name: 'Price (High to Low)', value: 'price.desc' },
  { name: 'Discount', value: 'discount.desc' },
  { name: 'Best Selling', value: 'sold.desc' },
  { name: 'Quantity (Low to High)', value: 'quantity.asc' },
  { name: 'Quantity (High to Low)', value: 'quantity.desc' }
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

const publishedOptions = [
  { name: 'All', value: '' },
  { name: 'Published', value: true },
  { name: 'Unpublished', value: false }
];

const createHeader = (label, key) => ({ label, key });
const exportFileHeaders = [
  createHeader('Id', 'id'),
  createHeader('Enable', 'enable'),
  createHeader('Product name', 'name'),
  createHeader('Slug', 'slug'),
  createHeader('Product title', 'title'),
  createHeader('Category id', 'category.id'),
  createHeader('Category name', 'category.name'),
  createHeader('Category slug', 'category.slug'),
  createHeader('Price', 'price'),
  createHeader('Root price', 'root_price'),
  createHeader('Quantity', 'Quantity'),
  createHeader('Sold', 'sold'),
  createHeader('Short description', 'short_description'),
  createHeader('Description', 'description'),
  createHeader('Images', 'images'),
  createHeader('Meta title', 'meta_title'),
  createHeader('Meta description', 'meta_description'),
  createHeader('Meta keywords', 'meta_keywords'),
  createHeader('Created at', 'createdAt'),
  createHeader('Last update', 'updatedAt')
];

const ProductListToolbar = () => {
  const { state, dispatch } = useContext(ProductListContext);
  const [searchValue, setSearchValue] = useState('');
  const [categories] = useCategories();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchEnter = () => {
    if (searchValue.length > 4) {
      dispatch({ type: 'SET_SEARCH', searchValue });
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    dispatch({ type: 'SET_SEARCH', searchValue: '' });
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

  const handlePublishedChange = (event) => {
    dispatch({
      type: 'CHANGE_PUBLISHED',
      published: event.target.value
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
        <CSVLink
          headers={exportFileHeaders}
          data={state.products}
          filename="products.csv"
        >
          <Button key="export" sx={{ mx: 1 }}>
            Export
          </Button>
        </CSVLink>
        <Button
          key="refresh"
          color="primary"
          variant="contained"
          sx={{ mx: 1 }}
          onClick={() => dispatch({ type: 'REFRESH' })}
        >
          <RefreshIcon />
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
            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-end">
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
                      ),
                      endAdornment: searchValue.length > 4 ? (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClearSearch}>
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <X />
                            </SvgIcon>
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }}
                    placeholder="Search product"
                    variant="outlined"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleSearchEnter();
                      }
                    }}
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
              <Grid item key="published">
                <InputLabel>Published</InputLabel>
                <Select
                  native
                  value={state.filters.published}
                  onChange={handlePublishedChange}
                >
                  {publishedOptions.map((element) => <option key={element.name} value={element.value}>{element.name}</option>)}
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
