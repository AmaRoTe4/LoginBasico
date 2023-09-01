import { validar_token_crear_sesion , validar_token_iniciar_sesion } from "../functions/validar";
import Segurity_svg from "../icons/segurity";

export default function Validation() {
    const search = window.location.search
    const type = search?.split("?")[1]?.split("=")[0]

    return (
        <main className="w-screen px-[100px] flex flex-col justify-center items-center pt-10">
            <form className="w-full flex flex-col" onSubmit={e => 
                    type === "login" ? validar_token_iniciar_sesion(e) : validar_token_crear_sesion(e)
                }>
                <div className="w-full">
                    <label className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white">Token</label>
                </div>
                <div className="flex w-full pb-2">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <Segurity_svg className="h-4" />
                    </span>
                    <input type="text" name="token" id="token" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="token" />
                </div>
                <div className="w-full">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Validar token</button>
                </div>
            </form>
        </main>
    )
}