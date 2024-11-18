const ApiError = require("../../errors/ApiErrors");
const {Event} = require("../../models/models")

class EventController {

    async create(req, res, next) {
        try {
            const {name,title, email,description, date} = req.body;
            if (!name || !title || !email || !description || !date) return next(ApiError.badRequest("Не вказано одне с полів "))

            const candidate = await Event.findOne({where: {title}})

            if(candidate){
                return next(ApiError.badRequest(`Узер вже зарестрував подію з такую назвою`))
            }

            const event = await Event.create({name, title, email, description, date})

            res.status(200).json({event})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const event = await Event.destroy({where: {id}})
            res.status(200).json({event})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name,title, email,description, date} = req.body;
            const upEvent = await Event.update(
                {name,title, email,description, date},
                {where: {id: id}
                })
            res.status(200).json({upEvent})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }



    async getAll(req, res) {
        const events = await Event.findAll()
        res.status(200).json(events)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const events = await Event.findOne({where: {id}})
            res.status(200).json({events})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new EventController();