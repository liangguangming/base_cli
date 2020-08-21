import debug from 'debug';

class Logger {
  constructor(namespace) {
    this.logDebugger = debug(`cloud:${namespace}:log`);
    this.debugDebugger = debug(`cloud:${namespace}:debug`);
    this.warnDebugger = debug(`cloud:${namespace}:warn`);
    this.errorDebugger = debug(`cloud:${namespace}:error`);
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
