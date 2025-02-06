"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSection({
    hrefJump,
}: {
    hrefJump?: () => void;
}) {
    const router = useRouter();

    // Las rutas de las imágenes de fondo.
    const heroImages = ["/HeroImg1.webp", "/HeroImg2.webp", "/HeroImg3.webp"];
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Pre-carga manual de imágenes (API nativa del navegador).
    useEffect(() => {
        let loadedCount = 0;

        heroImages.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === heroImages.length) {
                    setImagesLoaded(true);
                }
            };
        });
    }, [heroImages]);

    return (
        <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .3, delay: imagesLoaded ? 0 : 1 }}

            className="hero relative overflow-x-hidden" style={{ height: "calc(100dvh - 64px)" }}>
            {/* Swiper de fondo con las imágenes ya pre-cargadas */}
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                modules={[Autoplay, EffectFade]}
                className="absolute inset-0 w-full h-full z-0 hero-swiper"
                loop
                fadeEffect={{ crossFade: true }}
                effect="fade"
                autoplay={{ delay: 5000 }}
            >
                {
                    heroImages.map((image, index) => (
                        <SwiperSlide key={index} className="w-full h-full">
                            {/* No necesitamos onLoad. La imagen ya está en cache (o precargada). */}
                            <img
                                src={image}
                                alt={`Hero Image ${index}`}
                                className="object-cover w-full h-full"
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
            {/* Overlay oscuro */}
            < div className="hero-overlay bg-opacity-60 h-full absolute inset-0 z-10" />

            {/* Contenido (título, texto, botones, etc.) */}
            < div className="hero-content text-neutral-content text-center h-full z-20" >
                <div className="flex flex-col max-w-md items-center justify-center w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6, delay: 1 }}
                        className="mb-5 text-5xl font-black text-white tracking-wide"
                    >
                        RC Servicios Inmobiliarios
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .6, delay: 1 }}
                        className=" mb-5 text-pretty text-lg text-white/80 w-full"
                    >
                        Encuentra el hogar perfecto; Somos especialistas en venta y renta
                        de inmuebles que se adaptan a tus necesidades.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6, delay: 1 }}
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
                        <Button disableRipple isIconOnly color="warning" variant="light" onPress={hrefJump}>
                            <IoIosArrowDown size={32} className="text-white/50" />
                        </Button>
                    </motion.div>
                </div>
            </div >
        </motion.div >
    );
}
