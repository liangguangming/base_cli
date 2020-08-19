import UserController from './useCases/userController';
import UserRepository from './repositories/user';

export default {
  user: new UserController(UserRepository),
};

// 启动用户域的服务
// 启动服务检查
// 初始化的动作
// 初始化缓存数据
