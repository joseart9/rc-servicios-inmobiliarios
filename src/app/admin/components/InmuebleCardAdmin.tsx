// Custom Imports
import Inmueble from "@/types/Inmueble";

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import InmuebleInfo from "./InmuebleInfo";
import InmuebleImage from "@/app/inmuebles/components/InmuebleCard/InmuebleImagen";


export default function InmuebleCardAdmin({ inmueble }: { inmueble: Inmueble }) {

    const router = useRouter();


    const handleCardClick = () => {
        router.push(`/admin/inmuebles/edit/${inmueble.idInmueble}`);
    };

    if (!inmueble) return null;

    return (
        <Card radius="sm" className="w-auto h-[450px] max-w-[400px] min-w-[300px] relative group shadow-md">
            {/* Fondo negro transparente y texto */}
            <div onClick={handleCardClick} className="cursor-pointer absolute inset-0 animate-duration-[1000ms] bg-black/60 opacity-0 animate-ease-in-out group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <span className="text-white text-lg font-semibold uppercase animate-ease-in-out group-hover:animate-fade-up">
                    Editar
                </span>
            </div>

            <CardHeader className="p-0 w-full h-[300px] z-0">
                {inmueble.imagenes && inmueble.imagenes.length > 0 && (
                    <InmuebleImage inmueble={inmueble} />
                )}
            </CardHeader>

            <CardBody className="p-4 z-0">
                <div className="flex flex-col h-full w-full justify-between">
                    {/* Encabezado */}
                    <h1 className="text-md font-semibold uppercase text-primaryDark line-clamp-3">
                        {inmueble.nombre}
                    </h1>

                    {/* Información */}
                    {/* <div className="mt-auto">
                        <InmuebleInfo inmueble={inmueble} />
                    </div> */}
                </div>
            </CardBody>

            <CardFooter className="bg-primaryDark">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-lg font-bold text-white">
                        ${inmueble.precio?.monto?.toLocaleString()} {inmueble.precio?.moneda}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}
