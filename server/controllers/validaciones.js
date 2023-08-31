import { validarClave } from "../validaciones/index.js";
import { createData } from "../controllers/data.js";
import {
  trueToken,
  getPasswordAndSaltByEmail,
  updateToken,
  getId_userForToken,
} from "../controllers/data.js";
import { createToken } from "../functions/token.js";
import { ComprobarPassword, SifrarPassword } from "../functions/bcrypt.js";
import { ModelUsers, ModelValidaciones } from "../models/models.js";

export const Crear_cuente = async (req, res, next) => {
  try {
    validarClave(req, res);
    const id_user = req?.body?.id_user ?? "";
    const email = req?.body?.email;
    const password = req?.body?.password;

    const { password_hash, salt } = SifrarPassword(password);
    const token = createToken();

    await createData(ModelUsers, {
      id_user,
      id_type: 1,
      id_localidad: "",
      token,
      nombre: "",
      nombre_local: "",
      titulo: "",
      descripcion: "",
      telefono: "",
      direccion: "",
      email,
      estado: true,
    });

    await createData(ModelValidaciones, {
      id_prof: "",
      password: password_hash,
      salt,
      token,
    });

    res.json({
      status: true,
      data: {},
      message: "User creado correctamente!",
    });
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
};

export const Validar_inicio_de_sesion = async (req, res, next) => {
  try {
    validarClave(req, res);
    const email = req?.body?.email;
    const password = req?.body?.password;
    const resultado = await getPasswordAndSaltByEmail(email);

    if (!resultado.status) res.json(resultado);

    //con esto validamos el password
    const { salt, passwordHash, id } = resultado.data;
    const valPassword = ComprobarPassword(password, passwordHash);
    
    if (!valPassword)
      res.json({
        status: false,
        data: {},
        message: "Error email no valido",
      });

    const token = createToken();
    await updateToken(token, id);
    await trueToken(id);
    //console.log(resultUpdateToken);

    res.json({
      status: true,
      data: {
        id,
      },
      message: "Email enviado correctamente!",
    });
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
};

//pedimos un token y devolvems un undefined o un id_user
export const Token_sesion = async (req, res, next) => {
  try {
    validarClave(req, res);
    const token = req?.body?.token;
    const resultado = await getId_userForToken(token);
    res.json(resultado);
  } catch (err) {
    res.json({ message: err.message });
    next(err);
  }
};
