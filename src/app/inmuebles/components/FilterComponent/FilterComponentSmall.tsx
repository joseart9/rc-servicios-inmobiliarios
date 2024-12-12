import { Button } from "@nextui-org/button";
import { IoMdArrowRoundForward } from "react-icons/io";

import icons from "@/Icons";
import { FilterComponentProps } from "./FilterComponent";

export default function FilterComponentSmall({ isExpanded, setIsExpanded, filters }: { isExpanded: boolean, setIsExpanded: Function; filters: FilterComponentProps[] }) {
    console.log(filters);
    return (
        <div className="w-full bg-white rounded-lg h-[550px] flex flex-col items-center">
            <div className="flex bg-primary-dark rounded-t-lg w-full justify-center">
                <Button isIconOnly color="warning" variant="light" onPress={() => setIsExpanded(!isExpanded)}>
                    <IoMdArrowRoundForward className="size-7 text-white font-black" />
                </Button>
            </div>

            <section className="flex flex-col p-3">
                <icons.precio
                    className={`w-6 h-6 ${filters.some((filter) => filter.filterKey === "monto")
                        ? "text-primary-dark"
                        : "text-primary-dark/30"
                        }`}
                />
                <div className="divider" />

                <icons.recamara className={`w-6 h-6 ${filters.some((filter) => filter.filterKey === "recamaras")
                    ? "text-primary-dark"
                    : "text-primary-dark/30"
                    }`} />

                <div className="divider" />

                <icons.banosCompletos className={`w-6 h-6 ${filters.some((filter) => filter.filterKey === "banosCompletos")
                    ? "text-primary-dark"
                    : "text-primary-dark/30"
                    }`} />

                <div className="divider" />

                <icons.estacionamientos className={`w-6 h-6 ${filters.some((filter) => filter.filterKey === "estacionamientos")
                    ? "text-primary-dark"
                    : "text-primary-dark/30"
                    }`} />

                <div className="divider" />

                <icons.casa className={`w-6 h-6 ${filters.some((filter) => filter.filterKey === "tipoInmueble")
                    ? "text-primary-dark"
                    : "text-primary-dark/30"
                    }`} />

                <div className="divider" />

                <icons.antiguedad className={`w-6 h-6 ${filters.some((filter) => filter.filterKey === "antiguedadTiempo")
                    ? "text-primary-dark"
                    : "text-primary-dark/30"
                    }`} />
            </section>



        </div>
    )

}