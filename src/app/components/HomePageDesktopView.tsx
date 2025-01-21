"use client";

import InmueblesNavbar from "@/app/inmuebles/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ServiciosComponent from "@/app/components/ServiciosComponent";
import { Button, Input, Textarea, Spinner, ButtonGroup, Spacer } from "@nextui-org/react";
import { motion } from "framer-motion";
import useInmuebles from "@/hooks/useInmuebles";
import InmuebleCardMinal from "@/app/components/InmuebleCardMinimal";
import { useMemo } from "react";
import { orderByField } from "@/server/actions/inmuebles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ContactComponent from "@/app/components/ContactComponent";

import ScrollCarousel from "./ScrollCarousel";

export default function Home() {
    const orderByData: orderByField = useMemo(() => ({ field: "createdAt", direction: "asc" }), []);

    const { inmuebles, loading } = useInmuebles({ orderByData: orderByData });

    const inmueblesToShow = inmuebles?.slice(0, 10);

    const scrollToServicios = () => {
        const formElement = document.getElementById("servicios");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <InmueblesNavbar>
            <div>
                <HeroSection hrefJump={scrollToServicios} />

                <div className="flex w-full py-8" />


                <div className="bg-neutral/20" id="servicios">
                    <ScrollCarousel />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex w-screen text-center bg-primary/5 justify-center items-center"
                >
                    <div className="text-primary-dark/80 text-pretty font-semibold tracking-wider italic text-3xl py-8 max-w-5xl">
                        <span className="text-3xl text-primary-dark font-black">
                            "
                        </span>
                        Transformamos espacios en sueños; confía en expertos para encontrar, comprar o rentar el inmueble perfecto para tu vida.
                        <span className="text-3xl text-primary-dark font-black">
                            "
                        </span>

                        <Spacer y={8} />

                        <ButtonGroup>
                            <Button size="lg" color="default" className="bg-primary-dark text-white font-semibold">
                                Venta
                            </Button>
                            <Button size="lg" color="default" className="bg-primary-dark text-white font-semibold">
                                Renta
                            </Button>
                        </ButtonGroup>
                    </div>
                </motion.div>


                <div className="flex w-full mb-20" />


                <div className="grid grid-cols-3 w-full container mx-auto px-2 gap-6 max-w-5xl">
                    <div className="col-span-2">
                        <h3 className="text-xl font-semibold uppercase text-accent pt-4 pb-4">
                            Recién Agregados
                        </h3>
                        {loading ? (
                            <div className="flex justify-center items-center w-full h-96">
                                <Spinner color="warning" size="lg" />
                            </div>
                        ) : (
                            <Swiper
                                slidesPerView={"auto"}
                                spaceBetween={20}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination, Autoplay]}
                                className="custom-swiper mini-swiper rounded-lg"
                                loop
                                autoplay={{
                                    delay: 2000, // Deslizamiento automático cada 3 segundos
                                    disableOnInteraction: true, // No detener el autoplay al interactuar
                                }}
                            >
                                {inmueblesToShow?.map((inmueble) => (
                                    <SwiperSlide key={inmueble.idInmueble}>
                                        <InmuebleCardMinal
                                            key={inmueble.idInmueble}
                                            inmueble={inmueble}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="pt-4 col-span-1 text-center shadow-sm rounded-md shadow-primary-light/25 w-full"
                    >
                        <h3 className="text-xl text-primary-dark font-semibold uppercase">
                            Contáctanos
                        </h3>
                        <ContactComponent bordered={false} size="sm" />
                    </motion.div>
                </div>


                <div className="flex w-full py-8" />


            </div>
        </InmueblesNavbar>
    );
}
