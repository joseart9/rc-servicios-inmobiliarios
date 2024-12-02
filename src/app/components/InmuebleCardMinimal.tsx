// Custom Imports
import Inmueble from "@/types/Inmueble";

import { Card, CardBody, CardFooter, CardHeader, Chip, Image, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import InmuebleImage from "@/app/inmuebles/components/InmuebleCard/InmuebleImagen";

export default function InmuebleCardMinimal({ inmueble }: { inmueble: Inmueble }) {

    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/inmuebles/${inmueble.idInmueble}`);
    };

    if (!inmueble) return null;

    return (
        <Card className=" h-[330px] w-[250px] relative group shadow-md">
            {/* Fondo negro transparente y texto */}
            <div onClick={handleCardClick} className="cursor-pointer absolute inset-0 animate-duration-[1000ms] bg-black/60 opacity-0 animate-ease-in-out group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <span className="text-white text-md font-semibold uppercase animate-ease-in-out group-hover:animate-fade-up">
                    Ver más
                </span>
            </div>

            <CardHeader className="p-0 w-full h-[200px] z-0">
                {inmueble.imagenes && inmueble.imagenes.length > 0 && (
                    <InmuebleImage inmueble={inmueble} />
                )}
            </CardHeader>

            <CardBody className="p-4 z-0">
                <div className="flex flex-col h-full w-full justify-between">
                    {/* Encabezado */}
                    <h1 className="text-sm font-semibold uppercase text-primaryDark line-clamp-2 text-ellipsis">
                        {inmueble.nombre}
                    </h1>
                </div>
            </CardBody>

            <CardFooter className="bg-primaryDark">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-md font-bold text-white">
                        ${inmueble.precio?.monto?.toLocaleString()} {inmueble.precio?.moneda}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}
