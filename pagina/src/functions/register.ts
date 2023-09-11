import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { validateEmailAndPasswordAndRepaet } from "./validaciones_form";

export const register_user = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_repeat = formData.get("password_repeat") as string;

  const validacion: { status: boolean; errors: string[] } =
    validateEmailAndPasswordAndRepaet(email, password, password_repeat);

  if (!validacion.status) {
    return alert(validacion.errors?.map((n) => n + ". "));
  }

  const body = {
    id_user: Math.random().toString().slice(2, 20),
    email,
    password,
  };

  const resultado = await fetchPost({
    path: BASE_URL + "comprobadores/crear_sesion",
    method: "POST",
    body,
    headers: {},
  });

  if (!resultado) return alert("error: con la comunicacion con el server");
  if (!resultado?.status) {
    return alert("error: " + JSON.stringify(resultado?.message));
  }
  alert("Creado con exito!!! " + resultado.data?.token);
  setTimeout(() => {
    window.location.assign("/validation?register=true");
  }, 1000);
};
