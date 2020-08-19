import Koa from 'koa';
import koaBody from 'koa-body';
import router from './routers/router';
import globalEventEmitter, { GLOBAL_EVENT } from '../share/core/GloabelEventEmitter';
import registerCustomMiddlewares from './middlewares';

const app = new Koa();

/**
 * 0 未初始化
 * 1 初始化中
 * 2 成功启动
 */
let state = 0;

class HTTPServer {
  static get STATE() {
    return state;
  }

  static init() {
    state = 1;
    app.use(koaBody());

    registerCustomMiddlewares(app);

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(3000, () => {
      state = 2;
      globalEventEmitter.fireEvent({ name: GLOBAL_EVENT.HTTP_INITED });
    });
  }

  /**
   * 获取http服务器状态
   */
  static getStatus() {
    const result = {
      health: HTTPServer.STATE === 2,
      state: HTTPServer.STATE,
    };

    return result;
  }
}

export default HTTPServer;
