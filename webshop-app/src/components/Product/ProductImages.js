import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Carousel from 'react-material-ui-carousel';

import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  imgBlock: {
    maxWidth: 500,
    maxheight: 600,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    width: '100%',
    maxHeight: '100%',
  },
  indImg: {
    margin: theme.spacing(0.5),
    height: 140,
    width: 120,
  },
  curIndImg: {
    margin: theme.spacing(0.5),
    height: 140,
    width: 120,
    border: '2px solid transparent',
    borderColor: 'black'
  }
}));

const ProductImages = ({ images }) => {
  const classes = useStyles();
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <Box>
      <Carousel
        index={imgIndex}
        autoPlay={false}
        timeout={300}
        indicators={false}
        next={() => {
          if (imgIndex === images.length - 1) {
            setImgIndex(0);
          } else setImgIndex(imgIndex + 1);
        }}
        prev={() => {
          if (imgIndex === 0) {
            setImgIndex(images.length - 1);
          } else setImgIndex(imgIndex - 1);
        }}
      >
        {
          images.map((image) => (
            <div key={shortid.generate()} className={classes.imgBlock}>
              <img
                className={classes.image}
                alt={image.alt}
                src={image.url}
              />
            </div>
          ))
        }
      </Carousel>
      <Box mt={1}>
        {images.map((img, i) => (
          // eslint-disable-next-line
          <img
            key={shortid.generate()}
            className={i === imgIndex ? classes.curIndImg : classes.indImg}
            src={img.url}
            alt={img.alt}
            onClick={() => {
              setImgIndex(i);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

ProductImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
};

export default memo(ProductImages);
