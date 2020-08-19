import Router from 'koa-router';
import userCli from '../../modules/user/userCli';

const user = new Router();

user.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const result = await userCli.user.getUserById(id);
  ctx.body = result;
});

user.post('/', async (ctx) => {
  const userProps = ctx.request.body;
  const result = await userCli.user.createUser(userProps);
  ctx.body = result;
});

module.exports = user.routes();
