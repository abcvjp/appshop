import PropTypes from 'prop-types';
import { Modal, Typography } from '@material-ui/core';

const ProductImageViewer = ({ open, handleClose }) => (
  <>
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Typography>

        HOAI DEP TRAI
      </Typography>
    </Modal>
  </>
);

ProductImageViewer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ProductImageViewer;
