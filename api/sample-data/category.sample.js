const sampleCategories = require('./categories.data.json');

sampleCategories.forEach(record => {
  const nowDate = new Date(Date.now());
  record.createdAt = nowDate;
  record.updatedAt = nowDate;
});

module.exports = sampleCategories;