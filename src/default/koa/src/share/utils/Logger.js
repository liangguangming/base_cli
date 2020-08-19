import debug from 'debug';
import log4j from 'log4js';
import path from 'path';

const LOG4J_CONF = {
  appenders: {
    out: { type: 'stdout', level: 'debug' },
    dataFile: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../../../logger/all_log.log'),
      pattern: '.yyyy-MM-dd',
      level: 'info',
    },
  },
  categories: {
    default: { appenders: ['out', 'dataFile'], level: 'debug' },
  },
};

export const logger = log4j.configure(LOG4J_CONF);

class Logger {
  constructor(namespace) {
    this.logDebugger = debug(`ddd:${namespace}:log`);
    this.debugDebugger = debug(`ddd:${namespace}:debug`);
    this.warnDebugger = debug(`ddd:${namespace}:warn`);
    this.errorDebugger = debug(`ddd:${namespace}:error`);
  }

  log(formatter, ...data) {
    this.logDebugger(formatter, ...data);
  }

  debug(formatter, ...data) {
    this.debugDebugger(formatter, ...data);
  }

  warn(formatter, ...data) {
    this.warnDebugger(formatter, ...data);
  }

  error(formatter, ...data) {
    this.errorDebugger(formatter, ...data);
  }

  setOutputStream(outputStream) {
    this.logDebugger.log = outputStream;
    this.debugDebugger.log = outputStream;
    this.warnDebugger.log = outputStream;
    this.errorDebugger.log = outputStream;
  }
}

export default Logger;
