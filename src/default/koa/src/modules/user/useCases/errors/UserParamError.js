import ERROR_CODE from './errorCode';
import BaseError from '../../../../share/errors/error';

class UserParamError extends BaseError {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'USER_PARAM_ERROR';
    this.code = ERROR_CODE.USER_PARAM_ERROR;
  }
}

export default UserParamError;
