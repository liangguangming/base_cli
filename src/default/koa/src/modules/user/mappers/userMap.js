import User from '../domains/entities/user';

class UserMap {
  static toDomain(userDoc) {
    if (!userDoc) {
      return null;
    }
    const userProps = {
      // eslint-disable-next-line no-underscore-dangle
      id: userDoc._id,
      name: userDoc.name,
      age: userDoc.age,
    };
    const user = User.createUser(userProps);
    return user;
  }

  /**
   * 持久化实体
   * @param {User} user 用户
   */
  static toRepository(user) {
    return {
      _id: user.id,
      name: user.name,
      age: user.age,
    };
  }

  static toDTO(user) {
    return {
      id: user.id,
      name: user.name,
      age: user.age,
    };
  }
}

export default UserMap;
