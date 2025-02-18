import HeroSectionMobile from "./HeroSectionMobile";
import NavbarComponent from "../inmuebles/components/Navbar";
import ServicesMobile from "./ServicesMobile";
import InmuebleCardMinal from "@/app/components/InmuebleCardMinimal";

import { Button, ButtonGroup, Spinner } from "@nextui-org/react";

import { motion } from "framer-motion";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useMemo } from "react";
import { orderByField } from "@/server/actions/inmuebles";
import useInmuebles from "@/hooks/useInmuebles";
import ContactComponent from "./ContactComponent";

export default function HomePageMobileView() {

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
        <NavbarComponent>
            <HeroSectionMobile hrefJump={scrollToServicios} />

            <ServicesMobile />

            <div className="flex flex-col w-screen h-fit py-8 text-center bg-primary/5 justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}>
                    <div className="col-span-6">
                        <img src="/HeroImg1.webp" alt="Crédito" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-primary-dark/80 text-pretty font-semibold tracking-wider italic text-lg pt-3 px-6">
                            <span className="text-lg text-primary-dark font-black">
                                "
                            </span>
                            Transformamos espacios en sueños; confía en expertos para encontrar, comprar o rentar el inmueble perfecto para tu vida.
                            <span className="text-lg text-primary-dark font-black">
                                "
                            </span>
                        </h2>

                        <div className="flex flex-col pt-4">
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
                </motion.div>
            </div>

            <div className="flex flex-col space-y-12 w-full p-6 gap-x-10">
                <div>
                    <h3 className="text-2xl font-semibold uppercase text-accent pt-4 pb-4">
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
                    className="pt-4 text-center shadow-sm rounded-md shadow-primary-light/25 w-full"
                >
                    <h3 className="text-2xl text-primary-dark font-semibold uppercase">
                        Contáctanos
                    </h3>
                    <ContactComponent bordered={false} size="lg" />
                </motion.div>
            </div>


        </NavbarComponent>
    )
}