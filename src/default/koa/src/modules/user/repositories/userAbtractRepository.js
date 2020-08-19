import User from '../domains/entities/user';

export default class AbstractUserRepository {
  static async getUserById(id = '') {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return User.createUser({ id });
  }

  static async getUserByName(name) {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return User.createUser({ name });
  }

  static async createUser(userProps) {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return User.createUser(userProps);
  }
}
