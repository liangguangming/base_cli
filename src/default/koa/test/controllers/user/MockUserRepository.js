import AbstractUserRepository from '../../../src/models/user/AbstractUserRepository';

export default class MockUserRepository extends AbstractUserRepository {
  async getUserById() {
    return this;
  }

  async getUserByName() {
    return this;
  }

  async createUser() {
    return this;
  }
}
