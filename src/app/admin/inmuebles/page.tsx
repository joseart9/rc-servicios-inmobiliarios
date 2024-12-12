"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import useInmuebles from "@/hooks/useInmuebles";
import { useMemo, useState } from "react";
import { orderByField } from "@/server/actions/inmuebles";

import InmuebleCardAdmin from "@/app/admin/components/InmuebleCardAdmin";


export default function InmueblesPage() {
    const orderByData: orderByField = useMemo(() => ({ field: "createdAt", direction: "desc" }), []);
    const [filter, setFilter] = useState<string>("");

    const { inmuebles, loading } = useInmuebles({ orderByData });

    console.log(inmuebles);

    if (loading) {
        return (
            <div className="flex flex-col h-screen items-center justify-center gap-8">
                <h1 className="text-2xl font-semibold text-primary-dark">Cargando...</h1>
                <Spinner color="warning" size="lg" />
            </div>
        )
    }

    return (
        <div
            className="flex flex-col gap-3 p-2"
            style={{
                minHeight: "calc(100vh - 64px)", // Ocupa el espacio restante de la pantalla
            }}
        >
            <header className="flex flex-row justify-between items-center bg-primary-dark shadow-md rounded-lg mx-8 p-2 px-8">
                <h1 className="text-2xl font-semibold text-white">Inmuebles</h1>
                <section className="flex flex-row gap-3">
                    <Button color="warning" variant="solid" size="lg" className="text-white font-semibold">
                        Venta
                    </Button>
                    <Button color="warning" size="lg" variant="solid" className="text-white font-semibold">
                        Renta
                    </Button>
                    <Input label="Buscar por nombre" size="sm" color="default" variant="bordered" classNames={{
                        label: "text-white hover:text-white",
                        inputWrapper: "text-white bg-white/20 backdrop-blur-none backdrop-filter backdrop-saturate-200",
                    }} className="text-white" />
                </section>
            </header>

            <section
                className="grid grid-cols-2 md:grid-cols-3 gap-2 container mx-auto max-w-6xl overflow-y-auto"
                style={{
                    height: "calc(100vh - 64px - 100px)",
                }}
            >
                {inmuebles && inmuebles.map((inmueble) => (
                    <InmuebleCardAdmin key={inmueble.idInmueble} inmueble={inmueble} />
                ))}
            </section>
        </div>
    );
}
