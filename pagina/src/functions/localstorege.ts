export const set_email = (email:string) => {
    localStorage.setItem("xx-email-xx" , email)
}

export const get_email = () => {
    return localStorage.getItem("xx-email-xx") ?? ""
}

export const delete_email = () => {
    return localStorage.getItem("xx-email-xx")
}

export const set_token = (token:string) => {
    localStorage.setItem("xx-token-xx" , token)
}

export const get_token = () => {
    return localStorage.getItem("xx-token-xx") ?? ""
}

export const delete_token = () => {
    return localStorage.getItem("xx-token-xx")
}