"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import CardType from "./CardType";
import Servicios from "./Servicios";

import { useRouter } from "next/navigation";

const cards: CardType[] = Servicios;

const Example = () => {
    return (
        <div className="">
            <HorizontalScrollCarousel />
        </div>
    );
};

const HorizontalScrollCarousel = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

    return (
        <section ref={targetRef} className="relative h-[170vh] pt-20">
            <motion.h2
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '-100px 0px -100px 0px' }}
                className="text-5xl font-bold text-primary-dark text-center -mb-12 tracking-wide">
                Nuestros Servicios
            </motion.h2>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4">
                    {cards.map((card) => {
                        return <Card card={card} key={card.title} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ card }: { card: CardType }) => {
    const router = useRouter();
    return (
        <div
            key={card.title}
            className="group relative h-[450px] w-[450px] overflow-hidden transition-transform duration-300 hover:scale-105 mr-10 cursor-pointer"
            onClick={() => router.push(card.href)}
        >
            {/* Imagen de fondo */}
            <div
                style={{
                    backgroundImage: `url(${card.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 rounded-full"
            ></div>

            {/* Contenedor del título */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <p className="w-full mx-4 rounded-lg bg-gradient-to-br from-white/20 to-white/0 p-8 text-4xl font-black uppercase text-white text-center backdrop-blur-md px-2">
                    {card.title}
                </p>
            </div>
        </div>
    );
};

export default Example;