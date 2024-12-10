"use client";

import InmueblesNavbar from "@/app/inmuebles/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ServiciosComponent from "@/app/components/ServiciosComponent";
import { Button, Input, Textarea, Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import useInmuebles from "@/hooks/useInmuebles";
import InmuebleCardMinal from "@/app/components/InmuebleCardMinimal";
import { useMemo } from "react";
import { orderByField } from "@/server/actions/inmuebles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
    const orderByData: orderByField = useMemo(() => ({ field: "createdAt", direction: "desc" }), []);

    const { inmuebles, loading } = useInmuebles({ orderByData });

    const inmueblesToShow = inmuebles?.slice(0, 10);

    return (
        <InmueblesNavbar>
            <div>
                <HeroSection />
                <div className="container mx-auto py-16 px-2">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-primary-dark mb-8"
                        viewport={{ once: true }}
                    >
                        Nuestros Servicios
                    </motion.h2>
                    <ServiciosComponent />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex w-screen container mx-auto px-24 bg-primary/5 rounded-3xl"
                >
                    <p className="text-primary-dark text-pretty text-center font-semibold tracking-wider italic text-3xl py-8">
                        " Transformamos espacios en sueños; confía en expertos para
                        encontrar, comprar o rentar el inmueble perfecto para tu vida. "
                    </p>
                </motion.div>
                <div className="flex w-full py-8" />
                <div className="grid grid-cols-3 w-full container mx-auto px-2">
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
                                slidesPerView={3}
                                spaceBetween={0}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination, Autoplay]}
                                className="w-full h-[380px] rounded-lg object-cover col-span-2 custom-swiper"
                                loop
                                autoplay={{
                                    delay: 2000, // Deslizamiento automático cada 3 segundos
                                    disableOnInteraction: false, // No detener el autoplay al interactuar
                                }}
                            >
                                <div className="flex flex-row gap-2 overflow-x-auto w-full">
                                    {inmueblesToShow?.map((inmueble) => (
                                        <SwiperSlide key={inmueble.idInmueble}>
                                            <InmuebleCardMinal
                                                key={inmueble.idInmueble}
                                                inmueble={inmueble}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </div>
                            </Swiper>
                        )}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="pt-4 col-span-1 text-center shadow-sm rounded-lg w-full border-1 border-primary-dark/30"
                    >
                        <h3 className="text-xl text-primary-dark font-semibold pb-8 uppercase">
                            Contáctanos
                        </h3>
                        <form className="flex flex-col gap-3 items-end w-full p-4">
                            <Input
                                type="text"
                                placeholder="Nombre"
                                variant="underlined"
                                color="warning"
                                isRequired
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Correo"
                                variant="underlined"
                                color="warning"
                                isRequired
                                required
                            />
                            <Input
                                type="tel"
                                placeholder="Teléfono"
                                variant="underlined"
                                color="warning"
                                isRequired
                                required
                            />
                            <Textarea
                                type="text"
                                placeholder="Mensaje"
                                variant="underlined"
                                color="warning"
                                isRequired
                                required
                            />
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="text-white"
                                    variant="solid"
                                    color="warning"
                                    size="md"
                                >
                                    Enviar
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
                <div className="flex w-full py-8" />
            </div>
        </InmueblesNavbar>
    );
}
