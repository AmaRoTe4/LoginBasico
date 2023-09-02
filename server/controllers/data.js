import { newId } from "../functions/ids.js";
import { ModelUsers, ModelValidaciones } from "../models/models.js";

//lo que hace que al pasar cualquier objeto de reaacion lo busca por eso al id_user
export const id_user_for_id = async (info) => {
  return await ModelUsers.findOne({
    attributes: ["id_user"],
    where: info,
  });
}

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
  try{
    const resultado = await ModelUsers.findOne({
      where: {
        email,
      },
    });
  
    return Boolean(resultado);
  }catch(error){
    console.error("Error: " + error)
    return false
  }
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

export const existencia_email_with_data = async (email) => {
  try {
    if (!email) {
      return {
        status: false,
        data: {},
        message: "Error email no valido",
      };
    }

    const usuario = await ModelUsers.findOne({
      attributes: ["id"],
      where: { email },
    });

    if (usuario == null) {
      return {
        status: false,
        data: {},
        message: "Error email no encontrado",
      };
    }

    return {
      status: true,
      data: {id: usuario.id},
      message: "ok",
    };
  } catch (error) {
    console.error("Error en la consulta:", error);
  }
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
        id,
        password_hash: data.password,
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
  return await ModelUsers.update(
    { token },
    {
      where: {
        id,
      },
    }
  );
};

export const validate_token = async (token) => {
  try {
    const { id , id_user } = await ModelUsers.findOne({
      attributes: ["id", "id_user"],
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

    return { ...JSON.parse(JSON.stringify(retorno)), id , id_user };
  } catch (error) {
    console.error("Error validar token: " + JSON.stringify(error));
    return false;
  }
};

export const validate_sesion_by_id_user = async (id_user) => {
  try {
    const user = await ModelUsers.findOne({
      attributes: ["id", "estado"],
      where: {
        id_user,
      },
    });

    if (user == undefined || user?.id == undefined || !user?.estado)
      return { status: false };

    return { status: true };
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

export const updatePasswordByEmail = async (email , password , salt) => {
  try {
    if (!email) {
      return {
        status: false,
        data: {},
        message: "Error email no valido",
      };
    }

    const { id } = await ModelUsers.findOne({
      attributes: ["id"],
      where: {
        email
      },
    })

    const usuario = await ModelValidaciones.update({password , salt} , {
      where: { id_prof: id },
    });

    if (usuario == null) {
      return {
        status: false,
        data: {},
        message: "Error al actualizar el password",
      };
    }

    return {
      status: true,
      data: {},
      message: "ok",
    };
  } catch (error) {
    console.error("Error en la consulta:", error);
  }
}