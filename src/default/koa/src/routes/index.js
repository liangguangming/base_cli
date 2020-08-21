const Router = require('koa-router');
const home = require('./home');
const user = require('./user');

const router = new Router();

router.use('', home);
router.use('/users', user);

module.exports = router;
