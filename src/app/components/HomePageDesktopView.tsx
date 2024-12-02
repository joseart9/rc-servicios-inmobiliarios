"use client";

import InmueblesNavbar from "@/app/inmuebles/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ServiciosComponent from "@/app/components/ServiciosComponent";
import { Button, Input, Textarea } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <InmueblesNavbar >
            <div className="">

                <HeroSection />

                <div className="container mx-auto py-16">
                    {/* <h1 className="text-4xl font-bold text-primary-dark mb-8">
                        Servicios
                    </h1> */}
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-4xl font-bold text-primary-dark mb-8'
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
                    className="flex w-screen container mx-auto px-24 bg-primary-light/10 rounded-3xl">
                    <p className="text-primary-dark text-pretty text-center font-semibold tracking-wider italic text-3xl py-8">
                        " Transformamos espacios en sueños; confía en expertos para encontrar, comprar o rentar el inmueble perfecto para tu vida. "
                    </p>
                </motion.div>

                <div className="flex w-full py-8" />

                <div className="grid grid-cols-3 w-full container mx-auto">
                    <div className="col-span-2">
                        <h3 className="text-xl font-semibold uppercase text-accent pt-4">
                            Recien Agregados
                        </h3>
                        Lista de recien agregados
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="pt-4 col-span-1 text-center shadow-sm rounded-lg w-full border-4 border-primary-dark/30">
                        <h3 className="text-xl text-primary-dark font-semibold pb-8 uppercase">
                            Contáctanos
                        </h3>
                        <form className="flex flex-col gap-3 items-end w-full p-2">
                            <Input type="text" placeholder="Nombre" variant="underlined" color="warning" isRequired required />
                            <Input type="email" placeholder="Correo" variant="underlined" color="warning" isRequired required />
                            <Input type="tel" placeholder="Teléfono" variant="underlined" color="warning" isRequired required />
                            <Textarea type="text" placeholder="Mensaje" variant="underlined" color="warning" isRequired required />
                            <div className="pt-4">
                                <Button type="submit" className="text-white" variant="solid" color="warning" size="md">
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
