import session from 'koa-session';

import RedisStore from './redisStore';

export default function sessionHandler(app) {
  // eslint-disable-next-line no-param-reassign
  app.keys = [process.env.SESSION_KEY];

  return session({
    store: RedisStore,
  }, app);
}
