const config = require('./config');
const { Queue, QueueScheduler } = require('bullmq');
const { logger } = require('./helpers');

const redisConnection = {
  host: config.get('redis.host'),
  port: config.get('redis.port'),
  password: config.get('redis.password')
};
const ORDER_CONFIRMATION_MAIL_QUEUE_NAME = 'orderConfirmationMailQueue';

const orderConfirmationMailQueue = new Queue(
  ORDER_CONFIRMATION_MAIL_QUEUE_NAME,
  {
    connection: redisConnection,
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 6,
      backoff: { type: 'exponential', delay: 1000 }
    }
  }
);
const orderConfirmationMailQueueScheduler = new QueueScheduler(
  ORDER_CONFIRMATION_MAIL_QUEUE_NAME,
  {
    connection: redisConnection
  }
);
orderConfirmationMailQueue.on('completed', (job) => {
  logger.info(`${job.name} is COMPLETED`);
});
orderConfirmationMailQueue.on('failed', (job) => {
  logger.info(`${job.name} is FAILED`);
});

module.exports = {
  orderConfirmationMailQueue
};
