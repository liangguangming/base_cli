// eslint-disable-next-line no-unused-vars
import IDomainEvent from './IDomainEvent';
// eslint-disable-next-line no-unused-vars
import IDomainEventHandler from './IDomainEventHandler';
import Logger from '../utils/Logger';

const eventLogger = new Logger('event');

class DomainEventEmitter {
  constructor() {
    this.eventHandlerMap = new Map();
  }

  /**
   * 添加事件监听
   * @param {IDomainEventHandler} event
   */
  addEvent(event) {
    let handlers = [];
    if (this.eventHandlerMap.has(event.name)) {
      handlers = this.eventHandlerMap.get(event.name);
    }
    handlers.push(event.handler);
    this.eventHandlerMap.set(event.name, handlers);
  }

  /**
   * 触发事件
   * @param {IDomainEvent} event 事件
   */
  fireEvent(event) {
    eventLogger.log({
      msg: '触发事件',
      event,
    });

    if (!this.eventHandlerMap.has(event.name)) {
      return;
    }

    const handlers = this.eventHandlerMap.get(event.name);
    handlers.forEach((handler) => {
      handler(event);
    });
  }

  /**
   * 清理事件
   * @param {String} eventName 事件名
   */
  clearEvent(eventName) {
    this.eventHandlerMap.delete(eventName);
  }
}

export default DomainEventEmitter;
