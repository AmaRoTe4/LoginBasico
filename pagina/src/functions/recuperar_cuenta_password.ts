import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { get_email, set_id_user } from "./localstorege";
import { validateRepeatPassword } from "./validaciones_form";

export const register_user_password = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const password = formData.get("password") as string;
  const password_repeat = formData.get("password_repeat") as string;

  const validacion: { status: boolean; errors: string[] } =
    validateRepeatPassword(password, password_repeat);

  if (!validacion.status) {
    return alert(validacion.errors?.map((n) => n + ". "));
  }

  const body = {
    email: get_email(),
    password,
  };

  const resultado = await fetchPost({
    path: BASE_URL + "comprobadores/update_password_email",
    method: "POST",
    body,
    headers: {},
  });

  if (!resultado)
    return alert("error: con la comunicacion con el server");
  if (!resultado?.status)
    return alert("error: " + JSON.stringify(resultado?.message));
  alert("Cuenta recuperada!!!");
  set_id_user(resultado.data?.id_user);
  setTimeout(() => {
    window.location.assign("/login");
  }, 1000);
};
