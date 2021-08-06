import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Paper,
  MenuItem,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Checkbox,
  makeStyles
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { categoryApi } from '../../utils/api';

const useStyles = makeStyles(() => ({
  select: {
    maxWidth: '100%'
  }
}));

const CreateCategoryForm = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    categories: [],
    isLoading: false,
    error: null,
    isOpenResult: false
  });

  const handleResultOpen = () => {
    setState((prevState) => ({ ...prevState, isOpenResult: true }));
  };
  const handleResultClose = () => {
    setState((prevState) => ({ ...prevState, isOpenResult: false }));
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await categoryApi.getAll();
      setState((prevState) => ({ ...prevState, categories: response.data.data }));
    };
    fetchCategory();
  }, []);

  return (
    <Paper className="paper" square>
      <Box sx={{ mb: 3 }}>
        <Typography
          color="textPrimary"
          variant="h2"
        >
          Create Category
        </Typography>
      </Box>
      {state.error && (
      <Box mb={2}>
        <Typography color="secondary">
          Error:
          {' '}
          {state.error}
        </Typography>
      </Box>
      )}
      <Formik
        initialValues={{
          name: '',
          parent_id: '',
          description: '',
          published: true,
          meta_title: '',
          meta_description: '',
          meta_keywords: ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().trim().min(1).max(30)
            .required('Category name is required'),
          description: Yup.string().trim().min(20).max(100)
            .required('Category description is required'),
          parent_id: Yup.string(),
          published: Yup.boolean(),
          meta_title: Yup.string().trim().min(1).max(100)
            .required('Meta title is required'),
          meta_description: Yup.string().trim().min(20).max(200),
          meta_keywords: Yup.string().trim().min(1).max(150)
            .lowercase()
        })}
        onSubmit={async (values) => {
          const data = {};
          Object.keys(values).forEach((key) => {
            if (values[key] !== '') {
              data[key] = values[key];
            }
          });
          console.log(data);
          await categoryApi.createCategory(data).then((res) => res.data).then(() => {
            handleResultOpen();
          }).catch((err) => {
            setState((prevState) => ({ ...prevState, error: err.response ? err.response.data.error.message : err.message }));
          });
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              label="Category Name"
              margin="normal"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              type="name"
              value={values.name}
              variant="outlined"
              required
            />
            <TextField
              className={classes.select}
              error={Boolean(touched.parent_id && errors.parent_id)}
              helperText={touched.parent_id && errors.parent_id}
              label="Parent Category"
              margin="normal"
              fullWidth
              name="parent_id"
              select
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.parent_id}
              variant="outlined"
            >
              {state.categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              error={Boolean(touched.description && errors.description)}
              fullWidth
              helperText={touched.description && errors.description}
              label="Category Description"
              margin="normal"
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              type="description"
              value={values.description}
              variant="outlined"
              multiline
              minRows={3}
              required
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={values.published}
                  onChange={handleChange}
                  margin="normal"
                  name="published"
                />
                )}
              label="Published?"
            />
            <TextField
              error={Boolean(touched.meta_title && errors.meta_title)}
              fullWidth
              helperText={touched.meta_title && errors.meta_title}
              label="Meta title"
              margin="normal"
              name="meta_title"
              onBlur={handleBlur}
              onChange={handleChange}
              type="meta_title"
              value={values.meta_title}
              variant="outlined"
              required
            />
            <TextField
              error={Boolean(touched.meta_description && errors.meta_description)}
              fullWidth
              helperText={touched.meta_description && errors.meta_description}
              label="Meta description"
              margin="normal"
              name="meta_description"
              onBlur={handleBlur}
              onChange={handleChange}
              type="meta_description"
              value={values.meta_description}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.meta_keywords && errors.meta_keywords)}
              fullWidth
              helperText={touched.meta_keywords && errors.meta_keywords}
              label="Meta keywords"
              margin="normal"
              name="meta_keywords"
              onBlur={handleBlur}
              onChange={handleChange}
              type="meta_keyword"
              value={values.meta_keywords}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
              >
                Create category
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Dialog open={state.isOpenResult} onClose={handleResultClose}>
        <DialogContent>
          <DialogContentText style={{ color: 'green' }}>
            Category is created successfully
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default CreateCategoryForm;
