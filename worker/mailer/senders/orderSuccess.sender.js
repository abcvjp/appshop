const connection = require('../connection');
const { Worker } = require('bullmq');
const processor = require('../processors/orderSuccess.processor.js');

const sender = new Worker('orderSuccessMailQueue', processor, {
  connection,
  concurrency: 10
});

sender.on('progress', (job) => {
  console.log(`job ${job.name} is processing`);
});

sender.on('completed', (job) => {
  console.log(`job ${job.name} is done`);
});

sender.on('failed', (job) => {
  console.log(`job ${job.name} is failed`);
});

sender.on('error', (err) => {
  // log the error
  console.error(err);
});

module.exports = sender;
