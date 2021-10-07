const connection = require('../connection');
const { Worker } = require('bullmq');
const processor = require('../processors/orderConfirmation.processor.js');

const confirmOrderSender = new Worker('orderConfirmationMailQueue', processor, {
  connection,
  concurrency: 5
});

confirmOrderSender.on('progress', (job) => {
  console.log(`job ${job.name} is processing`);
});

confirmOrderSender.on('completed', (job) => {
  console.log(`job ${job.name} is done`);
});

confirmOrderSender.on('failed', (job) => {
  console.log(`job ${job.name} is failed`);
});

confirmOrderSender.on('error', (err) => {
  // log the error
  console.error(err);
});

console.log('Order confirmation sender is ready');

module.exports = confirmOrderSender;
