import errorHandlers from './error';
import log from './log';
import session from './session';

export default function registerCustomMiddlewares(app) {
  app.use(errorHandlers);
  app.use(log);
  app.use(session(app));
}
