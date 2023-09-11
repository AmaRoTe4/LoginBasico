import { validarClave, validarClaveGet } from "../validaciones/index.js";
import {
  getAllData,
  getAllDataById_prof,
  getDataById,
  updateData,
  createData,
  deleteData,
} from "./data.js";

export const getAll = (Model) => async (req, res, next) => {
  try {
    validarClaveGet(req, res);
    const response = await getAllData(Model);
    res.json(response);
  } catch (err) {
    res.json({ status: false, resultado: {}, message: err.message });
    next(err);
  }
};

export const getAllById_prof = (Model) => async (req, res, next) => {
  try {
    validarClaveGet(req, res);
    const response = await getAllDataById_prof(Model, req.params.Id_prof);
    res.json(response);
  } catch (err) {
    res.json({ status: false, resultado: {}, message: err.message });
    next(err);
  }
};

export const getByIdG = (Model) => async (req, res, next) => {
  try {
    validarClaveGet(req, res);
    const response = await getDataById(Model, req.params.id);
    res.json(response);
  } catch (err) {
    res.json({ status: false, resultado: {}, message: err.message });
    next(err);
  }
};

export const updateG = (Model) => async (req, res, next) => {
  try {
    validarClave(req, res, next);
    const resultado = await updateData(Model, req.body, req.params.id);
    res.json({
      status: true,
      resultado,
      message: "actualizado con exitos",
    });
  } catch (err) {
    res.json({ status: false, resultado: {}, message: err.message });
    next(err);
  }
};

export const createG = (Model) => async (req, res, next) => {
  try {
    validarClave(req, res, next);
    const resultado = await createData(Model, req.body);

    console.log("CREAR: " + JSON.stringify(resultado));

    res.json({
      status: true,
      resultado,
      message: "creado con exitos",
    });
  } catch (err) {
    res.json({ status: false, resultado: {}, message: err.message });
    next(err);
  }
};

export const deleteG = (Model) => async (req, res, next) => {
  try {
    validarClave(req, res, next);
    const resultado = await deleteData(Model, req.params.id);
    res.json({
      status: true,
      resultado,
      message: "Borrado con exitos",
    });
  } catch (err) {
    res.json({ status: false, resultado: {}, message: err.message });
    next(err);
  }
};
