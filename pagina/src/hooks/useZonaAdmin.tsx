import { useEffect, useState } from "react";
import { estado_de_sesion } from "../functions/estado";
import { get_id_user } from "../functions/localstorege";

export default function useZonaAdmin(redireccion = true) {
    const [estado ,setEstado] = useState<boolean>(false);
    
    useEffect(() => {
        validarParteAdmin()
    }, [])

    const validarParteAdmin = async () => {
        const id_user = get_id_user()
        const resultado = await estado_de_sesion(id_user)
    
        setEstado(resultado)
        if (resultado || !redireccion) return;
        alert("permisos denegados");
        window.location.assign("/")
    }

    return estado
}