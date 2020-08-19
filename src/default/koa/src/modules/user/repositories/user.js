import mongoose from 'mongoose';
import UserMap from '../mappers/userMap';
import AbstractUserRepository from './userAbtractRepository';

const userSchema = new mongoose.Schema({ name: String, age: Number });
const BaseUserModel = mongoose.model('user', userSchema);

class UserRepository extends AbstractUserRepository {
  /**
   * 获取用户
   * @param {String} id User对象ID
   */
  static async getUserById(id) {
    const userDoc = await BaseUserModel.findById(id);
    const user = UserMap.toDomain(userDoc);
    return user;
  }

  static async getUserByName(name) {
    const userDoc = await BaseUserModel.findOne({ name });
    const user = UserMap.toDomain(userDoc);
    return user;
  }

  /**
   * 创建用户
   * @param {{ age: number, name: string }} userProps
   */
  static async createUser(userProps) {
    const userDoc = await BaseUserModel.create(userProps);
    const user = UserMap.toDomain(userDoc);
    return user;
  }
}

export default UserRepository;
