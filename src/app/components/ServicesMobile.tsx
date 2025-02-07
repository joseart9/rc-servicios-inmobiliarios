import servicios from "./ScrollCarousel/Servicios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ServiceCard = ({ title, description, img, href }: any) => {
    const router = useRouter();

    return (
        <motion.div
            className="relative flex flex-col items-end space-y-3 w-full h-52 bg-cover bg-center rounded-lg overflow-hidden cursor-pointer"
            style={{ backgroundImage: `url('${img}')` }}
            onClick={() => router.push(href)}
            whileTap={{ scale: 0.95 }} // Reducción al hacer tap
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 w-full bg-accent text-white text-2xl font-semibold p-1 px-3"
            >
                {title}
            </motion.h2>
        </motion.div>
    );
};

export default function ServicesMobile() {
    return (
        <section className="flex flex-col space-y-12 p-6" id="servicios">
            <h2 className="text-accent text-5xl font-bold text-center pb-4">
                Nuestros Servicios
            </h2>
            {servicios.map((servicio, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center space-y-3"
                >
                    <ServiceCard key={servicio.title} {...servicio} />
                </motion.div>
            ))}
        </section>
    )
}
