import Logger from '../../share/utils/Logger';

const httpLogger = new Logger('http');

export default async function log(ctx, next) {
  httpLogger.log(`${ctx.method}  ${ctx.path}`);
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  const logMessage = {
    time: `${ms} ms`,
    method: ctx.method,
    path: ctx.path,
    req: {
      query: ctx.request.query,
      params: ctx.params,
      body: ctx.request.body,
    },
    res: {
      statusCode: ctx.status,
      body: ctx.body,
    },
  };
  httpLogger.debug(logMessage);
}
