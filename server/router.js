const express = require('express')
const Film = require('./rest-service/film')
const multer = require('multer')
const upload = multer()
const Router = express.Router;

function MyRouter() {

    const router = new Router();
    const filmController = new Film();
    router.prefix = '/api'

    router.get('/film', filmController.findFilms.bind(filmController))
    router.get('/film/:id', filmController.findFilm.bind(filmController))
    router.post('/film', filmController.createFilm.bind(filmController))
    router.post('/film/upload', upload.single('file'), filmController.uploadFile.bind(filmController))
    router.delete('/film/:filmId', filmController.deleteFilm.bind(filmController))

    return router
}

module.exports = MyRouter