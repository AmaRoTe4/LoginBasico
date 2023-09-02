import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { set_id_user } from "./localstorege";

const middelware = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const token = formData.get("token") as string;

  const body = {
    token,
  };

  const resultado = await fetchPost({
    path: BASE_URL + "comprobadores/validar_token",
    method: "POST",
    body,
    headers: {},
  });

  if (!resultado.status) alert("error: " + JSON.stringify(resultado?.message));
  return {
    status: resultado.status,
    data: resultado.data,
  };
};

export const validar_token_iniciar_sesion = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  const { data, status } = await middelware(e);
  if (!data) return console.error("error con la data");
  if (!status) return console.error("error con el status");
  alert("Validado!!! Iniciando sesion");
  window.location.assign("/admin");
  set_id_user(data?.id_user);
};

export const validar_token_crear_sesion = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  const { data, status } = await middelware(e);
  if (!data) return console.error("error con la data");
  if (!status) return console.error("error con el status");
  alert("Validado!!! Iniciando sesion");
  window.location.assign("/admin");
  set_id_user(data?.id_user);
};

export const validar_token_recuperar_cuenta = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  const { status } = await middelware(e);
  if (!status) return console.error("error con el status");
  alert("Validado!!!");
  window.location.assign("/Recuperar_cuenta_password");
};
