import { ImageBucketClient } from 'src/s3';

const uploadImages = async (images) => {
  try {
    const promises = [];
    images.forEach((image) => promises.push(
      ImageBucketClient.uploadFile(image.file, image.name)
    ));
    const responses = await Promise.all(promises);
    return responses.map((res) => res.location);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const deleteImage = async (imageFileName) => {
  try {
    await ImageBucketClient.deleteFile(imageFileName); // MODULE ERROR FOR THIS FUNCTION, DON'T USE UNTIL IT FIXED
  } catch (err) {
    console.log(err);
  }
};

export {
	uploadImages, // eslint-disable-line
  deleteImage
};
