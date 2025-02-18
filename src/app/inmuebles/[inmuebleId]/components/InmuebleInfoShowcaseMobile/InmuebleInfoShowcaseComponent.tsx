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
import { MdOutlinePets } from "react-icons/md";
import { FaRegHourglass } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { RiPoliceBadgeLine } from "react-icons/ri";

import { FaRegBuilding } from "react-icons/fa";
import { LiaChartAreaSolid } from "react-icons/lia";
import { PiOfficeChairLight } from "react-icons/pi";
import { RiStore2Line } from "react-icons/ri";
import { PiHouseBold } from "react-icons/pi";
import { MdOutlineSell } from "react-icons/md";



export default function InmuebleInfoShowcase({ inmueble }: { inmueble: Inmueble }) {

    const textColor = "text-accent";

    const formatTipoInmueble = (tipoInmueble: string | null) => {
        switch (tipoInmueble) {
            case "casa":
                return {
                    icon: <PiHouseBold className={`text-5xl ${textColor}`} />,
                    text: "Casa"
                }
            case "departamento":
                return {
                    icon: <FaRegBuilding className={`text-5xl ${textColor}`} />,
                    text: "Departamento"
                }
            case "terreno":
                return {
                    icon: <LiaChartAreaSolid className={`text-5xl ${textColor}`} />,
                    text: "Terreno"
                }
            case "oficina":
                return {
                    icon: <PiOfficeChairLight className={`text-5xl ${textColor}`} />,
                    text: "Oficina"
                }
            case "local":
                return {
                    icon: <RiStore2Line className={`text-5xl ${textColor}`} />,
                    text: "Local"
                }
            default:
                return {
                    icon: <BsHouseDoor className={`text-5xl ${textColor}`} />,
                    text: "Otro"
                }
        }
    }

    const formatTipoOperacion = (tipoOperacion: string | null) => {
        switch (tipoOperacion) {
            case "venta":
                return {
                    icon: <FaRegBuilding className={`text-5xl ${textColor}`} />,
                    text: "Venta"
                }
            case "renta":
                return {
                    icon: <FaRegBuilding className={`text-5xl ${textColor}`} />,
                    text: "Renta"
                }
            default:
                return {
                    icon: <BsHouseDoor className={`text-5xl ${textColor}`} />,
                    text: "Otro"
                }
        }
    }

    const data = [
        {
            title: "Tipo de Inmueble",
            value: inmueble.tipoInmueble,
            displayValue: formatTipoInmueble(inmueble.tipoInmueble as string).text,
            icon: formatTipoInmueble(inmueble.tipoInmueble as string).icon,
            suffix: ""
        },

        {
            title: "Antigüedad",
            value: inmueble.caracteristicas?.antiguedad,
            displayValue: inmueble.caracteristicas?.antiguedad === "nueva" ? "A Estrenar" : Number(inmueble.caracteristicas?.antiguedadTiempo) === 1 ? "1 Año" : `${inmueble.caracteristicas?.antiguedadTiempo} Años`,
            icon: <FaRegHourglass className="text-5xl text-accent" />,
            suffix: ""
        },
        {
            title: "Tipo de Operación",
            value: inmueble.tipoOperacion,
            displayValue: formatTipoOperacion(inmueble.tipoOperacion as string).text,
            icon: <MdOutlineSell className="text-5xl text-accent" />,
            suffix: ""
        },
        {
            title: "Metros de Terreno",
            value: inmueble.terreno.superficieCubierta,
            displayValue: inmueble.terreno.superficieCubierta,
            icon: <BiArea className="text-5xl text-accent" />,
            suffix: "m²"
        },
        {
            title: "Superficie Total",
            value: inmueble.terreno.terreno,
            displayValue: inmueble.terreno.terreno,
            icon: <BiArea className="text-5xl text-accent" />,
            suffix: "m²"
        },
        {
            title: "Metros de Construcción",
            value: inmueble.terreno.superficieTotal,
            displayValue: inmueble.terreno.superficieTotal,
            icon: <TbArrowAutofitHeight className="text-5xl text-accent" />,
            suffix: "m²"
        },
        {
            title: "Recámaras",
            value: inmueble.caracteristicas?.recamaras,
            displayValue: inmueble.caracteristicas?.recamaras,
            icon: <LuBedDouble className="text-5xl text-accent" />,
            suffix: ""
        },
        {
            title: "Medios Baños",
            value: inmueble.caracteristicas?.medioBanos,
            displayValue: inmueble.caracteristicas?.medioBanos,
            icon: <LuBath className="text-5xl text-accent" />,
            suffix: ""
        },
        {
            title: "Baños Completos",
            value: inmueble.caracteristicas?.banosCompletos,
            displayValue: inmueble.caracteristicas?.banosCompletos,
            icon: <MdOutlineBathroom className="text-5xl text-accent" />,
            suffix: ""
        },
        {
            title: "Estacionamientos",
            value: inmueble.caracteristicas?.estacionamientos,
            displayValue: inmueble.caracteristicas?.estacionamientos,
            icon: <RiCarLine className="text-5xl text-accent" />,
            suffix: ""
        },
        {
            title: "Niveles",
            value: inmueble.caracteristicas?.niveles,
            displayValue: inmueble.caracteristicas?.niveles,
            icon: <BsStack className="text-5xl text-accent" />,
            suffix: ""
        },
        {
            title: "Vigilancia",
            value: inmueble.caracteristicas?.privada,
            displayValue: "Colonia Privada",
            icon: <RiPoliceBadgeLine className="text-5xl text-accent" />,
            suffix: ""
        },
        {
            title: "Mascotas",
            value: inmueble.caracteristicas?.mascotas,
            displayValue: "Acepta Mascotas",
            icon: <MdOutlinePets className="text-5xl text-accent" />,
            suffix: ""
        }
    ]

    const filteredData = data.filter(item => item.value !== undefined && item.value !== null && item.value !== false);

    return (
        <div className="flex overflow-x-auto gap-4 p-2 rounded-lg scrollbar-hide">
            {filteredData.map((item, index) => (
                <div key={index} className="flex items-center min-w-[250px] bg-white p-4 rounded-lg shadow-md">
                    {/* Icono a la izquierda */}
                    <div className="mr-3">{item.icon}</div>
                    {/* Texto a la derecha */}
                    <div className="flex flex-col">
                        <h2 className="text-sm text-primary-dark font-semibold">{item.title}</h2>
                        <p className="text-accent text-3xl font-black">{item.displayValue}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}