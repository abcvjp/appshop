import React, { useContext } from 'react';
import { OrderListContext } from 'src/utils/contexts';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  InputLabel,
  Select
} from '@material-ui/core';
import OrderListFilter from './OrderListFilter';

const sortOptions = [
  { name: 'Newest', value: 'createdAt.desc' },
  { name: 'Oldest', value: 'createdAt.asc' },
  { name: 'Total (Low to High)', value: 'cost.asc' },
  { name: 'Total (High to Low)', value: 'cost.desc' },
];

const OrderListToolbar = () => {
  const { state, dispatch } = useContext(OrderListContext);

  const handleSortChange = (event) => {
    dispatch({
      type: 'CHANGE_SORT',
      sort: event.target.value
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
          Add order
        </Button>
      </Box>
      <Box key={2} sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid item key="filters">
                <OrderListFilter />
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
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default OrderListToolbar;
