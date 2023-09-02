import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { get_email, set_id_user } from "./localstorege";

export const register_user_password = async (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const password = formData.get("password") as string
    const password_repeat = formData.get("password_repeat") as string

    //validr data de form
    if(password !== password_repeat) return alert("passwords no indentic")

    const body = {
        email: get_email(),
        password
    }
    
    const resultado = await fetchPost({
        path: BASE_URL + "comprobadores/update_password_email",
        method:"POST",
        body,
        headers:{}
    })

    if(!resultado?.status) return alert("error: " + JSON.stringify(resultado?.message));
    alert("Cuenta recuperada!!!")
    set_id_user(resultado.data?.id_user);
    setTimeout(() => {
        window.location.assign("/login");
    } , 1000)
}