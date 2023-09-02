import { useEffect, useState } from "react"
import Login from "./components/login"
import Index from "./components"
import Logout from "./components/logout"
import Validation from "./components/validation"
import Navegacion from "./components/navegacion"
import Admin from "./components/admin"
import Register from "./components/register"
import Recuperar_cuenta from "./components/recuperar_cuenta.login"
import Recuperar_cuenta_password from "./components/recuperar_cuenta.passwords"

function App() {
  const [path , setPath] = useState<string>(window.location.pathname)
  
  useEffect(() => {
    setPath(window.location.pathname)
  },[])

  return (
    <div className="flex flex-col">
      <Navegacion />
      {path === "/" && <Index />}
      {path === "/login" && <Login />}
      {path === "/logout" && <Logout />}
      {path === "/validation" && <Validation />}
      {path === "/admin" && <Admin />}
      {path === "/register" && <Register />}
      {path === "/Recuperar_cuenta" && <Recuperar_cuenta />}
      {path === "/Recuperar_cuenta_password" && <Recuperar_cuenta_password />}
    </div>
  )
}

export default App
