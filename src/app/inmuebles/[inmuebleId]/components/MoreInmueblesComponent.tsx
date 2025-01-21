import InmuebleCardMinimal from "@/app/components/InmuebleCardMinimal";
import { Spinner } from "@nextui-org/react";
import useInmuebles from "@/hooks/useInmuebles";
import { useMemo } from "react";
import { orderByField } from "@/server/actions/inmuebles";
import Inmueble from "@/types/Inmueble";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function MoreInbueblesComponent({ currentInmueble }: { currentInmueble: Inmueble }) {

    const orderByData: orderByField = useMemo(() => ({ field: "createdAt", direction: "desc" }), []);

    const { inmuebles, loading } = useInmuebles({ orderByData });

    // Exclude current inmueble from the list
    const filteredInmuebles = inmuebles?.filter(inmueble => inmueble.idInmueble !== currentInmueble.idInmueble);

    return (
        <div className="col-span-2 w-full">
            <h1 className="text-xl font-semibold uppercase text-accent py-4">
                También te puede interesar
            </h1>
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
                    className="custom-swiper mini-swiper rounded-lg"
                    modules={[Pagination, Autoplay]}
                    loop
                    autoplay={{
                        delay: 2000, // Deslizamiento automático cada 3 segundos
                        disableOnInteraction: false, // No detener el autoplay al interactuar
                    }}
                >
                    {filteredInmuebles?.map((inmueble) => (
                        <SwiperSlide key={inmueble.idInmueble}>
                            <InmuebleCardMinimal
                                inmueble={inmueble}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}