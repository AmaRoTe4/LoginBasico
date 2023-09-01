import { createData, falseToken } from "../controllers/data.js";
import {
  validate_token,
  trueToken,
  getPasswordAndSaltByEmail,
  updateToken,
  existEmail,
  validate_sesion_by_token,
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

    const exist = await existEmail(email)
    
    if(exist) return res.json({
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
    const { salt, password_hash, id, status_token } = resultado.data;
    
    console.log(resultado.data)
    
    if (status_token)
      return res.json({
        status: false,
        data: {},
        message: "Error usuario no validado!",
      });

    const valPassword = await ComprobarPassword(password, password_hash);

    if (!valPassword)
      return res.json({
        status: false,
        data: {},
        message: "Error password incorrecta",
      });

    const token = createToken();
    await updateToken(token, id);
    await trueToken(id);

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
    const { token, message , id } = await validate_token(token_val);

    if (!token)
      return res.json({
        status: false,
        message: message ?? "relacion no valida",
      });

    if (token) {
      const resultado = await falseToken(id);
      return res.json({
        status: Boolean(resultado)
      })
    }

    res.json({
      status: token,
      message,
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
    next(err);
  }
};

export const estado_login = async (req, res, next) => {
  try {
    //validarClave(req, res);
    const token_val = req?.body?.token;
    const { status } = await validate_sesion_by_token(token_val);
    res.json({
      status,
    });
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
};
