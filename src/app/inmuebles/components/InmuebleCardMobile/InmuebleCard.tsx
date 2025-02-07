// Custom Imports
import Inmueble from "@/types/Inmueble";

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import InmuebleInfo from "./InmuebleInfo";
import InmuebleImage from "./InmuebleImagen";


export default function InmuebleCard({ inmueble }: { inmueble: Inmueble }) {

    const router = useRouter();


    const handleCardClick = () => {
        router.push(`/inmuebles/${inmueble.idInmueble}`);
    };

    if (!inmueble) return null;

    return (
        <Card radius="sm" isPressable disableRipple onPress={handleCardClick} className="w-auto h-[550px] max-w-[400px] min-w-[300px] relative group shadow-md">

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
                    <div className="mt-auto">
                        <InmuebleInfo inmueble={inmueble} />
                    </div>
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
