import mongo from 'mongoose';
import globalEventEmitter, { GLOBAL_EVENT } from '../core/GloabelEventEmitter';
import Logger from '../utils/Logger';

const dbLogger = new Logger('db');

const MONGO_URI = 'mongodb://192.168.200.179:27017/koaTest';

const options = {
  useNewUrlParser: true,
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000,
    },
    reconnectTries: 30,
    reconnectInterval: 3000,
  },
};

/**
 * 0 未初始化
 * 1 初始化中
 * 2 成功启动
 */
let mongodbState = 0;

class MongoDB {
  static connect() {
    mongo.connect(MONGO_URI, options);
  }

  static initEvent() {
    mongodbState = 1;
    mongo.connection.on('connected', async () => {
      mongodbState = 2;
      dbLogger.log('MoogoDB connect success');
      globalEventEmitter.fireEvent({ name: GLOBAL_EVENT.MONGODB_INITED });
    });
    mongo.connection.on('error', () => {
      mongodbState = 0;
      dbLogger.error('MoogoDB connect fail');
    });
    mongo.connection.on('disconnected', () => {
      mongodbState = 0;
      dbLogger.error('MoogoDB connect disconnected');
    });
  }

  static init() {
    MongoDB.connect();
    MongoDB.initEvent();
  }

  static get STATE() {
    return mongodbState;
  }

  /**
   * 获取数据库状态
   */
  static getStatus() {
    const result = {
      health: MongoDB.STATE === 2,
      state: MongoDB.STATE,
    };

    return result;
  }
}

export default MongoDB;
