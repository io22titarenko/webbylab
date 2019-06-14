const {Sequelize, sequelize} = require('./db')

const Model = Sequelize.Model;
const filmSchema = {
    id: {type: Number, primaryKey: true, autoIncrement: true},
    title: {type: String, required: true},
    year: {type: Number, required: true},
    format: {type: String, required: true},
    stars: {type: Sequelize.ARRAY(Sequelize.TEXT), required: true},
}

class FilmSequelizeModel extends Model {}
FilmSequelizeModel.init(filmSchema, {
  sequelize,
  modelName: 'films',
  timestamps: false
});

class FilmModel {
  constructor(body){
    Object.keys(filmSchema).forEach((key)=>{
      if(filmSchema[key].required && !body[key]) {
        const err = new Error(`Field ${key} is not specified`);
        err.code = 422;
        throw err
      }
      this[key] = body[key];
    })
  }
}

module.exports = {FilmSequelizeModel, FilmModel}