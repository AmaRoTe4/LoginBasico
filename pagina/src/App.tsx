import { useEffect, useState } from "react"
import Login from "./components/login"
import Index from "./components"
import Logout from "./components/logout"
import Validation from "./components/validation"
import Navegacion from "./components/navegacion"
import { get_id_user } from "./functions/localstorege"
import Admin from "./components/admin"
import Register from "./components/register"

function App() {
  const [path , setPath] = useState<string>(window.location.pathname)
  const [id_user , setId_user] = useState<string>("")
  
  useEffect(() => {
    setPath(window.location.pathname)
    setId_user(get_id_user() ?? "")
  },[])

  return (
    <div className="flex flex-col">
      <Navegacion />
      {path === "/" && <Index />}
      {path === "/login" && <Login />}
      {path === "/logout" && <Logout />}
      {path === "/validation" && <Validation />}
      {path === "/admin" && id_user !== "" && <Admin />}
      {path === "/register" && <Register />}
    </div>
  )
}

export default App
