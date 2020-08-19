import redisClient from '../../../share/lib/redis';

class RedisStore {
  static async get(key) {
    const data = await redisClient.getAsync(`SESSION:${key}`);
    return JSON.parse(data);
  }

  static async set(key, sess, maxAge) {
    await redisClient.setAsync(`SESSION:${key}`, JSON.stringify(sess), 'EX', maxAge / 1000);
  }

  static async destroy(key) {
    const res = await redisClient.delAsync(`SESSION:${key}`);
    return res;
  }
}

export default RedisStore;
