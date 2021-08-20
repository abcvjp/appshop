import React, { useContext } from 'react';
import { ReportOrderContext } from 'src/utils/contexts';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  Select,
  Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Search as SearchIcon, RefreshCcw as RefreshIcon } from 'react-feather';

const sortOptions = [
  { name: 'Newest', value: 'createdAt.desc' },
  { name: 'Oldest', value: 'createdAt.asc' },
  { name: 'Updated recenly', value: 'updatedAt.desc' },
  { name: 'Total (Low to High)', value: 'order_total.asc' },
  { name: 'Total (High to Low)', value: 'order_total.desc' },
];

const ReportOrderToolbar = () => {
  const { state, dispatch } = useContext(ReportOrderContext);

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
          Add order
        </Button>
      </Box>
      <Box key={2} sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid item key="filters">
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box display="flex" alignItems="center">
                      <Box mr={1}>
                        <SearchIcon />
                      </Box>
                      <Typography>Search</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails />
                </Accordion>
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

export default ReportOrderToolbar;
