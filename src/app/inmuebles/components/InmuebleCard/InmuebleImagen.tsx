import { useState } from "react";
import { Spinner } from "@nextui-org/react";

export default function InmuebleImage({ inmueble }: { inmueble: any }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-full h-full">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner color="warning" size="lg" />
                </div>
            )}
            {inmueble.imagenes && inmueble.imagenes.length > 0 && (
                <img
                    className={`w-full h-full object-cover ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                    src={inmueble.imagenes[0].url}
                    alt={inmueble.nombre}
                    onLoad={() => setIsLoading(false)}
                />
            )}
        </div>
    );
}
