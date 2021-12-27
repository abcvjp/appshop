const sampleOrderItems = [
  {
    price: 5,
    quantity: 2,
    order_id: '9e648f69-8381-4f67-b7d7-4743a78f7f34',
    product_id: '08452667-319d-4f19-abfe-9db953a18587',
    product_name: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY',
    product_thumbnail:
      'https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg',
  },
  {
    price: 5,
    quantity: 3,
    order_id: '257d2905-e7d7-4060-8840-f63c1a456417',
    product_id: '598d6f47-7c7e-4365-9c3a-83f322926658',
    product_name: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 2',
    product_thumbnail:
      'https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg',
  }
];

sampleOrderItems.forEach(record => {
  record.createdAt = new Date();
  record.updatedAt = new Date();
});

module.exports = sampleOrderItems;