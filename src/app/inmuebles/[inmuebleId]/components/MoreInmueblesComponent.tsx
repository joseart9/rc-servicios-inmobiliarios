import InmuebleCardMinimal from "@/app/components/InmuebleCardMinimal";
import { Spinner } from "@nextui-org/react";
import useInmuebles from "@/hooks/useInmuebles";
import { useMemo } from "react";
import { orderByField } from "@/server/actions/inmuebles";
import Inmueble from "@/types/Inmueble";

export default function MoreInbueblesComponent({ currentInmueble }: { currentInmueble: Inmueble }) {

    const orderByData: orderByField = useMemo(() => ({ field: "createdAt", direction: "desc" }), []);

    const { inmuebles, loading } = useInmuebles({ orderByData });

    // Exclude current inmueble from the list
    const filteredInmuebles = inmuebles?.filter(inmueble => inmueble.idInmueble !== currentInmueble.idInmueble);

    return (
        <div className="col-span-2 w-full">
            <h1 className="text-xl font-semibold uppercase text-accent">
                También te puede interesar
            </h1>
            <div className="flex flex-row overflow-x-auto w-full h-full">
                {loading ? (
                    <div className="flex justify-center items-center w-full h-96">
                        <Spinner color="warning" size="lg" />
                    </div>
                ) : (
                    <div className="flex flex-row gap-2 overflow-x-auto w-full">
                        {filteredInmuebles?.map((inmueble) => (
                            <InmuebleCardMinimal
                                key={inmueble.idInmueble}
                                inmueble={inmueble}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}