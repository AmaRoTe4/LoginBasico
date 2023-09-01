import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";
import { set_token } from "./localstorege";

const middelware = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const token = formData.get("token") as string

    const body = {
        token,
    }

    const resultado = await fetchPost({
        path: BASE_URL + "comprobadores/validar_token",
        method:"POST",
        body,
        headers:{}
    })

    if(!resultado.status) alert("error"); 
    else alert("Validado!!!")
    return {
        token,
        status: resultado.status
    }
}

export const validar_token_iniciar_sesion = async (e: React.FormEvent<HTMLFormElement>) => {
    const { token , status } = await middelware(e)
    if(!status) return;
    window.location.assign("/admin")
    set_token(token)
}

export const validar_token_crear_sesion = async (e: React.FormEvent<HTMLFormElement>) => {
    const { token , status } = await middelware(e)
    if(!status) return;
    window.location.assign("/")
    set_token(token)
}