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
  id_user_for_id
} from "../controllers/data.js";
import { createToken } from "../functions/token.js";
import { ComprobarPassword, SifrarPassword } from "../functions/bcrypt.js";
import { ModelUsers, ModelValidaciones } from "../models/models.js";

export const crear_cuente = async (req, res, next) => {
  try {
    //validarClave(req, res);
    const id_user = req?.body?.id_user ?? "";
    const email = req?.body?.email;
    const password = req?.body?.password;

    const exist = await existEmail(email);

    if (exist)
      return res.json({
        status: false,
        data: { token: undefined },
        message: "Emial ocupado!",
      });

    const token = createToken();
    const { password_hash, salt } = await SifrarPassword(password);

    const user = await createData(ModelUsers, {
      id_user,
      token,
      nombre: "",
      email,
      estado: true,
    });

    await createData(ModelValidaciones, {
      id_prof: user.id,
      password: password_hash,
      salt,
      token: true,
    });

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
    //validarClave(req, res);
    const email = req?.body?.email;
    const password = req?.body?.password;
    const resultado = await getPasswordAndSaltByEmail(email);

    if (!resultado?.status) return res.json({ ...resultado, data: {} });

    //con esto validamos el password
    const { password_hash, id } = resultado.data;

    //validamos la password
    const valPassword = await ComprobarPassword(password, password_hash);

    if (!valPassword)
      return res.json({
        status: false,
        data: {},
        message: "Error password incorrecta",
      });

    const token = createToken();
    const resUpdateToken = await updateToken(token, id);
    const resTrueToken = await trueToken(id);

    if (resUpdateToken == null || resTrueToken == null)
      return res.json({
        status: false,
        data: {},
        message: "Error en la actualizacion de la base de datos!",
      });

    return res.json({
      status: true,
      data: {
        token,
      },
      message: "Email enviado correctamente!",
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
    next(err);
  }
};

export const validar_token = async (req, res, next) => {
  try {
    //validarClave(req, res);
    const token_val = req.body?.token;
    const { token, message, id , id_user } = await validate_token(token_val);

    if (!token)
      return res.json({
        status: false,
        message: message ?? "relacion no valida",
      });

    res.json({
      status: token,
      message,
      data: {id_user}
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
    next(err);
  }
};

export const estado_login = async (req, res, next) => {
  try {
    //validarClave(req, res);
    const id_user = req?.body?.id_user;
    const { status } = await validate_sesion_by_id_user(id_user);
    res.json({
      status,
    });
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
};

export const validar_existencia_email = async (req, res, next) => {
  try {
    //validarClave(req, res);
    const email = req?.body?.email;
    const { status, data } = await existencia_email_with_data(email);

    //validar info

    if (!status || data?.id == undefined)
      return res.json({
        status: false,
        message: "Error email no existente!",
        data: {},
      });

    const token = createToken();
    await updateToken(token, data?.id);
    await trueToken(data?.id);

    res.json({
      status,
      data: { token },
      message: "Token enviado",
    });
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
};

export const update_password_email = async (req, res, next) => {
  try {
    //validarClave(req, res);
    const email = req?.body?.email;
    const password = req?.body?.password;
    const exist = await existEmail(email);

    if (!exist)
      return res.json({
        status: false,
        data: { id_user: undefined },
        message: "Email no registrado",
      });

    const token = createToken();
    const { password_hash, salt } = await SifrarPassword(password);
    const resultado = await updatePasswordByEmail(email , password_hash , salt)

    if (!resultado.status)
    return res.json({
      status: false,
      data: { id_user: undefined },
      message: "Error al actualziar el password!",
    });

    const id_user = await id_user_for_id({email})
    if (id_user == undefined)

    return res.json({
      status: false,
      data: { id_user: undefined },
      message: "Error al iniciar la sesion!",
    });

    res.json({
      status: true,
      data: id_user,
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