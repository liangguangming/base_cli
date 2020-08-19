import errorHandlers from './error';
import log from './log';

export default function registerCustomMiddlewares(app) {
  app.use(errorHandlers);
  app.use(log);
}
