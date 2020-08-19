import ERROR_CODE from './errorCode';
import BaseError from '../../../../share/errors/error';

class UserNotFoundError extends BaseError {
  constructor(message) {
    super();
    this.message = message || '未找到该用户';
    this.name = 'USER_NOTFOUND_ERROR';
    this.code = ERROR_CODE.USER_NOTFOUND_ERROR;
  }
}

export default UserNotFoundError;
