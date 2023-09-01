import { newId } from "../functions/ids.js";
import { ModelUsers, ModelValidaciones } from "../models/models.js";

export const getAllData = async (Model) => {
  return await Model.findAll();
};

export const getAllDataById_prof = async (Model, id_prof) => {
  return await Model.findAll({
    where: {
      id_prof,
    },
  });
};

export const existEmail = async (email) => {
  const resultado = await ModelUsers.findOne({
    where: {
      email,
    },
  });

  return Boolean(resultado);
};

export const getDataById = async (Model, id) => {
  return await Model.findAll({
    where: {
      id,
    },
  });
};

export const getProfesionalById_user = async (id_user) => {
  return await ModelUsers.findAll({
    where: {
      id_user,
    },
  });
};

export const getPasswordAndSaltByEmail = async (email) => {
  try {
    if (!email) {
      return {
        status: false,
        data: {},
        message: "Error email no valido",
      };
    }

    const usuario = await ModelUsers.findOne({
      attributes: ["id", "token"],
      where: { email },
    });

    if (usuario == null) {
      return {
        status: false,
        data: {},
        message: "Error email no encontrado",
      };
    }

    const { id, token } = usuario;
    const data = await ModelValidaciones.findOne({
      attributes: ["salt", "password", "token"],
      where: { id_prof: id },
    });

    if (data == null) {
      return {
        status: false,
        data: {},
        message: "Relacion de id con password no encotrada",
      };
    }

    return {
      status: true,
      data: {
        status_token: data.token,
        token,
        id,
        password_hash: data.password,
        salt: data.salt,
      },
      message: "ok",
    };
  } catch (error) {
    console.error("Error en la consulta:", error);
  }
};

export const getId_userForToken = async (token) => {
  try {
    if (!token) {
      return {
        status: false,
        data: {},
        message: "Error token no valido",
      };
    }

    const usuario = await ModelUsers.findOne({
      attributes: ["id", "id_user"],
      where: { token },
    });

    if (!usuario) {
      return {
        status: false,
        data: {},
        message: "Error token no encontrado",
      };
    }

    const { id_user } = usuario;

    return {
      status: true,
      data: {
        id_user,
      },
      message: "ok",
    };
  } catch (error) {
    console.error("Error en la consulta:", error);
  }
};

export const updateData = async (Model, body, id) => {
  return await Model.update(body, {
    where: {
      id,
    },
  });
};

export const updateToken = async (token, id) => {
  return await ModelUsers.update(token, {
    where: {
      id,
    },
  });
};

export const validate_token = async (token) => {
  try {
    const { id } = await ModelUsers.findOne({
      attributes: ["id"],
      where: {
        token,
      },
    });

    if (!id)
      return {
        token: undefined,
        message: "token no existente",
      };

    const retorno = await ModelValidaciones.findOne({
      attributes: ["token"],
      where: {
        id_prof: id,
      },
    });

    return { ...JSON.parse(JSON.stringify(retorno)), id };
  } catch (error) {
    console.error("Error validar token: " + JSON.stringify(error));
    return false;
  }
};

export const validate_sesion_by_token = async (token) => {
  try {
    const user = await ModelUsers.findOne({
      attributes: ["id", "estado"],
      where: {
        token,
      },
    });

    if (user == undefined || user?.id == undefined || !(user?.estado)) return { status: false };

    const resultado = await ModelValidaciones.findOne({
      attributes: ["token"],
      where: {
        id_prof: user?.id,
      },
    });

    if (resultado?.token == undefined) return { status: false };

    const retorno = !resultado?.token
    return { status: retorno };
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const falseToken = async (id) => {
  return await ModelValidaciones.update(
    { token: false },
    {
      where: {
        id_prof: id,
      },
    }
  );
};

export const trueToken = async (id) => {
  return await ModelValidaciones.update(
    { token: true },
    {
      where: {
        id_prof: id,
      },
    }
  );
};

export const createData = async (Model, body) => {
  const id = newId();
  try {
    return await Model.create({ ...body, id });
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteData = async (Model, id) => {
  return await Model.destroy({
    where: { id },
  });
};
