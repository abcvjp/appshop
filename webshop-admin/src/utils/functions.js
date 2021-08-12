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
    if (obj[k] === null || obj[k] === undefined || obj[k] === '' || obj[k] === {} || obj[k] === []) delete obj[k];// eslint-disable-line
  });
  return obj;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'green';
    case 'Canceled':
      return 'red';
    default:
      return 'orange';
  }
};
export const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'Paid':
      return 'green';
    case 'Unpaid':
      return 'red';
    default:
      return 'orange';
  }
};
export const getShippingStatusColor = (status) => {
  switch (status) {
    case 'Successfully delivered':
      return 'green';
    case 'Delivery failed':
      return 'red';
    default:
      return 'orange';
  }
};
