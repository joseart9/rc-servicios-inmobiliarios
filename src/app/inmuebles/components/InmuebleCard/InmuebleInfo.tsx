import Inmueble from "@/types/Inmueble";
import { Tooltip } from "@nextui-org/react";

// Icons
import { BiArea } from "react-icons/bi";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { BsHouseDoor } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import { LiaChartAreaSolid } from "react-icons/lia";
import { PiOfficeChairLight } from "react-icons/pi";
import { RiStore2Line } from "react-icons/ri";
import { PiHouseBold } from "react-icons/pi";

export default function InmuebleInfo({ inmueble }: Readonly<{ inmueble: Inmueble }>) {

    const textColor = "text-primary-dark/80";

    const formatTipoInmueble = (tipoInmueble: string | null) => {
        switch (tipoInmueble) {
            case "casa":
                return {
                    icon: <PiHouseBold className={`text-4xl ${textColor}`} />,
                    text: "Casa"
                }
            case "departamento":
                return {
                    icon: <FaRegBuilding className={`text-4xl ${textColor}`} />,
                    text: "Depa"
                }
            case "terreno":
                return {
                    icon: <LiaChartAreaSolid className={`text-4xl ${textColor}`} />,
                    text: "Terreno"
                }
            case "oficina":
                return {
                    icon: <PiOfficeChairLight className={`text-4xl ${textColor}`} />,
                    text: "Oficina"
                }
            case "local":
                return {
                    icon: <RiStore2Line className={`text-4xl ${textColor}`} />,
                    text: "Local"
                }
            default:
                return {
                    icon: <BsHouseDoor className={`text-4xl ${textColor}`} />,
                    text: "Otro"
                }
        }
    }

    return (
        <div className="grid grid-cols-3 justify-around align-middle">
            <Tooltip content="Superficie Cubierta">
                <div className="flex flex-col items-center">
                    <BiArea className={`text-4xl ${textColor}`} />
                    <span className={`text-lg ${textColor} font-semibold`}>{inmueble.terreno.superficieCubierta?.toLocaleString()}m²</span>
                </div>
            </Tooltip>

            <Tooltip content="Superficie Total">
                <div className="flex flex-col items-center">
                    <TbArrowAutofitHeight className={`text-4xl ${textColor}`} />
                    <span className={`text-lg ${textColor} font-semibold`}>{inmueble.terreno.superficieTotal?.toLocaleString()}m²</span>
                </div>
            </Tooltip>

            <Tooltip content="Tipo de Inmueble">
                <div className="flex flex-col items-center">
                    {formatTipoInmueble(inmueble.tipoInmueble ?? null).icon}
                    <span className={`text-lg ${textColor} font-semibold capitalize`}>{formatTipoInmueble(inmueble.tipoInmueble ?? null).text}</span>
                </div>
            </Tooltip>
        </div>
    );
}
