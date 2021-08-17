export const objMap = (obj, func) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
export const isArrayEmpty = (arr) => (!((typeof arr !== 'undefined') && arr.length > 0));

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const createDataTree = (dataset) => {
  const hashTable = Object.create(null);
  dataset.forEach((aData) => { hashTable[aData.id] = { ...aData, childs: [] }; });
  const dataTree = [];
  dataset.forEach((aData) => {
    if (aData.parent_id) hashTable[aData.parent_id].childs.push(hashTable[aData.id]);
    else dataTree.push(hashTable[aData.id]);
  });
  return dataTree;
};

export const generateBreadCrumbs = (string, map_name_slug) => {
  string.split(' - ').map((name) => ({
    name,
    path: map_name_slug[name] ? map_name_slug[name] : ''
  }));
};

export const convertObjToQuery = (query) => {
  let url = '';
  Object.keys(query).forEach((key, index) => {
    if (index === 0) {
      url = url.concat(`?${key}=${query[key]}`);
    } else {
      url = url.concat(`&${key}=${query[key]}`);
    }
  });
  return url;
};

export const cleanObj = (obj) => {
  Object.keys(obj).forEach((k) => {
    const objProp = obj[k];
    if (objProp === null || objProp === undefined || objProp === '' || objProp === {} || objProp === []) delete obj[k]; // eslint-disable-line
    else if (typeof objProp === 'object' && Object.keys(objProp).length > 0) cleanObj(obj[k]);
  });
  return obj;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const moveInArray = (arr, from, to) => {
  // Make sure a valid array is provided
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    throw new Error('Please provide a valid array');
  }

  // Delete the item from it's current position
  const item = arr.splice(from, 1);

  // Make sure there's an item to move
  if (!item.length) {
    throw new Error(`There is no item in the array at index ${from}`);
  }

  // Move the item to its new position
  arr.splice(to, 0, item[0]);
};

export const statusColors = {
  Completed: 'green',
  Canceled: 'red',
  Handling: 'DodgerBlue',
  Pending: 'orange',
  Paid: 'green',
  Unpaid: 'orange',
  'Successfully delivered': 'green',
  'Delivery failed': 'red',
  Undelivered: 'orange',
  Delivering: 'DodgerBlue',
  Disabled: 'red',
  Enabled: 'green',
  DISABLED: 'red',
  ENABLED: 'green'
};
