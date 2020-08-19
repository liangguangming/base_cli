const { default: DomainEventEmitter } = require('./DomainEventEmitter');

const globalEventEmitter = new DomainEventEmitter();

export const GLOBAL_EVENT = {
  LAUNCH: 'LAUNCH',
  MONGODB_INITED: 'MONGODB_INITED',
  HTTP_INITED: 'HTTP_INITED',
};

export default globalEventEmitter;
