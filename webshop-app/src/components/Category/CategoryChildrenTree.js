import { PropTypes } from 'prop-types';

import { useNavigate } from 'react-router-dom';

import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { isArrayEmpty } from 'src/utils/utilFuncs';
import { Typography } from '@material-ui/core';

const CategorychildsTree = ({ childs }) => {
  const navigate = useNavigate();

  const categoryTree = ((category) => (isArrayEmpty(category.childs)
    ? (
      <TreeItem
        nodeId={category.id}
        key={category.id}
        label={(
          <Typography variant="subtitle1">
            {category.name}
          </Typography>
      )}
        onLabelClick={() => {
          navigate(`/${category.slug}`, { replace: true });
        }}
      />
    )
    : (
      <TreeItem
        nodeId={category.id}
        key={category.id}
        label={(
          <Typography variant="subtitle1">
            {category.name}
          </Typography>
        )}
        onLabelClick={() => {
          navigate(`/${category.slug}`, { replace: true });
        }}
      >
        {category.childs.map((c) => categoryTree(c))}
      </TreeItem>
    )));

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {childs.map((c) => categoryTree(c))}
    </TreeView>
  );
};
CategorychildsTree.propTypes = {
  childs: PropTypes.array.isRequired
};

export default CategorychildsTree;
