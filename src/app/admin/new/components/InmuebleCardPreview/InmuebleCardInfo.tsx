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

interface InmuebleCardInfoProps {
    inmueble: Inmueble;
}

const InmuebleInfo: React.FC<InmuebleCardInfoProps> = ({ inmueble }) => {

    const formatTipoInmueble = (tipoInmueble: string | null) => {
        switch (tipoInmueble) {
            case "casa":
                return {
                    icon: <BsHouseDoor className="text-4xl text-primaryLight" />,
                    text: "Casa"
                }
            case "departamento":
                return {
                    icon: <FaRegBuilding className="text-4xl text-primaryLight" />,
                    text: "Depa"
                }
            case "terreno":
                return {
                    icon: <LiaChartAreaSolid className="text-4xl text-primaryLight" />,
                    text: "Terreno"
                }
            case "oficina":
                return {
                    icon: <PiOfficeChairLight className="text-4xl text-primaryLight" />,
                    text: "Oficina"
                }
            case "local":
                return {
                    icon: <RiStore2Line className="text-4xl text-primaryLight" />,
                    text: "Local"
                }
            default:
                return {
                    icon: <BsHouseDoor className="text-4xl text-primaryLight" />,
                    text: "Otro"
                }
        }
    }

    return (
        <div className="grid grid-cols-3 justify-around align-middle">
            <div className="flex flex-col items-center">
                <BiArea className="text-4xl text-primaryLight" />
                <span className="text-lg text-primaryLight font-semibold">{inmueble.terreno.superficieCubierta?.toLocaleString()}m²</span>
            </div>

            <div className="flex flex-col items-center">
                <TbArrowAutofitHeight className="text-4xl text-primaryLight" />
                <span className="text-lg text-primaryLight font-semibold">{inmueble.terreno.superficieTotal?.toLocaleString()}m²</span>
            </div>


            <div className="flex flex-col items-center">
                {formatTipoInmueble(inmueble.tipoInmueble ?? null).icon}
                <span className="text-lg text-primaryLight font-semibold capitalize">{formatTipoInmueble(inmueble.tipoInmueble ?? null).text}</span>
            </div>
        </div>
    );
}

export default InmuebleInfo;