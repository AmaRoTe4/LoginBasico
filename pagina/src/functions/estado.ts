import { BASE_URL } from "../const";
import { fetchPost } from "./fetch";

export const estado_de_sesion = async (token:string) => {
    const body = {
        token
    }
    
    if(token === "" || token === undefined) return false

    const resultado = await fetchPost({
        path: BASE_URL + "comprobadores/estado_login",
        method:"POST",
        body,
        headers:{}
    }) 

    return resultado.status
}