import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { validateEmailAndPassword } from "./validaciones_form";

export const login_user = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validacion:{status:boolean , errors: string[]} = validateEmailAndPassword(email, password);

  if(!validacion.status){
    return alert(validacion.errors?.map(n => n + ". "));
  }

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

  if (!resultado)
    return alert("error: con la comunicacion con el server");
  if (!resultado?.status) return alert(resultado?.message);
  alert(
    "Validado!!!, te mandaremos un correo a la direccion " +
      email +
      " con este te podras validar! " +
      resultado?.data?.token
  );
  setTimeout(() => {
    window.location.assign("/validation?login=true");
  }, 1000);
};
