const Router = require('express');
const router = new Router();
const userController = require('../controller/userController');


router.get('/user', userController.getAll )//отримання всіх юзерів+

//router.get('/user/:id', userController.getUserEvent )//отримання юзера по id ивента , не оботает

router.post('/registration', userController.registration )// реестрація на сайті +

router.put('/regEvent/:id', userController.regEvent )// реестрація на івент

router.delete('/user/:id', userController.delete ) //видалення юзерів+



module.exports = router;