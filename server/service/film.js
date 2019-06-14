const FilmDAL = require('../service-dal/film')
class FilmService{
    constructor(){
        this.film = new FilmDAL();
    }
    async createFilm(entity){
        if(entity.title) {
            const data = await this.film.findFilms({title :  entity.title})
            if (data.length > 0){ 
                const error = new Error(`Film with title: ${entity.title} exists`);
                error.code=409
                throw error
            }
        }
        return await this.film.createFilm(entity)
    }
    async findFilms(where){
        return await this.film.findFilms(where)
    }
    async findFilm(id){
        return await this.film.findFilm(id)
    }
    async parseFile(file){
        const regex = /Title: (?<title>.+)\nRelease Year: (?<year>\d+)\nFormat: (?<format>.+)\nStars: (?<stars>.+)/;
        let matches = file.match(new RegExp(regex, 'g'));
        const results = matches.map(el => el.match(regex).groups)
        return await Promise.all(results.map(async (film)=>{
            film.stars = film.stars.split(', ')
            return await this.createFilm(film)
        }))
    }
    async deleteFilm(id){
        return await this.film.deleteFilm(id)
    }
}

module.exports = FilmService