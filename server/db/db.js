import { Sequelize } from "sequelize";
import { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER } from "../config/config.js";

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  headers: {
    Host: DB_HOST,
  },
  dialectOptions: {
    ssl: false
    //ssl: {
    //  rejectUnauthorized: false,
    //},
  },
});

export default db;
