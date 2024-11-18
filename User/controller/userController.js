const ApiError = require("../../errors/ApiErrors");
const {User,UserEvent, Event} = require("../../models/models")


class EventController {

    async registration(req, res, next) {
        try {
            const {name, email, date} = req.body;

            if (!name|| !email || !date) return next(ApiError.badRequest("Не вказано одне с полів "))

            const candidate = await User.findOne({where: {email: email}})

            if(candidate){
                return next(ApiError.badRequest(`Ви вже зареестроварі`))
            }

            const user = await User.create({name, email, date})

            res.status(200).json({user})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async regEvent(req, res, next) {
        try {
            const { id } = req.params;       // ID события
            const { email } = req.body;      // Email пользователя

            // Найти пользователя по email
            const user = await User.findOne({ where: { email } });
            if (!user) return next(ApiError.badRequest("Пользователь не найден"));

            // Проверить, существует ли событие
            const event = await Event.findOne({where: {id}})
            if (!event) return next(ApiError.badRequest("Событие не найдено"));

            // Проверить, зарегистрирован ли уже пользователь на это событие
            const existingRegistration = await UserEvent.findOne({
                where: { userId: user.id, eventId: id }
            });

            if (existingRegistration) {
                return res.status(200).json({ message: "Пользователь уже зарегистрирован на это событие" });
            }

            // Зарегистрировать пользователя на событие, добавив запись в UserEvent
            await UserEvent.create({ userId: user.id, eventId: id });

            res.status(200).json({ message: "Пользователь успешно зарегистрирован на событие" });
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            console.log(id)
            const user = await User.destroy({where: {id}})
            res.status(200).json({user})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }



    async getAll(req, res) {
        const events = await User.findAll()
        res.status(200).json(events)
    }

    async getUserEvent(req, res, next) {
        try {
            const {id} = req.params;
            const user = await User.findAll({where: {eventId: id}})
            res.status(200).json({user})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new EventController();