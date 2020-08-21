export default class AbstractUserRepository {
  /**
   * 获取用户信息
   * @param {String} id User对象ID
   */
  async getUserById(id = '') {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return { id };
  }

  /**
   * 获取用户信息
   * @param {string} name 用户名
   */
  async getUserByName(name) {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return { name };
  }

  /**
   * 获取用户
   * @param {String} id User对象ID
   */
  async createUser(userProps) {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return userProps;
  }
}
