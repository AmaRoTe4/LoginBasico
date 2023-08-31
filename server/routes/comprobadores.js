import express from "express";
import {
  Validar_inicio_de_sesion,
  Token_sesion,
  Crear_cuente,
} from "../controllers/validaciones.js";

export const RouterComprobadores = express.Router();
RouterComprobadores.post("/crear_sesion", Crear_cuente);
RouterComprobadores.post("/iniciar_sesion", Validar_inicio_de_sesion);
RouterComprobadores.post("/token_sesion", Token_sesion);
