const { uuid } = require('uuidv4');
const slug = require('slug');
const data = require('./sample-data/quan_jean.json');
const { roundPrice } = require('./helpers/logicFunc.helper');
const fs = require('fs');

const result = [];

data.products.forEach((record) => {
  let {
    name,
    title,
    meta_title,
    price,
    root_price,
    short_description,
    description,
    images_url
  } = record;

  if (price == undefined) {
    price = Math.floor(Math.random() * 20 + 10);
  } else {
    price = price.split(' ')[0];
    price = roundPrice(parseInt(price.replaceAll('.', ''), 10) / 24000);
  }
  if (root_price == undefined) {
    root_price = price;
  } else {
    root_price = root_price.split(' ')[0];
    root_price = roundPrice(
      parseInt(root_price.replaceAll('.', ''), 10) / 24000
    );
  }
  if (short_description != undefined) {
    if (short_description.length > 300) {
      short_description = short_description.substring(0, 299);
    }
    if (description == undefined) {
      description = short_description;
    }
    if (images_url !== undefined) {
      images_url = JSON.stringify([{ url: images_url }]);
    } else {
      images_url = null;
    }
    const slugName = slug(name);
    const id = uuid();
    result.push({
      id,
      category_id: 'e71ab7e6-c8f0-41a0-98ec-7cb5b817aa76',
      name,
      slug: slugName,
      title,
      meta_title,
      price,
      root_price,
      quantity: Math.floor(Math.random() * 100),
      sold: Math.floor(Math.random() * 100),
      short_description,
      description,
      images: images_url,
      enable: true,
      published: true
    });
  }
});

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

storeData(result, './sample-data/quan_jean.data.json');
