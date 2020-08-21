import Koa from 'koa';
import koaBody from 'koa-body';
import router from './routes';
import registerCustomMiddlewares from './middlewares';
import Logger from './libs/Logger';
import MongoDB from './libs/db';

MongoDB.init();

const app = new Koa();

const logger = new Logger('app');

app.use(koaBody());

registerCustomMiddlewares(app);

app.use(router.routes());
app.use(router.allowedMethods());
logger.log('launch before');
app.listen(3000, () => {
  logger.log('launch successful listen to 3000');
});
