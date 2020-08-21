import Router from 'koa-router';

const home = new Router();

home.get('/', (ctx) => {
  ctx.body = '首页';
});

module.exports = home.routes();
