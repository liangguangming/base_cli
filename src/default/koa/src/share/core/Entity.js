/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { default: DomainEventEmitter } = require('./DomainEventEmitter');

class Entity extends DomainEventEmitter {
  /**
   * 实体信息
   * @param {{ id: mongoose.Types.ObjectId }} props 实体信息
   */
  constructor(props) {
    super();
    this.props = { ...props };
    if (props.id instanceof String) {
      const id = Entity.createObjectId(props._id);
      this.props.id = id;
    }
  }

  get id() {
    return this.props.id;
  }

  set id(val) {
    this.props.id = val;
  }

  static valid(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  /**
   * 创建或转换一个ObjectId
   * @param {String} [id] id
   */
  static createObjectId(id) {
    if (id) {
      return mongoose.Types.ObjectId(id);
    }

    return mongoose.Types.ObjectId();
  }

  /**
   * 判断实体是否相等
   * @param {Entity} entity 实体
   */
  equal(entity) {
    // eslint-disable-next-line no-underscore-dangle
    if (this.id === entity.id) {
      return true;
    }

    return false;
  }
}

export default Entity;
