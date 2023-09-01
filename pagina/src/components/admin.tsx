import useZonaAdmin from "../hooks/useZonaAdmin"

export default function Admin() {
    useZonaAdmin()

    return (
        <div className="text-black">
            <h1>
                hola mundo
            </h1>
        </div>
    )
}