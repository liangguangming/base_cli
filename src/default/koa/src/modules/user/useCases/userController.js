import User from '../domains/entities/user';
import Result from '../../../share/core/result';
import UserParamError from './errors/UserParamError';
import UserCreateError from './errors/UserCreateError';
import ServerError from '../../../share/errors/ServerError';
import Validator from '../../../share/lib/Validator';
import BaseError from '../../../share/errors/error';
import UserNotFoundError from './errors/UserNotFoundError';
import UserMap from '../mappers/userMap';
import Logger from '../../../share/utils/Logger';

const userLogger = new Logger('user');

// 用例入口
// 通过注入的方式：注入Repository 以及 Service,便于接入 mock 数据
class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * 查询某个用户
   * @param { String } 用户ID
   */
  async getUserById(id) {
    let result;
    try {
      if (!id) {
        throw new UserParamError('缺少用户ID');
      }
      if (!User.valid(id)) {
        throw new UserParamError('用户ID不对');
      }
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new UserNotFoundError();
      }
      result = new Result(null, `获取到${id}用户的信息`, UserMap.toDTO(user));
    } catch (error) {
      if (error instanceof BaseError) {
        result = new Result(error, `获取用户 ${id} 信息失败`);
      } else {
        userLogger.error('%o', error);
        result = new Result(new ServerError(), '获取用户失败');
      }
    }
    return result;
  }

  /**
   * 新增用户
   * @param {Object} userProps 用户信息
   */
  async createUser(userProps = {}) {
    let user;
    let result;
    try {
      const validateSchema = {
        required: ['name'],
      };
      Validator.validateBySchema(validateSchema, userProps);
      // 判断用户是否存在{name来判断}
      const existUser = await this.userRepository.getUserByName(userProps.name);
      if (existUser) {
        throw new UserCreateError('用户名重复');
      }
      user = User.createUser(userProps);
      user = await this.userRepository.createUser(UserMap.toRepository(user));
      result = new Result(null, '创建用户成功', UserMap.toDTO(user));
    } catch (error) {
      // 特定错误处理在BaseError之上处理
      if (error instanceof BaseError) {
        result = new Result(error, '创建用户失败');
      } else {
        userLogger('server_error: \n', 'req: ', userProps, '\nerror: ', error);
        result = new Result(new ServerError(), '创建用户失败');
      }
    }

    return result;
  }
}

export default UserController;
