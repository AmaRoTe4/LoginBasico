import db from "../db/db.js";
import { CLAVE } from "../config/config.js";

export const validarClaveGet = (req, res, next) => {
  //if (!req.header("clave")) {
  //  res.status(400).json({
  //    error: "required a clave for get",
  //  });
  //  next()
  //  return;
  //}
  //if (req.header("clave") !== CLAVE) {
  //  res.status(400).json({
  //    error: "access denied",
  //  });
  //  next()
  //  return;
  //}
};

export const validarClave = (req, res, next) => {
  //if (!req.get("clave")) {
  //  res.status(400).json({
  //    error: "required a clave for post",
  //  });
  //  next()
  //  return;
  //}
  //if (req.get("clave") !== CLAVE) {
  //  res.status(400).json({
  //    error: "access denied",
  //  });
  //  next()
  //  return;
  //}

  return true;
};

export const conexionDataBase = async (res, next) => {
  try {
    await db.authenticate();
    return true;
  } catch (error) {
    res.status(400).json({
      status: false,
      data: {},
      message: "Error con la conexion a base de datos!",
    });
    next();
    return false;
  }
};
