import Inmueble from "@/types/Inmueble";

export default function MapAdressDesc({ inmueble }: { inmueble: Inmueble }) {
    return (
        <section className="grid grid-cols-3 w-full gap-2 -mt-8">
            <div className="w-full h-full col-end-13 text-end">
                <div className="divider" />
                <p className="capitalize text-primary-dark/50">
                    {inmueble.direccion?.calle} {inmueble.direccion?.numeroExterior}
                    {inmueble.direccion?.numeroInterior && `-${inmueble.direccion.numeroInterior}`}, {inmueble.direccion?.colonia}
                </p>
                <p className="capitalize text-primary-dark/50">
                    {inmueble.direccion?.ciudad}, {inmueble.direccion?.estado}, {inmueble.direccion?.pais}
                </p>
                <p className="capitalize text-primary-dark/50">
                    C.P. {inmueble.direccion?.cp}
                </p>
            </div>
        </section>
    )
}