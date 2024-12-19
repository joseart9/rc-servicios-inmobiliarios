import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';

{/* <Swiper
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
{heroImages?.map((inmueble, index) => (
    <SwiperSlide key={index}>
        <img
            src={inmueble}
            alt="Hero Image"
            className="object-cover w-full h-full"
        />
    </SwiperSlide>
))}
</Swiper> */}

export default function HeroSection({ hrefJump }: { hrefJump?: any }) {
    const router = useRouter()

    const heroImages = [
        "HeroImg1.jpg",
        "HeroImg2.webp",
        "HeroImg3.jpg",
    ]

    return (
        <div
            className="hero relative"
            style={{
                height: "calc(100vh - 64px)",
            }}
        >
            {/* Swiper de fondo */}
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                modules={[Autoplay, EffectFade]}
                className="absolute inset-0 w-full h-full z-0 hero-swiper"
                loop
                fadeEffect={{
                    crossFade: true
                }}
                effect={'fade'}
                autoplay={{
                    delay: 5000
                }}
            >
                {heroImages.map((inmueble, index) => (
                    <SwiperSlide key={index} className="w-full h-full">
                        <img
                            src={inmueble}
                            alt={`Hero Image ${index}`}
                            className="object-cover w-full h-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay oscuro por encima del swiper */}
            <div className="hero-overlay bg-opacity-60 h-full absolute inset-0 z-10"></div>

            <div className="hero-content text-neutral-content text-center h-full z-50">
                <div className="flex flex-col max-w-md items-center justify-center w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-5 text-5xl font-black text-white tracking-wide"
                    >
                        RC Servicios Inmobiliarios
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className=" mb-5 text-pretty text-white/80"
                    >
                        Encuentra el hogar perfecto; Somos especialistas en venta y renta de inmuebles que se adaptan a tus necesidades.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.6 }}
                        className="flex flex-row w-fit"
                    >
                        <Button
                            onPress={() => router.push("/inmuebles/venta")}
                            radius="none"
                            color="warning"
                            size="lg"
                            variant="solid"
                            className="text-white font-black uppercase rounded-l-md"
                        >
                            Venta
                        </Button>
                        <div className="w-[4px] bg-primary-dark" />
                        <Button
                            onPress={() => router.push("/inmuebles/renta")}
                            radius="none"
                            color="warning"
                            size="lg"
                            variant="solid"
                            className="text-white font-black uppercase rounded-r-md"
                        >
                            Renta
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 3 }}
                        className="absolute bottom-0 animate-bounce animate-infinite animate-duration-1000"
                    >
                        <Button isIconOnly color="warning" variant="light" onPress={hrefJump}>
                            <IoIosArrowDown size={32} className="text-white/50" />
                        </Button>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}