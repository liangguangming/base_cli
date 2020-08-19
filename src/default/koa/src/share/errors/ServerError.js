import ERROR_CODE from './ErrorCode';
import BaseError from './error';

class ServerError extends BaseError {
  constructor() {
    super();
    this.message = '服务器错误';
    this.name = 'SERVER_ERROR';
    this.code = ERROR_CODE.SERVER_ERROR;
  }
}

export default ServerError;
