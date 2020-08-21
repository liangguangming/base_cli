import mongo from 'mongoose';
import Logger from './Logger';

const dbLogger = new Logger('db');

const { MONGO_URI } = process.env;

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

class MongoDB {
  static connect() {
    mongo.connect(MONGO_URI, options);
  }

  static initEvent() {
    mongo.connection.on('connected', async () => {
      dbLogger.log('MoogoDB connect success');
    });
    mongo.connection.on('error', () => {
      dbLogger.error('MoogoDB connect fail');
    });
    mongo.connection.on('disconnected', () => {
      dbLogger.error('MoogoDB connect disconnected');
    });
  }

  static init() {
    MongoDB.connect();
    MongoDB.initEvent();
  }
}

export default MongoDB;
