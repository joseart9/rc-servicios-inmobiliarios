"use client";
import InmueblesNavbar from "@/app/inmuebles/components/Navbar";
import ContactComponent from "../components/ContactComponent";
import { Button } from "@nextui-org/button";

import { motion } from "framer-motion";

export default function Polizas() {
    const scrollToForm = () => {
        const formElement = document.getElementById("contact-form");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <InmueblesNavbar>
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5 }}
                className="container mx-auto md:py-8 w-full flex flex-col gap-4 max-w-2xl">
                <section className="w-full h-screen">
                    <img className="w-64 float-left aspect-[1/1] lg:aspect-[1/2] 
                    md:rounded-lg shadow-lg object-cover object-center mb-0 mr-4 
                    [clip-path:circle(70%_at_20%_30%)] 
                    [shape-outside:circle(70%_at_20%_30%)]
                    md:[clip-path:polygon(0%_0%,100%_0%,75%_100%,0%_100%)]
                    md:[shape-outside:polygon(0%_0%,100%_0%,75%_100%,0%_100%)]
                    hover:object-cover hover:object-center hover:shadow-lg hover:rounded-lg hover:transition-transform hover:scale-105 duration-500 ease-in-out
                    "
                        src="/poliza.jpeg"
                        alt="Poliza"
                    />

                    <h1 className="font-black text-primary-dark text-xl uppercase mb-3 text-pretty">
                        ¡Solicita una Póliza Jurídica!
                    </h1>

                    <p className="text-primary-dark/60 font-normal text-pretty mb-5">
                        ¡Protege lo que más importa con nuestras pólizas jurídicas! 🔒
                    </p>

                    <p className="text-primary-dark/60 font-normal text-pretty mb-5">
                        En RC Servicios Inmobiliarios, te brindamos la tranquilidad que necesitas al arrendar tu propiedad. Nuestras pólizas jurídicas están diseñadas para garantizar el cumplimiento de los contratos, proteger tus intereses y ofrecerte respaldo legal en todo momento.
                    </p>

                    <p className="text-primary-dark/60 font-normal text-pretty mb-2">
                        No dejes nada al azar; confía en nosotros para asegurarte de que todo esté en orden. ¡Contáctanos hoy y da un paso seguro hacia el futuro! 📩
                    </p>

                    {/* Botón ajustado justo debajo del texto */}
                    <div className="h-fit w-full text-end pr-2 md:pr-0 animate-bounce animate-duration-[2000ms] animate-infinite">
                        <Button
                            variant="shadow"
                            color="warning"
                            className="text-white font-semibold"
                            onPress={scrollToForm}
                        >
                            Solicitar Poliza
                        </Button>
                    </div>
                </section>

                {/* Formulario con un id para el scroll */}
                <div id="contact-form">
                    <ContactComponent size="lg" defaultMsg="¡Hola!, Estoy interesad@ en una Póliza Jurídica" />
                </div>
            </motion.article>
        </InmueblesNavbar>
    );
}
