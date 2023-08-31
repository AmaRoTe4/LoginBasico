import { fetchPost } from "./fetch";

export const register_user = async (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const password_repeat = formData.get("password_repeat") as string

    if(password !== password_repeat) return alert("passwords no indentic")

    const body = {
        id_user: Math.random().toString().slice(2 , 20),
        email,
        password
    }
    
    const resultado = await fetchPost({
        path:"http://localhost:3001/api/comprobadores/crear_sesion",
        method:"POST",
        body,
        headers:{}
    })

    if(!resultado.status) return alert("error");
    alert("Creado con exito!!!")
    window.location.assign("/login");
}