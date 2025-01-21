"use client";
import InmueblesNavbar from "@/app/inmuebles/components/Navbar";
import ContactComponent from "../components/ContactComponent";
import { Button } from "@nextui-org/button";

import { motion } from "framer-motion";

export default function Valuacion() {
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

                        src="/valuacion.jpeg"
                        alt="valuacion"
                    />

                    <h1 className="font-black text-primary-dark text-xl uppercase mb-3 text-pretty">
                        ¡Solicita una valuación para tu propiedad!
                    </h1>

                    <p className="text-primary-dark/60 font-normal text-pretty mb-5">
                        ¿Quieres saber cuánto vale tu propiedad en el mercado actual? ¡En RC Servicios Inmobiliarios te ayudamos a descubrirlo! 🏡
                    </p>

                    <p className="text-primary-dark/60 font-normal text-pretty mb-5">
                        Ofrecemos un servicio profesional de valuación de propiedades que te permitirá tomar decisiones informadas y seguras. Ya sea que estés pensando en vender, rentar o simplemente conocer el valor real de tu inmueble, nuestro equipo de expertos está listo para brindarte una evaluación precisa y personalizada.
                    </p>

                    <p className="text-primary-dark/60 font-normal text-pretty mb-2">
                        ¡Contáctanos hoy y descubre el verdadero potencial de tu propiedad! 📞
                    </p>


                    {/* Botón ajustado justo debajo del texto */}
                    <div className="h-fit w-full text-end pr-2 md:pr-0 animate-bounce animate-duration-[2000ms] animate-infinite">
                        <Button
                            variant="shadow"
                            color="warning"
                            className="text-white font-semibold"
                            onPress={scrollToForm}
                        >
                            Solicitar Valuación
                        </Button>
                    </div>
                </section>

                {/* Formulario con un id para el scroll */}
                <div id="contact-form">
                    <ContactComponent size="lg" defaultMsg="¡Hola!, Estoy interesad@ en realizar una valuación para mi propiedad" />
                </div>
            </motion.article>
        </InmueblesNavbar>
    );
}
