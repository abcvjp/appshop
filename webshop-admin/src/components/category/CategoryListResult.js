import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
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

import { categoryApi } from '../../utils/api';

const CategoryListResults = ({ categories, ...rest }) => {
  const dispatch = useDispatch();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCategoryIds;

    if (event.target.checked) {
      newSelectedCategoryIds = categories.map((category) => category.id);
    } else {
      newSelectedCategoryIds = [];
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCategoryIds.indexOf(id);
    let newSelectedCategoryIds = [];

    if (selectedIndex === -1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds.slice(1));
    } else if (selectedIndex === selectedCategoryIds.length - 1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, selectedIndex),
        selectedCategoryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };

  const handleDeleteSelected = () => {
    dispatch(openConfirmDialog({
      message: 'Are you sure want to delete all selected categories and ALL OF ITS CHILDREN?',
      onConfirm: async () => {
        await categoryApi.deleteCategories(selectedCategoryIds);
        selectedCategoryIds.forEach((id) => {
          categories.splice(categories.findIndex((i) => i.id === id), 1);
        });
        setSelectedCategoryIds([]);
      }
    }));
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 8));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCategoryIds.length === categories.length}
                    color="primary"
                    indeterminate={
                      selectedCategoryIds.length > 0
                      && selectedCategoryIds.length < categories.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {selectedCategoryIds.length === 0
                  ? (
                    <>
                      <TableCell>
                        Name
                      </TableCell>
                      <TableCell>
                        Path
                      </TableCell>
                      <TableCell>
                        Description
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
                    </TableCell>
                  )}
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.slice(page * limit, page * limit + limit).map((category) => (
                <TableRow
                  hover
                  key={category.id}
                  selected={selectedCategoryIds.indexOf(category.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCategoryIds.indexOf(category.id) !== -1}
                      onChange={(event) => handleSelectOne(event, category.id)}
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
                        href={`${process.env.REACT_APP_APP_BASE}/${category.slug}`}
                        rel="noreferrer"
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {category.name}
                        </Typography>
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {category.path}
                  </TableCell>
                  <TableCell>
                    {category.description}
                  </TableCell>
                  <TableCell align="right">
                    <Box m={0.5} display="inline-block">
                      <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                      >
                        <Link
                          color="inherit"
                          underline="none"
                          target="_blank"
                          href={`http://${process.env.REACT_APP_APP_BASE}/${category.slug}`}
                        >
                          View
                        </Link>
                      </Button>
                    </Box>
                    <Box m={0.5} display="inline-block">
                      <Button
                        color="primary"
                        component={RouterLink}
                        size="small"
                        to={`${category.id}/edit`}
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
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={categories.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CategoryListResults.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoryListResults;
