import Result from '../../global/result';
import UserParamError from './errors/UserParamError';
import UserCreateError from './errors/UserCreateError';
import ServerError from '../../global/errors/ServerError';
import Validator from '../../libs/Validator';
import UserNotFoundError from './errors/UserNotFoundError';
import Logger from '../../libs/Logger';
import UserDTO from './dto/userDTO';
import BaseError from '../../global/errors/BaseError';
// eslint-disable-next-line no-unused-vars
import CreateUserDTO from './dto/createUserDTO';
// eslint-disable-next-line no-unused-vars
import AbstractUserRepository from '../../models/user/AbstractUserRepository';
import Util from '../../libs/Util';

const userLogger = new Logger('user');

// 用例入口
class UserController {
  /**
   * 构造控制器
   * @param {AbstractUserRepository} userRepository 用户仓库
   */
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
      if (!Util.validMongoId(id)) {
        throw new UserParamError('用户ID不对');
      }
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new UserNotFoundError();
      }
      result = new Result(null, `获取到${id}用户的信息`, new UserDTO({ id: user.id, name: user.name, age: user.age }));
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
   * @param { CreateUserDTO } userProps 用户信息
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
      user = await this.userRepository.createUser(userProps);
      result = new Result(null, '创建用户成功', new UserDTO({ id: user.id, name: user.name, age: user.age }));
    } catch (error) {
      // 特定错误处理在BaseError之上处理
      if (error instanceof BaseError) {
        result = new Result(error, '创建用户失败');
      } else {
        userLogger.log('server_error: \n', 'req: ', userProps, '\nerror: ', error);
        result = new Result(new ServerError(), '创建用户失败');
      }
    }

    return result;
  }
}

export default UserController;
