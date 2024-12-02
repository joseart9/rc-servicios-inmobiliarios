// Custom Imports
import Inmueble from "@/types/Inmueble";

// Icons
import { BiArea } from "react-icons/bi";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { MdOutlineBathroom } from "react-icons/md";
import { RiCarLine } from "react-icons/ri";
import { BsHouseDoor } from "react-icons/bs";



export default function InmuebleInfoShowcase({ inmueble }: { inmueble: Inmueble }) {

    const data = [
        {
            title: "Antiguedad",
            value: inmueble.caracteristicas?.antiguedad === "nueva" ? "A Estrenar" : Number(inmueble.caracteristicas?.antiguedadTiempo) === 1 ? "1 Año" : `${inmueble.caracteristicas?.antiguedadTiempo} Años`,
            icon: <BsHouseDoor className="text-4xl text-accent" />,
            suffix: ""
        },
        {
            title: "Superficie Cubierta",
            value: inmueble.terreno.superficieCubierta,
            icon: <BiArea className="text-4xl text-accent" />,
            suffix: "m²"
        },
        {
            title: "Total Construcción",
            value: inmueble.terreno.superficieTotal,
            icon: <TbArrowAutofitHeight className="text-4xl text-accent" />,
            suffix: "m²"
        },
        {
            title: "Recámaras",
            value: inmueble.caracteristicas?.recamaras,
            icon: <LuBedDouble className="text-4xl text-accent" />,
            suffix: ""
        },
        {
            title: "Medios Baños",
            value: inmueble.caracteristicas?.medioBanos,
            icon: <LuBath className="text-4xl text-accent" />,
            suffix: ""
        },
        {
            title: "Baños Completos",
            value: inmueble.caracteristicas?.banosCompletos,
            icon: <MdOutlineBathroom className="text-4xl text-accent" />,
            suffix: ""
        },
        {
            title: "Estacionamientos",
            value: inmueble.caracteristicas?.estacionamientos,
            icon: <RiCarLine className="text-4xl text-accent" />,
            suffix: ""
        }
    ]

    return (
        <div className="flex flex-col overflow-auto overflow-y-auto h-full w-full max-h-[550px] justify-stretch rounded-lg bg-white">
            <div className="w-full mb-3 sticky top-0 z-10">
                <h1 className="bg-accent p-2 text-xl rounded-t-lg text-white font-semibold">
                    Características
                </h1>
            </div>

            {data.map((item, index) => (
                <div key={index}>
                    <div className="w-full flex flex-row items-end space-x-5 px-8">
                        <div className="flex w-fit">
                            {item.icon}
                        </div>
                        <div className="flex flex-col w-full">
                            <h2 className="text-sm text-primaryLight">{item.title}</h2>
                            <p className="text-accent text-3xl font-black">{item.value} {item.suffix}</p>
                        </div>

                    </div>
                    <div className="divider" />
                </div>
            ))}
        </div>
    )
}