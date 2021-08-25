import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';
import Carousel from 'react-material-ui-carousel';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  marginBlock: {
    marginBlock: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(2)
  },
  imgBlock: {
    maxWidth: 500,
    height: 600,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  image: {
    width: '100%',
    maxHeight: '100%',
  },
  indImg: {
    margin: theme.spacing(0.5),
    maxHeight: 150,
    maxWidth: 120,
    height: '100%',
    width: '100%'
  },
  curIndImg: {
    margin: theme.spacing(0.5),
    maxHeight: 150,
    maxWidth: 120,
    height: '100%',
    width: '100%',
    border: '2px solid transparent',
    borderColor: 'black'
  }
}));

const ProductImages = ({ images }) => {
  const classes = useStyles();
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div>
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
            <div key={uuid()} className={classes.imgBlock}>
              <img
                className={classes.image}
                alt={image.alt}
                src={image.url}
              />
            </div>
          ))
        }
      </Carousel>
      {
        images.map((img, i) => (
          // eslint-disable-next-line
          <img
            key={uuid()}
            className={i === imgIndex ? classes.curIndImg : classes.indImg}
            src={img.url}
            alt={img.alt}
            onClick={() => {
              setImgIndex(i);
            }}
          />
        ))
      }
    </div>
  );
};

ProductImages.propTypes = {
  images: PropTypes.objectOf(PropTypes.object)
};

export default ProductImages;
