import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { set_email } from "./localstorege";

export const recuperar_cuenta = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const email = formData.get("email") as string;

  const body = {
    email,
  };

  const resultado = await fetchPost({
    path: BASE_URL + "comprobadores/validar_existencia_email",
    method: "POST",
    body,
    headers: {},
  });

  if (!resultado.status) return alert(resultado.message);
  alert(
    "Validado!!!, te mandaremos un correo a la direccion " +
      email +
      " con este te podras validar! " +
      resultado?.data?.token
  );
  set_email(email)
  setTimeout(() => {
    window.location.assign("/validation?recuperar_cuenta=true");
  }, 1000);
};
