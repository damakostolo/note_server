const Router = require('express');
const router = new Router();

const eventRouter = require('../Event/router/index');
const userRouter = require('../User/router/index');


router.use(eventRouter)
router.use(userRouter)

module.exports = router;