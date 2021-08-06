import React from 'react';
import Page from '../../components/Page';
import EditCategoryForm from '../../components/category/EditCategoryForm';

const EditCategory = () => (
  <Page
    title="Edit Category"
    main={<EditCategoryForm />}
  />
);

export default EditCategory;
