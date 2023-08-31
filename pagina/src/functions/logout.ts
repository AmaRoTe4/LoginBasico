export const logout_user = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Sesion cerrada")
    window.location.assign("/")
}