import { delete_id_user } from "./localstorege";

export const logout_user = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Sesion cerrada")
    delete_id_user();
    window.location.assign("/")
}