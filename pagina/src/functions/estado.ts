import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";

export const estado_de_sesion = async (id_user: string) => {
  const body = {
    id_user,
  };

  if (id_user === "" || id_user === undefined) return false;

  const resultado = await fetchPost({
    path: BASE_URL + "comprobadores/estado_login",
    method: "POST",
    body,
    headers: {},
  });

  if (!resultado) return alert("error: con la comunicacion con el server");
  return resultado?.status;
};
