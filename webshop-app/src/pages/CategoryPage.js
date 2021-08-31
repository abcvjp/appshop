import { useEffect, useState, useRef } from 'react';
import {
  Grid, makeStyles, Paper, Typography,
  Box
} from '@material-ui/core';

import ProductList from 'src/components/Product/ProductList';
import Breadcrumbs from 'src/components/accesscories/Breadcrumbs';

import { useSelector } from 'react-redux';
import { generateBreadCrumbs, isArrayEmpty, isObjectEmpty } from 'src/utils/utilFuncs';
import { useParams } from 'react-router';
import CategoryChildrenTree from 'src/components/Category/CategoryChildrenTree';

const useStyles = makeStyles((theme) => ({
  bar: {
    padding: theme.spacing(2),
    borderRight: '1px solid #e6e6e6'
  },
  main: {

  }
}));

const CategoryPage = () => {
  const classes = useStyles();
  const { categorySlug } = useParams();

  const data = useRef({
    category: null,
    filters: null,
    breadcrumbs: []
  });
  const [, forceRerender] = useState(Date.now());

  const categoriesStore = useSelector((state) => state.categories);

  console.log(categoriesStore);

  useEffect(() => {
    // CHECK CATEGORY IN STORE OTHERWISE FETCH CATEGORY BY SLUG
    if (!isObjectEmpty(categoriesStore.map_slug_id)) {
      const categoryId = categoriesStore.map_slug_id[categorySlug];
      const category = categoriesStore.all[categoryId];
      data.current = {
        category,
        filters: null,
        breadcrumbs: generateBreadCrumbs(category.path, categoriesStore.map_name_slug)
      };
      forceRerender(Date.now());
    }
  }, [categorySlug, categoriesStore]);

  return (
    <>
      {!isArrayEmpty(data.current.breadcrumbs) && <Breadcrumbs breadcrumbs={data.current.breadcrumbs} />}

      {data.current.category && (
        <Paper elevation={1} square>
          <Grid container spacing={0}>

            <Grid key="more" item xs={12} sm={2} className={classes.bar}>
              {!isArrayEmpty(data.current.category.childs) && (
                <>
                  <Typography variant="subtitle2">SUBCATEGORY</Typography>
                  <Box mt={1}>
                    <CategoryChildrenTree
                      childs={data.current.category.childs}
                    />
                  </Box>
                </>
              )}
            </Grid>

            <Grid key="product_list" item sm={10} className={classes.main}>
              <Box m={2}>
                <Typography variant="h5">
                  {data.current.category.name}
                </Typography>
              </Box>
              <ProductList
                filters={{ category_slug: categorySlug, ...data.current.filters }}
              />
            </Grid>

          </Grid>
        </Paper>
      )}

    </>
  );
};

export default CategoryPage;
