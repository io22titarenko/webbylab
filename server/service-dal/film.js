const {FilmSequelizeModel} = require('../model')
const keyFilmModel = Symbol('keyFilmModel')

class FilmDAL{
    constructor(){
        this[keyFilmModel] = FilmSequelizeModel
    }
    async createFilm(entity){
        const filmModel = this[keyFilmModel]
        return await filmModel.create(entity)
    }
    async findFilms(where= {}) {
        const filmModel = this[keyFilmModel]
        return await filmModel.findAll({
            where,
            order: [
                ['title', 'ASC'],
            ],
        })
    }
    async findFilm(id) {
        const filmModel = this[keyFilmModel]
        return await filmModel.findByPk(id)
    }
    async deleteFilm(id) {
        const filmModel = this[keyFilmModel]
        return await filmModel.destroy({where: {id}})
    }
}
module.exports = FilmDAL