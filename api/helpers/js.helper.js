exports.isEmptyArray = (arr) => {
  if (typeof arr !== 'undefined' && arr.length > 0) {
    return false;
  }
  return true;
};

exports.isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

exports.deleteObjProps = (obj, props = []) => {
  for (const p of props) {
    p in obj && delete obj[p];
  }
};

exports.getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

exports.getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
}

