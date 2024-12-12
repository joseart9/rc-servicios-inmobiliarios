"use client";
import { useState, useEffect, useRef } from "react";

// Custom Imports
import Inmueble from "@/types/Inmueble";
import BreadcrumbNavigation from "@/app/inmuebles/components/BreadcrumbNavigation";
import InmuebleInfoShowcase from "@/app/inmuebles/[inmuebleId]/components/InmuebleInfoShowcase/InmuebleInfoShowcaseComponent";
import { useFetchCoordinates } from "@/hooks/useFetchCoordinates";

import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { Button, Spinner, Chip, Tooltip, Image, Skeleton } from "@nextui-org/react";
import "swiper/css";
import "swiper/css/navigation";
import dynamic from 'next/dynamic';

// Icons
import icons from "@/Icons";

import FormComponent from "./FormComponent";
import MoreInbueblesComponent from "./MoreInmueblesComponent";
import MapAdressDesc from "./Map/MapAdressDesc";

import { useFavs } from "@/globals/FavsProvider";


import { useDisclosure, Modal, ModalContent } from "@nextui-org/react";
import alert from "@/utils/Alert";

// Importa el componente dinámicamente, deshabilitando SSR
const MapComponent = dynamic(() => import('@/app/inmuebles/[inmuebleId]/components/Map/LeafletMap'), { ssr: false });


export default function DesktopViewInmuebleShowcase({ inmueble, loading }: { inmueble: Inmueble; loading?: boolean }) {
    const pathname = usePathname();

    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const { coordinates, loading: coordinatesLoading } = useFetchCoordinates(inmueble.direccion);
    const textRef = useRef<HTMLParagraphElement>(null);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const { favs, addFav, removeFav } = useFavs();

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

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const openImageModal = (index: number) => {
        setSelectedIndex(index);
        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        setSelectedIndex(0);
        setImageModalOpen(false);
    };

    function handleShare() {
        const fullUrl = `${window.location.origin}${pathname}`;
        navigator.clipboard.writeText(fullUrl)
            .then(() => {
                alert("Copiado al portapapeles", "success");
            })
            .catch((err) => {
                console.error("Error al copiar al portapapeles: ", err);
                alert("No se pudo copiar al portapapeles.", "error");
            });
    }

    return (
        <section className="flex flex-col w-full py-4 gap-7 container mx-auto p-2">

            <div className="flex flex-col gap-4">

                <section className="flex w-full flex-row items-center justify-between px-12">
                    <h1 className="uppercase text-primaryDark text-2xl font-semibold">
                        {inmueble.nombre}
                    </h1>
                    <div className="flex flex-row gap-2 items-center">
                        <Tooltip className="text-white" content="Contactar por WhatsApp" showArrow color="warning">
                            <Button variant="light" size="md" className="bg-transparent">
                                <icons.whatsapp className="text-primary-dark/60 text-2xl" />
                                <h1 className="text-lg text-primary-dark/60">
                                    Informes
                                </h1>
                            </Button>
                        </Tooltip>

                        {favs.some((fav) => fav.id === inmueble.idInmueble) ? (
                            <Tooltip className="text-white" content="Agregar a Favoritos" showArrow color="warning">
                                <Button onPress={handleRemoveFav} variant="light" isIconOnly size="md">
                                    <icons.favoritoActivo className="text-primary-dark/60 text-2xl" />
                                </Button>
                            </Tooltip>
                        ) : (
                            <Tooltip className="text-white" content="Agregar a Favoritos" showArrow color="warning">
                                <Button variant="light" isIconOnly size="md" onPress={handleAddFav}>
                                    <icons.favoritoDesactivado className="text-primary-dark/60 text-2xl" />
                                </Button>
                            </Tooltip>
                        )}

                        <Tooltip className="text-white" content="Compartir" showArrow color="warning">
                            <Button variant="light" isIconOnly size="md" onPress={handleShare}>
                                <icons.compartir className="text-primary-dark/60 text-2xl" />
                            </Button>
                        </Tooltip>
                    </div>
                </section>
            </div>

            <section className="flex flex-col w-full h-full p-2 px-5 gap-7 container mx-auto items-center">


                {/* Imagenes y Showcase */}
                <section className="grid grid-cols-3 gap-2 h-[550px]">
                    {/* Swiper */}
                    <Swiper
                        modules={[Navigation, Keyboard]}
                        navigation
                        keyboard={{
                            enabled: true,
                            onlyInViewport: true
                        }}
                        thumbs={{ swiper: thumbsSwiper }}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-[550px] rounded-lg object-cover col-span-2 custom-swiper mySwiper2"
                        loop
                    >
                        {inmueble.imagenes?.map((imagen, index) => (
                            <SwiperSlide key={imagen.id}>
                                <img
                                    className="object-cover rounded-lg w-full h-[550px] col-span-2 cursor-pointer"
                                    src={imagen.url}
                                    alt={`${inmueble.nombre} - ${index + 1}`}
                                    onClick={() => openImageModal(index)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Showcase */}
                    <InmuebleInfoShowcase inmueble={inmueble} />
                </section>


                {/* Descripcion */}
                <section className="flex flex-col w-full h-full min-h-[400px] rounded-lg bg-white">
                    <h1 className="bg-accent p-2 text-xl rounded-t-lg text-white font-semibold">
                        Descripción de la propiedad
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
                    <MoreInbueblesComponent currentInmueble={inmueble} />
                    <FormComponent inmueble={inmueble} />
                </section>
            </section>

            {/* Modal para mostrar todas las imágenes */}
            <Modal shouldBlockScroll isKeyboardDismissDisabled={false} isOpen={imageModalOpen} hideCloseButton onClose={closeImageModal} size="full" className="bg-black/80">
                <ModalContent className="relative flex items-center justify-center h-full p-0">
                    {/* Botón de cierre */}
                    <Button
                        onClick={closeImageModal}
                        className="absolute top-4 right-4 z-10 rounded-full bg-transparent text-white font-bold"
                        isIconOnly
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Button>

                    {/* Swiper */}
                    <Swiper
                        modules={[Navigation, Keyboard]}
                        keyboard={{
                            enabled: true,
                            onlyInViewport: false
                        }}
                        navigation
                        initialSlide={selectedIndex}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-full"
                        loop
                    >
                        {inmueble.imagenes?.map((imagen) => (
                            <SwiperSlide key={imagen.id}>
                                <img
                                    src={imagen.url}
                                    alt={imagen.id}
                                    className="w-full h-full object-contain "
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ModalContent>
            </Modal>
        </section>
    );
}
