const connection = require('../connection');
const { Worker } = require('bullmq');
const processor = require('../processors/orderSuccess.processor.js');

const confirmOrderSender = new Worker('orderSuccessMailQueue', processor, {
  connection,
  concurrency: 10
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

module.exports = confirmOrderSender;
