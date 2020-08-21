const mongoose = require('mongoose');

export default class Util {
  /**
   * 验证 MONGOID
   * @param {string} id ObjectId
   */
  static validMongoId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}
