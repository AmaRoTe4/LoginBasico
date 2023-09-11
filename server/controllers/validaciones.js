import { createData, falseToken } from "../controllers/data.js";
import {
  validate_token,
  trueToken,
  getPasswordAndSaltByEmail,
  updateToken,
  existEmail,
  validate_sesion_by_id_user,
  existencia_email_with_data,
  updatePasswordByEmail,
  id_user_for_id,
} from "../controllers/data.js";
import { createToken } from "../functions/token.js";
import { ComprobarPassword, SifrarPassword } from "../functions/bcrypt.js";
import { ModelUsers, ModelValidaciones } from "../models/models.js";
import {
  validateEmailAndPassword,
  validateEmail,
} from "../functions/validaciones.js";
import { conexionDataBase, validarClave } from "../validaciones/index.js";

const standar = async (req, res, next) => {
  const status_of_data_base = await conexionDataBase(res, next);
  const status_of_clave = validarClave(req, res, next);
  return status_of_clave && status_of_data_base;
};

const validarDataEmail = (email, res) => {
  let textError = "";
  const { status, errors } = validateEmail(email);

  if (!status) {
    errors.map((n) => (textError += n + ". "));
    res.json({
      status: false,
      data: { token: undefined },
      message: textError,
    });
    return false;
  }

  return true;
};

const validarDataEmailPassw = (email, password, res) => {
  let textError = "";
  const { status, errors } = validateEmailAndPassword(email, password);

  if (!status) {
    errors.map((n) => (textError += n + ". "));
    res.json({
      status: false,
      data: { token: undefined },
      message: textError,
    });
    return false;
  }

  return true;
};

const existeEmail = async (email, res) => {
  const exist = await existEmail(email);

  if (exist) {
    res.json({
      status: false,
      data: { token: undefined },
      message: "Emial ocupado!",
    });
    return false;
  }
  return true;
};

const existeData = (value, res, message = "" , data = {}) => {
  if (value) {
    res.json({
      status: false,
      data,
      message,
    });
    return false;
  }
  return true;
};

export const crear_cuente = async (req, res, next) => {
  try {
    //validacion
    const status_actual = await standar(req, res, next);
    if (!status_actual) return;
    const id_user = req?.body?.id_user ?? "";
    const email = req?.body?.email;
    const password = req?.body?.password;

    //validacion
    const resultValData = validarDataEmailPassw(email, password, res);
    if (!resultValData) return;

    //validacion
    const resultadoExisEmail = await existeEmail(email, res);
    if (!resultadoExisEmail) return;

    //creacion y sifrado
    const token = createToken();
    const { password_hash, salt } = await SifrarPassword(password);

    //creacion
    const user = await createData(ModelUsers, {
      id_user,
      token,
      nombre: "",
      email,
      estado: true,
    });

    //validaciones
    const resultadoUser = existeData(user == null, res, "Error al crear el user");
    if (!resultadoUser) return;

    //creacion
    const resValidateData = await createData(ModelValidaciones, {
      id_prof: user.id,
      password: password_hash,
      salt,
      token: true,
    });

    //validaciones
    const resultadoDataValida = existeData(
      resValidateData == null,
      res,
      "Error al crear los datos de validacion"
    );
    if (!resultadoDataValida) return;

    res.json({
      status: true,
      data: { token },
      message: "User creado correctamente!",
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: false,
      data: {},
      message: error.message,
    });
    next(error);
  }
};

export const iniciar_sesion = async (req, res, next) => {
  try {
    //validacion
    const status_actual = await standar(req, res, next);
    if (!status_actual) return;

    const email = req?.body?.email;
    const password = req?.body?.password;
    const val0 = validarDataEmailPassw(email, password, res);
    if (!val0) return;

    const resultado = await getPasswordAndSaltByEmail(email);
    const val1 = existeData(
      !resultado?.status,
      res,
      resultado?.message || "Error al obtener la data de validacion"
    );
    if (!val1) return;

    //con esto validamos el password
    const { password_hash, id } = resultado.data;

    //validamos la password
    const valPassword = await ComprobarPassword(password, password_hash);
    const val2 = existeData(!valPassword, res, "Error password incorrecta");
    if (!val2) return;

    const token = createToken();
    const resUpdateToken = await updateToken(token, id);
    const resTrueToken = await trueToken(id);

    const val3 = existeData(
      resUpdateToken == null || resTrueToken == null,
      res,
      "Error en la actualizacion de la base de datos!"
    );
    if (!val3) return;

    return res.json({
      status: true,
      data: {
        token,
      },
      message: "Email enviado correctamente!",
    });
  } catch (err) {
    res.json({ status: false, message: err.message, data: {} });
    next(err);
  }
};

export const validar_token = async (req, res, next) => {
  try {
    //validacion
    const status_actual = await standar(req, res, next);
    if (!status_actual) return;

    const token_val = req.body?.token;
    const { token, message, id_user } = await validate_token(token_val);

    const val0 = existeData(!token, res, message ?? "Token no valido");
    if (!val0) return;

    res.json({
      status: token,
      message,
      data: { id_user },
    });
  } catch (err) {
    res.json({ status: false, message: err.message, data: {} });
    next(err);
  }
};

export const estado_login = async (req, res, next) => {
  try {
    //validacion
    const status_actual = await standar(req, res, next);
    if (!status_actual) return;

    const id_user = req?.body?.id_user;
    const { status } = await validate_sesion_by_id_user(id_user);

    const val0 = existeData(!status, res, "Estado no valido");
    if (!val0) return;

    res.json({
      message: "Estado valido",
      status,
      data: {},
    });
  } catch (err) {
    res.json({ message: err.message, status: false, data: {} });
    next(err);
  }
};

export const validar_existencia_email = async (req, res, next) => {
  try {
    //validacion
    const status_actual = await standar(req, res, next);
    if (!status_actual) return;

    const email = req?.body?.email;

    //validacion
    const val0 = validarDataEmail(email, res);
    if (!val0) return;

    const { status, data } = await existencia_email_with_data(email);

    //validacion
    const val1 = existeData(
      !status || data?.id == undefined,
      res,
      "Error email no existente!"
    );
    if (!val1) return;

    const token = createToken();
    const resUpdateToken = await updateToken(token, data?.id);
    const resTrueToken = await trueToken(data?.id);

    //validacion
    const val2 = existeData(
      resUpdateToken == null || resTrueToken == null,
      res,
      "Error a la hora de modificar ro validar los tokens"
    );
    if (!val2) return;

    res.json({
      status,
      data: { token },
      message: "Token enviado",
    });
  } catch (err) {
    res.json({ message: err.message, status: false, data: {} });
    next(err);
  }
};

export const update_password_email = async (req, res, next) => {
  try {
    //validacion
    const status_actual = await standar(req, res, next);
    if (!status_actual) return;

    const email = req?.body?.email;
    const password = req?.body?.password;
    let textError = "";

    //validacion
    const val0 = validarDataEmailPassw(email, password, res);
    if (!val0) return;

    const exist = await existEmail(email);
    
    //validacion
    const val1 = existeData(!exist, res, "Email no registrado");
    if (!val1) return;

    //const token = createToken();
    const { password_hash, salt } = await SifrarPassword(password);
    const resultado = await updatePasswordByEmail(email, password_hash, salt);

    //validacion
    const val2 = existeData(!resultado.status, res, "Error al actualziar el password!" , { id_user: undefined });
    if (!val2) return;

    const id_user = await id_user_for_id({ email });
    
    //validacion
    const val3 = existeData(id_user == undefined, res, "Error al iniciar la sesion!" , { id_user: undefined });
    if (!val3) return;

    res.json({
      status: true,
      data: id_user,
      message: "User creado correctamente!",
    });
  } catch (error) {
    res.json({
      status: false,
      data: {},
      message: error.message,
    });
    next(error);
  }
};
