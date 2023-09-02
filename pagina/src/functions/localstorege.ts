export const set_email = (email:string) => {
    localStorage.setItem("xx-email-xx" , email)
}

export const get_email = () => {
    return localStorage.getItem("xx-email-xx") ?? ""
}

export const delete_email = () => {
    return localStorage.setItem("xx-email-xx" , "")
}

export const set_token = (token:string) => {
    localStorage.setItem("xx-token-xx" , token)
}

export const get_token = () => {
    return localStorage.getItem("xx-token-xx") ?? ""
}

export const delete_token = () => {
    return localStorage.setItem("xx-token-xx" , "")
}

export const set_id_user = (id_user:string) => {
    localStorage.setItem("xx-id_user-xx" , id_user)
}

export const get_id_user = () => {
    return localStorage.getItem("xx-id_user-xx") ?? ""
}

export const delete_id_user = () => {
    return localStorage.setItem("xx-id_user-xx" , "")
}