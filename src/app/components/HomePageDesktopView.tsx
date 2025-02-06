"use client";

import InmueblesNavbar from "@/app/inmuebles/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ServiciosComponent from "@/app/components/ServiciosComponent";
import { Button, Input, Textarea, Spinner, ButtonGroup, Spacer } from "@nextui-org/react";
import { motion } from "framer-motion";
import useInmuebles from "@/hooks/useInmuebles";
import InmuebleCardMinal from "@/app/components/InmuebleCardMinimal";
import { useMemo, useState } from "react";
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
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const inmueblesToShow = inmuebles?.slice(0, 10);

    const scrollToServicios = () => {
        const formElement = document.getElementById("servicios");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <InmueblesNavbar>
            <HeroSection hrefJump={scrollToServicios} />

            <div className="bg-neutral/20" id="servicios">
                <ScrollCarousel />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-12 gap-x-8 w-screen h-screen text-center bg-primary/5 justify-center items-center"
            >
                <div className="flex flex-col col-span-6 h-full items-center justify-center space-y-12">
                    <h2 className="px-8 text-primary-dark/80 text-pretty font-semibold tracking-wider italic text-4xl">
                        <span className="text-4xl text-primary-dark font-black">
                            "
                        </span>
                        Transformamos espacios en sueños; confía en expertos para encontrar, comprar o rentar el inmueble perfecto para tu vida.
                        <span className="text-4xl text-primary-dark font-black">
                            "
                        </span>
                    </h2>

                    <div className="flex flex-col space-y-5">
                        <h2 className="text-2xl italic text-primary-dark/75">
                            ¡Encuentra tu inmueble ideal!
                        </h2>

                        <ButtonGroup radius="sm" size="lg">
                            <Button size="lg" color="default" className="bg-primary-dark text-white font-semibold">
                                Venta
                            </Button>
                            <Button size="lg" color="default" className="bg-primary-dark text-white font-semibold">
                                Renta
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>

                <div className="col-span-6">
                    <img src="/HeroImg1.webp" alt="Crédito" className="w-full h-full object-cover" />
                </div>
            </motion.div>

            <div className="grid grid-cols-3 w-full p-6 gap-x-10">
                <div className="col-span-2">
                    <h3 className="text-3xl font-semibold uppercase text-accent pt-4 pb-4">
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
                    <h3 className="text-3xl text-primary-dark font-semibold uppercase">
                        Contáctanos
                    </h3>
                    <ContactComponent bordered={false} size="sm" />
                </motion.div>
            </div>


            <div className="flex w-full py-8" />
        </InmueblesNavbar>
    );
}
