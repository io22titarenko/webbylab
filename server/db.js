const Sequelize = require('sequelize');
const {Op} = Sequelize;
const sequelize = new Sequelize('postgres', 'postgres', 'Juve2019', {
  host: '127.0.0.1',
  dialect: 'postgres',
  operatorsAliases: false,
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: {
    $between: Op.between,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $iLike: Op.iLike,
    $ne: Op.ne,
    $not: Op.not,
    $or: Op.or,
    $contains: Op.contains,
    $any: Op.any,
}
});

module.exports = {sequelize, Sequelize};