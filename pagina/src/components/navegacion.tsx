import useZonaAdmin from "../hooks/useZonaAdmin"

export default function Navegacion() {
    const estado = useZonaAdmin(false)

    return (
        <nav style={{ padding: "10px 0px 10px 0px", width: "100vw", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
            <div style={{margin: "0px 10px"}}>
                <span style={{backgroundColor: estado ? "green" : "red"}} className="w-[50px] h-[50px] rounded-full p-1 m-1">
                </span>
            </div>
            <div style={{margin: "0px 10px"}}>
                <a className="text-black" style={{textDecoration: "none"}} href="/">index</a>
            </div>
            <div style={{margin: "0px 10px"}}>
                <a className="text-black" style={{textDecoration: "none"}} href="/login">Login</a>
            </div>
            <div style={{margin: "0px 10px"}}>
                <a className="text-black" style={{textDecoration: "none"}} href="/logout">logout</a>
            </div>
            <div style={{margin: "0px 10px"}}>
                <a className="text-black" style={{textDecoration: "none"}} href="/validation">validation</a>
            </div>
            <div style={{margin: "0px 10px"}}>
                <a className="text-black" style={{textDecoration: "none"}} href="/admin">admin</a>
            </div>
            <div style={{margin: "0px 10px"}}>
                <a className="text-black" style={{textDecoration: "none"}} href="/register">register</a>
            </div>
            <div style={{margin: "0px 10px"}}>
                <a className="text-black" style={{textDecoration: "none"}} href="/Recuperar_cuenta">Recuperar cuenta</a>
            </div>
        </nav>
    )
}