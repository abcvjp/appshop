import React, { Component, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Paper,
  Grid,
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

import { useCategories } from 'src/utils/customHooks';
import { productApi } from 'src/utils/api';

const useStyles = makeStyles(() => ({
  select: {
    maxWidth: '100%'
  }
}));

const AddProductForm = () => {
  const classes = useStyles();
  const [categories] = useCategories();
  const [state, setState] = useState({
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

  return (
    <Paper className="paper" square>
      <Box sx={{ mb: 3 }}>
        <Typography
          color="textPrimary"
          variant="h2"
        >
          Add Category
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
          enable: true,
          name: '',
          category_id: '',
          title: '',
          price: '',
          root_price: '',
          quantity: '',
          short_description: '',
          description: '',
          images: [],
          meta_title: '',
          meta_description: '',
          meta_keywords: ''
        }}
        validationSchema={Yup.object().shape({
          enable: Yup.boolean(),
          name: Yup.string().trim().min(1).max(200)
            .required('Name is required'),
          category_id: Yup.string().uuid().required('Cateogory is required'),
          title: Yup.string().trim().min(1).max(200)
            .required('Title is requried'),
          price: Yup.number().positive().min(0).required('Price is required'),
          root_price: Yup.number().positive().min(0).required('Root price is required'),
          quantity: Yup.number().integer().positive().min(1)
            .required('Quantity is required'),
          short_description: Yup.string().trim().min(20).max(300)
            .required('Short description is required'),
          description: Yup.string().min(20).max(2500).required('Description is required'),
          images: Yup.array().of(Yup.string().trim().url()),
          meta_title: Yup.string().trim().min(1).max(100)
            .required('Meta title is required'),
          meta_description: Yup.string().trim().min(20).max(200),
          meta_keywords: Yup.string().trim().min(1).max(150)
        })}
        onSubmit={(values) => {
          console.log('submit');
          console.log(values);
          // await productApi.createProduct(values).then((res) => res.data).then(() => {
          // handleResultOpen();
          // }).catch((err) => {
          // setState((prevState) => ({ ...prevState, error: err.response ? err.response.data.error.message : err.message }));
          // });
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
              label="Product Name"
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
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label="Product Title"
              margin="normal"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              type="title"
              value={values.title}
              variant="outlined"
              required
            />
            <TextField
              className={classes.select}
              error={Boolean(touched.category_id && errors.category_id)}
              helperText={touched.category_id && errors.category_id}
              label="Category"
              margin="normal"
              fullWidth
              name="category_id"
              select
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.category_id}
              variant="outlined"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <TextField
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                  label="Price"
                  margin="normal"
                  type="number"
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  error={Boolean(touched.root_price && errors.root_price)}
                  helperText={touched.root_price && errors.root_price}
                  label="Root Price"
                  margin="normal"
                  type="number"
                  name="root_price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.root_price}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  error={Boolean(touched.quantity && errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                  label="Quantity"
                  margin="normal"
                  type="number"
                  name="quantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quantity}
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
            <TextField
              error={Boolean(touched.short_description && errors.short_description)}
              fullWidth
              helperText={touched.short_description && errors.short_description}
              label="Short Description"
              margin="normal"
              name="short_description"
              onBlur={handleBlur}
              onChange={handleChange}
              type="short_description"
              value={values.short_description}
              variant="outlined"
              multiline
              minRows={3}
              required
            />
            <TextField
              error={Boolean(touched.description && errors.description)}
              fullWidth
              helperText={touched.description && errors.description}
              label="Product Description"
              margin="normal"
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              type="description"
              value={values.description}
              variant="outlined"
              multiline
              minRows={5}
              required
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={values.enable}
                  onChange={handleChange}
                  margin="normal"
                  name="enable"
                />
                )}
              label="Enable?"
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
            <Editor
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
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
                Add Product
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

export default AddProductForm;
