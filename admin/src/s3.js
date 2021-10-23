import S3 from 'react-aws-s3';

const {
  REACT_APP_AWS_ACCESS_KEY_ID,
  REACT_APP_AWS_S3_URI,
  REACT_APP_AWS_SECRET_KEY,
  REACT_APP_AWS_REGION,
  REACT_APP_AWS_S3_BUCKET_NAME
} = process.env;

const ImageBucketClient = new S3({
  bucketName: REACT_APP_AWS_S3_BUCKET_NAME,
  dirName: 'images', /* optional */
  region: REACT_APP_AWS_REGION,
  accessKeyId: REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_AWS_SECRET_KEY,
  s3Url: REACT_APP_AWS_S3_URI, /* optional */
});

export {
  // eslint-disable-next-line
  ImageBucketClient
};
