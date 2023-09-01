import express from "express";
import {
  crear_cuente,
  iniciar_sesion,
  validar_token,
  estado_login
} from "../controllers/validaciones.js";

export const RouterComprobadores = express.Router();
RouterComprobadores.post("/crear_sesion", crear_cuente);
RouterComprobadores.post("/iniciar_sesion", iniciar_sesion);
RouterComprobadores.post("/validar_token", validar_token);
RouterComprobadores.post("/estado_login", estado_login);