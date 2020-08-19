class IDomainEvent {
  /**
   * 构造领域事件
   * @param {String} eventName 事件名称
   * @param { Object|Number|String|Symbol|undefined|null } data 处理handler
   */
  constructor(eventName, data) {
    this.name = eventName;
    this.data = data;
  }
}

export default IDomainEvent;
