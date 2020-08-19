/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose';
import UserCreateError from '../../useCases/errors/UserCreateError';
import CreateUserEvent from '../events/createUserEvent';
import Entity from '../../../../share/core/Entity';
import Logger from '../../../../share/utils/Logger';

const userLogger = new Logger('user');

class User extends Entity {
  /**
   * 用户信息
   * @param {{ id: mongoose.Types.ObjectId, name: String, age?: Number }} props 用户信息
   */
  constructor(props) {
    super(props);
    this.initEvent();
  }

  get name() {
    return this.props.name;
  }

  get age() {
    return this.props.age;
  }

  set name(val) {
    this.props.name = val;
  }

  set age(val) {
    this.props.age = val;
  }

  initEvent() {
    this.addEvent({
      name: new CreateUserEvent().name,
      handler: (event) => {
        User.printEvent(event);
      },
    });
  }

  static printEvent(event) {
    userLogger.log(event);
  }

  /**
   * 用户信息
   * @param {{ name: String, age?: Number, id?: String | mongoose.Types.ObjectId }} props 用户信息
   */
  static createUser(props = {}) {
    if (!props.name) {
      throw new UserCreateError('缺少名字: name');
    }
    const finalId = props.id || User.createObjectId();
    const user = new User({ id: finalId, ...props });
    if (!props.id) {
      user.fireEvent(new CreateUserEvent(user));
    }

    return user;
  }
}

export default User;
