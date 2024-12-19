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
                spaceBetween={20}
                slidesPerView={"auto"}
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                }}
                loop
                className="custom-swiper mini-swiper"
                autoplay={{
                    delay: 3000, // Deslizamiento automático cada 3 segundos
                    disableOnInteraction: true, // No detener el autoplay al interactuar
                }}
            >
                {servicios.map((servicio, index) => (
                    <SwiperSlide key={index} className="">
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            variants={cardVariants}
                            className="w-full h-full pb-4 pt-1 px-2"
                            viewport={{ once: true }}
                        >
                            <Card isPressable className="flex w-[300px] h-[400px] flex-shrink-0 bg-inherit shadow-md shadow-primary-light/20" shadow="none">
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