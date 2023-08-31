import { logout_user } from "../functions/logout";

export default function Logout(){
    return (
        <main className="w-screen px-[100px] flex flex-col justify-center items-center pt-10">
            <form className="w-full flex flex-col" onSubmit={(e) => logout_user(e)}>
                <div className="w-full">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Cerrar sesion
                    </button>
                </div>
            </form>
        </main>
    )
}