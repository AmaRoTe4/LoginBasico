export default function Navegacion() {
    return (
        <nav style={{ padding: "10px 0px 10px 0px", width: "100vw", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
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
        </nav>
    )
}