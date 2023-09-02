import express from "express";
import {
  crear_cuente,
  iniciar_sesion,
  validar_token,
  estado_login,
  validar_existencia_email,
  update_password_email
} from "../controllers/validaciones.js";

export const RouterComprobadores = express.Router();
RouterComprobadores.post("/crear_sesion", crear_cuente);
RouterComprobadores.post("/iniciar_sesion", iniciar_sesion);

//validador de token
RouterComprobadores.post("/validar_token", validar_token);

//validando inicio estado se sesion
RouterComprobadores.post("/estado_login", estado_login);

//nuevo password (validar el email)
RouterComprobadores.post("/validar_existencia_email", validar_existencia_email);
//nuevo password (cambiar el password)
RouterComprobadores.post("/update_password_email", update_password_email);