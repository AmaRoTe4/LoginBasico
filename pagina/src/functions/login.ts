import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { set_token } from "./localstorege";

export const login_user = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  //validar los dos

  const body = {
    email,
    password,
  };

  const resultado = await fetchPost({
    path: BASE_URL + "comprobadores/iniciar_sesion",
    method: "POST",
    body,
    headers: {},
  });

  if (!resultado.status) return alert("error");
  alert(
    "Validado!!!, te mandaremos un correo a la direccion " +
      email +
      " con este te podras validar! " + resultado?.data?.token
  );
  window.location.assign("/validation?login=true");
  set_token(resultado.data?.token);
};
