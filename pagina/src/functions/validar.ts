import { fetchPost } from "./fetch";
import { delete_email, get_email, set_id_user } from "./localstorege";

export const validar_token = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const token = formData.get("token")

    const body = {
        token,
        email: get_email()
    }

    const resultado = await fetchPost({
        path:"http://localhost:3000/api",
        method:"POST",
        body,
        headers:{}
    })

    if(!resultado.status) return alert("error");
    alert("Validado!!!")
    window.location.assign("/")
    delete_email();
    set_id_user(resultado.id_user)
}