class IDomainEventHandler {
  /**
   * 构造领域事件
   * @param {String} eventName 事件名称
   * @param {Function} handler 处理handler
   */
  constructor(eventName, handler) {
    this.name = eventName;
    this.handler = handler;
  }
}

export default IDomainEventHandler;
