const config = require('./config');
const { Queue, QueueScheduler } = require('bullmq');

const redisConnection = {
  host: config.get('redis.host'),
  port: config.get('redis.port'),
  password: config.get('redis.password')
};
const ORDER_CONFIRMATION_MAIL_QUEUE_NAME = 'orderConfirmationMailQueue';
const ORDER_SUCCESS_MAIL_QUEUE_NAME = 'orderSuccessMailQueue';
const FORGOT_PASSWORD_MAIL_QUEUE_NAME = 'forgotPasswordMailQueue';

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
// orderConfirmationMailQueue.on('completed', (job) => {
  // logger.info(`${job.name} is COMPLETED`);
// });
// orderConfirmationMailQueue.on('failed', (job) => {
  // logger.info(`${job.name} is FAILED`);
// });

const orderSuccessMailQueue = new Queue(
  ORDER_SUCCESS_MAIL_QUEUE_NAME,
  {
    connection: redisConnection,
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 6,
      backoff: { type: 'exponential', delay: 1000 }
    }
  }
);
const orderSuccessMailQueueScheduler = new QueueScheduler(
  ORDER_SUCCESS_MAIL_QUEUE_NAME,
  {
    connection: redisConnection
  }
);

const forgotPasswordMailQueue = new Queue(
  FORGOT_PASSWORD_MAIL_QUEUE_NAME,
  {
    connection: redisConnection,
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 6,
      backoff: { type: 'exponential', delay: 1000 }
    }
  }
);
const forgotPasswordMailQueueScheduler = new QueueScheduler(
  FORGOT_PASSWORD_MAIL_QUEUE_NAME,
  {
    connection: redisConnection
  }
);

module.exports = {
  orderConfirmationMailQueue,
  orderSuccessMailQueue,
  forgotPasswordMailQueue
};
