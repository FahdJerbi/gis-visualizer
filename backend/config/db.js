const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "gis-visualizer",
  username: "postgres",
  password: "000",
  port: 5432,
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
