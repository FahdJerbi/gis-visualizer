const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.CHAR, allowNull: false },
    // layer: {
    //   type: DataTypes.JSON,
    // },
  },
  {
    tableName: "user",
  }
);

sequelize.sync({ logging: false });
// sequelize.sync({ force: true, logging: false });

module.exports = User;
