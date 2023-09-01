import db from "../db/db.js";
import DataTypes from "sequelize";

export const ModelUsers = db.define("users", {
  id: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombre: { type: DataTypes.STRING },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  estado: { type: DataTypes.BOOLEAN },
  token: { 
    type: DataTypes.STRING, 
    allowNull: true,
    unique: true
  },
});

export const ModelValidaciones = db.define("validaciones", {
  id: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true,
  },
  id_prof: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: DataTypes.STRING },
  salt: { type: DataTypes.STRING },
  token: { type: DataTypes.BOOLEAN },
});