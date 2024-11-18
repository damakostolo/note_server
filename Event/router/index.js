const Router = require('express');
const router = new Router();
const eventController = require('../controller/eventController');



router.get('/event', eventController.getAll) //отримуємо усі евенти +

router.get('/event/:id', eventController.getOne)// отримання 1 елемента по id +

router.post('/regEvent', eventController.create ) // створення евентив +

router.delete('/event/:id', eventController.delete)//Видалення ивентив +

router.put('/event/:id', eventController.update)


module.exports = router;