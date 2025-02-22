"use client";

import { useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import useFavInmuebles from "@/hooks/useFavInmuebles";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import InmuebleCard from "@/app/inmuebles/components/InmuebleCard";
import icons from "@/Icons";

export default function DrawerComponent({
    isOpen,
    toggleDrawer,
    favs,
}: { isOpen: boolean; toggleDrawer: () => void; favs: string[] }) {

    const { inmuebles, loading } = useFavInmuebles(favs);

    // Estado para el tamaño dinámico del Drawer
    const [drawerSize, setDrawerSize] = useState(430);

    // Detectar cambios en el tamaño de la pantalla
    useEffect(() => {
        const updateSize = () => {
            setDrawerSize(window.innerWidth < 768 ? window.innerWidth : 430);
        };

        updateSize(); // Llamamos la función al montar
        window.addEventListener("resize", updateSize); // Escuchamos cambios en el tamaño de la ventana

        return () => window.removeEventListener("resize", updateSize); // Cleanup al desmontar
    }, []);

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
            size={drawerSize} // Uso del tamaño dinámico
            lockBackgroundScroll={true}
        >
            {/* Header */}
            <div className="flex flex-row justify-between items-center bg-primary-dark px-4 py-3">
                <div className="flex flex-row items-center gap-1">
                    <icons.favoritoActivo className="text-white text-2xl" />
                    <h1 className="text-2xl text-white font-semibold">Favoritos</h1>
                </div>

                <Tooltip showArrow className="text-primary-dark bg-white" content="Cerrar">
                    <Button
                        onClick={toggleDrawer}
                        className="text-primary-dark bg-transparent"
                        isIconOnly
                        color="warning"
                        variant="light"
                    >
                        <icons.close className="text-white text-2xl" />
                    </Button>
                </Tooltip>
            </div>

            {/* Contenido */}
            <div className="p-4 h-full w-full bg-neutral items-center overflow-y-auto pb-28">
                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <Spinner color="warning" />
                    </div>
                )}

                {!loading && inmuebles && inmuebles.length > 0 && (
                    <div className="grid grid-cols-1 gap-8">
                        {inmuebles.map((inmueble, index) => (
                            <InmuebleCard key={index} inmueble={inmueble} />
                        ))}
                    </div>
                )}

                {!loading && inmuebles && inmuebles.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <icons.sadFace className="w-12 h-12 text-primaryDark text-4xl" />
                        <p className="text-primaryDark text-lg font-semibold mt-2">
                            No se encontraron favoritos.
                        </p>
                    </div>
                )}
            </div>
        </Drawer>
    );
}
