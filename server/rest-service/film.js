const FilmService = require('../service/film');
const keyFilmService = Symbol('FilmService');
const {FilmModel} = require('../model');

class Film{
    constructor(){
        this[keyFilmService] = new FilmService();
    }
    async createFilm(req, res, errorHandler){
        try{
            const film = await this[keyFilmService].createFilm(new FilmModel(req.body))
            res.status(201).send(film)
        } catch(err){
            errorHandler(err)
        }
    }
    async findFilms(req, res, errorHandler){
        try{
            const filter = {};
            if(req.query.title){
                filter.title = req.query.title; 
            }
            if(req.query.stars){
                filter.stars = { $contains : [req.query.stars] }
            }
            const film = await this[keyFilmService].findFilms(filter)
            res.send(film)
        } catch(err){
            errorHandler(err)
        }
    }
    async findFilm(req, res, errorHandler){
        try{
            const film = await this[keyFilmService].findFilm(req.params.id)
            if (film) {res.send(film)} else {
                res.status(404).send("Film not found")
            }
        }
        catch(err){
            errorHandler(err)
        }
    }
    async uploadFile(req, res, errorHandler){
        try{
            if(!(req.file&&req.file.buffer)){
                const error = new Error('File is not found')
                error.code=422
                throw error
            }
           const result =  await  this[keyFilmService].parseFile(req.file.buffer.toString('utf8'))
            res.status(200).send(result)
        }
        catch(err){
            errorHandler(err)
        }
    }
    async deleteFilm(req, res, errorHandler){
        try{
        await this[keyFilmService].deleteFilm(req.params.filmId)
        res.status(200).send("OK")
        } catch(err){
            errorHandler(err)
        }
    }
}

module.exports = Film