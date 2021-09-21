import React, { useState, useContext } from 'react';
import { CategoryListContext } from 'src/utils/contexts';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  InputLabel,
  Select,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon, RefreshCcw as RefreshIcon, X } from 'react-feather';

const publishedOptions = [
  { name: 'All', value: '' },
  { name: 'Published', value: true },
  { name: 'Unpublished', value: false }
];

const CategoryListToolbar = (props) => {
  const { state, dispatch } = useContext(CategoryListContext); // eslint-disable-line
  const [searchValue, setSearchValue] = useState('');

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

  const handlePublishedChange = (event) => {
    dispatch({
      type: 'CHANGE_PUBLISHED',
      published: event.target.value
    });
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button sx={{ mx: 1 }}>
          Export
        </Button>
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
          color="primary"
          variant="contained"
          component={RouterLink}
          to="create"
        >
          Add category
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-end">
              <Grid item key="search">
                <Box sx={{ maxWidth: 600 }}>
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
                    placeholder="Search category"
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

export default CategoryListToolbar;
