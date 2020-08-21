import mongoose from 'mongoose';
import AbstractUserRepository from './AbstractUserRepository';

const userSchema = new mongoose.Schema({ name: String, age: Number });
const BaseUserModel = mongoose.model('user', userSchema);

class UserRepository extends AbstractUserRepository {
  constructor() {
    super();
    this.model = BaseUserModel;
  }

  async getUserById(id) {
    const user = await this.model.findById(id);
    return user;
  }

  async getUserByName(name) {
    const user = await this.model.findOne({ name });
    return user;
  }

  async createUser(userProps) {
    const user = await this.model.create(userProps);
    return user;
  }
}

export default UserRepository;
