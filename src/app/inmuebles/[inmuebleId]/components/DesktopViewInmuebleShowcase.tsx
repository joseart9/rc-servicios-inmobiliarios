"use client";
import { useState, useEffect, useRef } from "react";

// Custom Imports
import Inmueble from "@/types/Inmueble";
import BreadcrumbNavigation from "@/app/inmuebles/components/BreadcrumbNavigation";
import InmuebleInfoShowcase from "@/app/inmuebles/[inmuebleId]/components/InmuebleInfoShowcase";
import { useFetchCoordinates } from "@/hooks/useFetchCoordinates";

import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button, Spinner, Chip, Tooltip, Image, Skeleton } from "@nextui-org/react";
import "swiper/css";
import "swiper/css/navigation";
import dynamic from 'next/dynamic';

// Icons

import { MdFavoriteBorder } from "react-icons/md";

import icons from "@/Icons";

import FormComponent from "./FormComponent";
import MoreInbueblesComponent from "./MoreInmueblesComponent";
import MapAdressDesc from "./Map/MapAdressDesc";

import { useFavs } from "@/globals/FavsProvider";

// Importa el componente dinámicamente, deshabilitando SSR
const MapComponent = dynamic(() => import('@/app/inmuebles/[inmuebleId]/components/Map/LeafletMap'), { ssr: false });


export default function DesktopViewInmuebleShowcase({ inmueble, loading }: { inmueble: Inmueble; loading?: boolean }) {
    const pathname = usePathname();

    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const { coordinates, loading: coordinatesLoading } = useFetchCoordinates(inmueble.direccion);
    const textRef = useRef<HTMLParagraphElement>(null);

    const { favs, addFav, removeFav, clearFavs } = useFavs();

    useEffect(() => {
        if (textRef.current) {
            const isTextOverflowing =
                textRef.current.scrollHeight > textRef.current.offsetHeight;
            setIsOverflowing(isTextOverflowing);
        }
    }, [textRef]);

    const handleAddFav = () => {
        addFav(inmueble.idInmueble);
    };

    const handleRemoveFav = () => {
        removeFav(inmueble.idInmueble);
    };

    return (
        <section className="flex flex-col w-full py-4 gap-7 container mx-auto p-2">

            <div className="flex flex-col gap-4">

                <section className="flex w-full flex-row items-center justify-between px-12">
                    <h1 className="uppercase text-primaryDark text-2xl font-semibold">
                        {inmueble.nombre}
                    </h1>
                    <div className="flex flex-row gap-2 items-center">
                        <Tooltip className="text-white" content="Contactar por Whatsapp" showArrow color="warning">
                            <Button variant="light" size="md" className="bg-transparent">
                                <icons.whatsapp className="text-primaryLight text-2xl" />
                                <h1 className="text-lg text-primaryLight">
                                    Informes
                                </h1>
                            </Button>
                        </Tooltip>

                        {favs.some((fav) => fav.id === inmueble.idInmueble) ? (
                            <Tooltip className="text-white" content="Agregar a Favoritos" showArrow color="warning">
                                <Button onPress={handleRemoveFav} variant="light" isIconOnly size="md">
                                    <icons.favoritoActivo className="text-primaryLight text-2xl" />
                                </Button>
                            </Tooltip>
                        ) : (
                            <Tooltip className="text-white" content="Agregar a Favoritos" showArrow color="warning">
                                <Button variant="light" isIconOnly size="md" onPress={handleAddFav}>
                                    <icons.favoritoDesactivado className="text-primaryLight text-2xl" />
                                </Button>
                            </Tooltip>
                        )}

                        <Tooltip className="text-white" content="Compartir" showArrow color="warning">
                            <Button variant="light" isIconOnly size="md">
                                <icons.compartir className="text-primaryLight text-2xl" />
                            </Button>
                        </Tooltip>
                    </div>
                </section>
            </div>

            <section className="flex flex-col w-full h-full p-2 px-5 gap-7 container mx-auto items-center">


                {/* Imagenes y Showcase */}
                <section className="grid grid-cols-3 gap-2 h-full max-h-[550px]">
                    {/* Swiper */}
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-full max-h-[550px] rounded-lg object-cover col-span-2 custom-swiper"
                        loop
                    >
                        {inmueble.imagenes?.map((imagen, index) => (
                            <SwiperSlide key={imagen.id}>
                                <img
                                    className="object-cover rounded-lg w-full h-full col-span-2"
                                    src={imagen.url}
                                    alt={`${inmueble.nombre} - ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Showcase */}
                    <InmuebleInfoShowcase inmueble={inmueble} />
                </section>


                {/* Descripcion */}
                <section className="flex flex-col w-full h-full rounded-lg bg-white">
                    <h1 className="bg-accent p-2 text-xl rounded-t-lg text-white font-semibold">
                        Descripcion de la propiedad
                    </h1>

                    <section className="flex flex-col p-2 text-start">
                        {/* Texto alineado a la izquierda */}
                        <p
                            ref={textRef}
                            className={`text-accent text-md whitespace-pre-line transition-all ${expanded ? "line-clamp-none" : "line-clamp-6"
                                }`}
                        >
                            {inmueble.descripcion}
                        </p>

                        {/* Contenedor para el botón centrado */}
                        <div className="flex justify-center">
                            {!expanded && isOverflowing && (
                                <Button
                                    className="mt-2 text-accent font-semibold w-fit"
                                    onClick={() => setExpanded(true)}
                                    variant="light"
                                    size="lg"
                                    endContent={<icons.arrowDown className="text-primary-dark text-xl" />}
                                >
                                    Ver más
                                </Button>
                            )}
                            {expanded && (
                                <Button
                                    className="mt-2 text-accent font-semibold"
                                    onClick={() => setExpanded(false)}
                                    variant="light"
                                    size="lg"
                                    endContent={<icons.arrowUp className="text-primary-dark text-xl" />}
                                >
                                    Ver menos
                                </Button>
                            )}
                        </div>
                    </section>
                </section>

                <section className="grid grid-cols-3 w-full gap-2">
                    <section className="grid grid-rows-2 grid-cols-1 gap-4 w-full justify-between">
                        {/* Amenidades */}
                        <div className=" rounded-lg bg-white">
                            <h1 className="bg-accent p-2 text-xl rounded-t-lg text-white font-semibold">
                                Amenidades
                            </h1>
                            <section className="flex flex-wrap gap-2 p-2 items-center">
                                {inmueble.caracteristicas?.amenidades?.map((amenidad, index) => (
                                    <Chip
                                        className="cursor-default capitalize hover:text-2xl hover:p-5 group-hover:animate-ping transition-all duration-500 ease-in-out"
                                        key={index}
                                        color="warning"
                                        variant="flat"
                                    >
                                        {amenidad.nombre}
                                    </Chip>
                                ))}
                            </section>
                        </div>

                        {/* Servicios */}
                        <div className=" rounded-lg bg-white">
                            <h1 className="bg-accent p-2 text-xl rounded-t-lg text-white font-semibold">
                                Servicios
                            </h1>
                            <section className="flex flex-wrap gap-2 p-2 items-center">
                                {inmueble.caracteristicas?.servicios?.map((servicio, index) => (
                                    <Chip className="cursor-default capitalize hover:text-2xl hover:p-5 group-hover:animate-ping transition-all duration-500 ease-in-out" key={index} color="warning" variant="flat">
                                        {servicio.nombre}
                                    </Chip>
                                ))}
                            </section>
                        </div>
                    </section>


                    {/* Mapa */}
                    {coordinates ? (
                        <MapComponent inmueble={inmueble} coordinates={coordinates} />

                    ) : (
                        <div id="map" className="w-full h-[400px] rounded-lg col-span-2">
                            <Skeleton className="w-full h-full" />
                        </div>
                    )}
                </section>

                <MapAdressDesc inmueble={inmueble} />

                <section className="grid grid-cols-3 w-full h-full gap-2">
                    <MoreInbueblesComponent />
                    <FormComponent />
                </section>
            </section>
        </section>
    );
}
