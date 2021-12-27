const { getRandomDate, getUniqueListBy } = require('../helpers/js.helper');

let sampleProducts = [
  ...require('./ao-khoac-gio-nam.json'),
  ...require('./ao-thun-tshirt-nam.json'),
  ...require('./ao-so-mi-caro-nam.json'),
  ...require('./ao-so-mi-nam-dai-tay.json'),
  ...require('./ao-so-mi-hoa-tiet-nam.json'),
  ...require('./ao-so-mi-trang-nam.json'),
  ...require('./ao-so-mi-nam-ngan-tay.json'),
  ...require('./ao-len-nam.json'),
  ...require('./ao-polo-nam.json'),
  ...require('./ao-vest-nam.json'),
  ...require('./quan-kaki-nam.json'),
  ...require('./quan-boxer.json'),
  ...require('./quan-jean-nam.json'),
  ...require('./quan-tay.json'),
  ...require('./bo-vest-nam.json'),
];

sampleProducts = getUniqueListBy(sampleProducts, 'name');

sampleProducts.forEach(record => {
  const randomDate = getRandomDate(new Date(2021, 11, 1),new Date(Date.now()));
  record.createdAt = randomDate;
  record.updatedAt = randomDate;
});

module.exports = sampleProducts;
