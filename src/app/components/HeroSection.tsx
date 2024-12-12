import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";

export default function HeroSection({ hrefJump }: { hrefJump?: any }) {
    const router = useRouter()
    return (
        <div
            className="hero"
            style={{
                minHeight: "calc(100vh - 64px)",
                backgroundImage: "url(/HeroSectionImage.webp)",
            }}
        >
            <div className="hero-overlay bg-opacity-60 h-full"></div>
            <div className="hero-content text-neutral-content text-center h-full">
                <div
                    className="flex flex-col max-w-md items-center justify-center w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-5 text-5xl font-black text-primary-dark tracking-wide">
                        RC Servicios Inmobiliarios
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className="mb-5 text-pretty text-white/70">
                        Encuentra el hogar perfecto; Somos especialistas en venta y renta de inmuebles que se adaptan a tus necesidades.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.6 }}
                        className="flex flex-row w-fit">
                        <Button onPress={(e) => router.push("/inmuebles/venta")} radius="none" color="warning" size="lg" variant="solid" className="text-white font-bold uppercase rounded-l-md">
                            Venta
                        </Button>
                        <div className="w-[4px] bg-primary-dark" />
                        <Button onPress={(e) => router.push("/inmuebles/renta")} radius="none" color="warning" size="lg" variant="solid" className="text-white font-bold uppercase rounded-r-md">
                            Renta
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        transition={{ duration: 3 }}
                        className="absolute bottom-0 animate-bounce animate-infinite animate-duration-1000">
                        <Button isIconOnly color="warning" variant="light" onPress={hrefJump}>
                            <IoIosArrowDown size={32} />
                        </Button>
                    </motion.div>

                </div>

            </div>
        </div>
    )
}