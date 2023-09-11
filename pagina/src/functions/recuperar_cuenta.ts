import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { set_email } from "./localstorege";
import { validateEmail } from "./validaciones_form";

export const recuperar_cuenta = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const email = formData.get("email") as string;

  const validacion: { status: boolean; errors: string[] } =
    validateEmail(email);

  if (!validacion.status) {
    return alert(validacion.errors?.map((n) => n + ". "));
  }

  const body = {
    email,
  };

  const resultado = await fetchPost({
    path: BASE_URL + "comprobadores/validar_existencia_email",
    method: "POST",
    body,
    headers: {},
  });

  console.log(resultado);

  if (!resultado) return alert("error: con la comunicacion con el server");
  if (!resultado?.status) return alert(resultado?.message);
  alert(
    "Validado!!!, te mandaremos un correo a la direccion " +
      email +
      " con este te podras validar! " +
      resultado?.data?.token
  );
  set_email(email);
  setTimeout(() => {
    window.location.assign("/validation?recuperar_cuenta=true");
  }, 1000);
};
