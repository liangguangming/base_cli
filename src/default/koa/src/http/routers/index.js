import Router from 'koa-router';

import app from '../../app';
import Result from '../../share/core/result';

const home = new Router();

home.get('/', (ctx) => {
  ctx.body = '首页';
});

home.get('/status', (ctx) => {
  const status = app.getStatus();
  ctx.body = new Result(null, '', status);
});

module.exports = home.routes();
