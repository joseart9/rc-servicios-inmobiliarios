"use client";

import { Card, CardBody, Image } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import servicios from "./Servicios";

export default function ServiciosComponent() {

    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Detectar si la sección está en la pantalla
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true); // Marcar como animado para no repetir la animación.
                }
            },
            { threshold: 0.2 }
        );

        const element = document.querySelector("#servicios-section");
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [hasAnimated]); // Dependencia para verificar el estado de la animación.

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.7 },
        }),
    };



    return (
        <div id="servicios-section" className="container mx-auto">
            <Swiper
                spaceBetween={1}
                slidesPerView={1}
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 2,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 2,
                    },

                }}
                loop
                className="w-full custom-swiper pb-12"
                autoplay={{
                    delay: 3000, // Deslizamiento automático cada 3 segundos
                    disableOnInteraction: true, // No detener el autoplay al interactuar
                }}
            >
                {servicios.map((servicio, index) => (
                    <SwiperSlide key={index} className="px-6">
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            variants={cardVariants}
                            className="w-full h-full pb-4 pt-1"
                            viewport={{ once: true }}
                        >
                            <Card isPressable className="flex w-[300px] h-[400px] flex-shrink-0 bg-inherit shadow-md shadow-primary-light/15" shadow="none">
                                <CardBody className="p-4">
                                    <div className="w-full h-full flex flex-col items-center gap-8">
                                        <Image
                                            src={servicio.img}
                                            alt={servicio.title}
                                            radius="full"
                                            width={150}
                                            height={150}
                                            isZoomed
                                        />
                                        <div className="flex flex-col w-full h-full gap-4 px-4">
                                            <p className="text-center text-primary-dark text-3xl font-semibold">
                                                {servicio.title}
                                            </p>
                                            <p className="text-md text-pretty text-primary-dark/40 font-medium px-8">
                                                {servicio.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
}