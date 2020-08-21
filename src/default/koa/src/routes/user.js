import Router from 'koa-router';
import UserController from '../controllers/user/userController';
import UserRepository from '../models/user/user';
import CreateUserDTO from '../controllers/user/dto/createUserDTO';

const user = new Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

user.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const result = await userController.getUserById(id);
  ctx.body = result;
});

user.post('/', async (ctx) => {
  const userProps = ctx.request.body;
  const reqDTO = new CreateUserDTO(userProps);
  const result = await userController.createUser(reqDTO);
  ctx.body = result;
});

module.exports = user.routes();
