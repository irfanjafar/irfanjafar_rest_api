const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.Host,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.min,
    idle: dbConfig.pool.min,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//create table
db.posts = require("./post.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
module.exports = db;
