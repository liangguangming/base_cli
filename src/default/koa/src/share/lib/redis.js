import * as bluebird from 'bluebird';
import * as redis from 'redis';

import Logger from '../utils/Logger';

const logger = new Logger('redis-cli');

const { REDIS_HOST, REDIS_PORT } = process.env;

const client = redis.createClient({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
});

client.on('error', (err) => {
  logger.error({ error: err });
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export default client;
