// Custom Imports
import Inmueble from "@/types/Inmueble";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import InmuebleInfo from "./InmuebleCardInfo";
import { ImageUploadProps } from "@/utils/uploadImageToImgBB";
import { CiImageOff } from "react-icons/ci";

export default function InmuebleCard({ inmueble, images }: { inmueble: Inmueble; images: ImageUploadProps[] }) {

    return (
        <Card radius="sm" className="w-auto relative group shadow-md rounded-none rounded-b-md">
            <CardHeader className="p-0 w-full h-[300px] z-0">
                {images && images.length > 0 ? (
                    <img
                        src={images[0].file ? URL.createObjectURL(images[0].file) : images[0].url}
                        alt={inmueble.nombre}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <CiImageOff className="text-4xl text-accent" />
                    </div>
                )}
            </CardHeader>

            <CardBody className="p-4 z-0">
                <div className="flex flex-row w-full pb-6">
                    <h1 className="text-md font-semibold uppercase text-primaryDark">{inmueble.nombre}</h1>
                </div>
                <InmuebleInfo inmueble={inmueble} />
            </CardBody>
            <CardFooter className="bg-primaryDark">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-lg font-bold text-neutral">
                        ${inmueble.precio?.monto?.toLocaleString()} {inmueble.precio?.moneda}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}
