import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

export default function HeroSection() {
    const router = useRouter()
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(/HeroSectionImage.webp)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="flex flex-col max-w-md items-center justify-center w-full">
                    <h1 className="mb-5 text-5xl font-bold">
                        RC Servicios Inmobiliarios
                    </h1>
                    <p className="mb-5 text-pretty text-white/60">
                        Encuentra el hogar perfecto; Somos especialistas en venta y renta de inmuebles que se adaptan a tus necesidades.
                    </p>
                    <div className="flex flex-row w-fit border-3 border-primary-dark rounded-md">
                        <Button onPress={(e) => router.push("/inmuebles/venta")} radius="none" color="warning" size="lg" variant="solid" className="text-white font-bold uppercase">
                            Venta
                        </Button>
                        <div className="w-[4px] bg-primary-dark" />
                        <Button onPress={(e) => router.push("/inmuebles/renta")} radius="none" color="warning" size="lg" variant="solid" className="text-white font-bold uppercase">
                            Renta
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}