import { useEffect } from "react";
import { estado_de_sesion } from "../functions/estado";
import { get_token } from "../functions/localstorege";

export default function useZonaAdmin() {
    useEffect(() => {
        validarParteAdmin()
    }, [])

    const validarParteAdmin = async () => {
        const token = get_token()
        const resultado = await estado_de_sesion(token)
    
        if (resultado) return;
        alert("permisos denegados");
        //window.location.assign("/")
    }
}