"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import useInmuebles from "@/hooks/useInmuebles";
import { useMemo, useState } from "react";
import { orderByField } from "@/server/actions/inmuebles";

import InmuebleCardAdmin from "@/app/admin/components/InmuebleCardAdmin";
import { IoMdSearch } from "react-icons/io";

export default function InmueblesPage() {
    const orderByData: orderByField = useMemo(() => ({ field: "createdAt", direction: "desc" }), []);
    const [filter, setFilter] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const { inmuebles, loading } = useInmuebles({ orderByData, filter });

    // Filtrar inmuebles por búsqueda
    const filteredInmuebles = useMemo(() => {
        if (!search) return inmuebles;
        return inmuebles?.filter((inmueble) =>
            inmueble.nombre?.toLowerCase().includes(search.toLowerCase())
        );
    }, [inmuebles, search]);

    if (loading) {
        return (
            <div className="flex flex-col h-screen items-center justify-center gap-8">
                <h1 className="text-2xl font-semibold text-primary-dark">Cargando...</h1>
                <Spinner color="warning" size="lg" />
            </div>
        );
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
                <section className="flex flex-row gap-3 items-center">
                    <Button onPress={() => setFilter("")} color="warning" size="lg" variant="solid" className={`text-white font-semibold ${filter === "" ? "bg-primary-light" : ""}`}>
                        Todos
                    </Button>
                    <Button onPress={() => setFilter("venta")} color="warning" variant="solid" size="lg" className={`text-white font-semibold ${filter === "venta" ? "bg-primary-light" : ""}`}>
                        Venta
                    </Button>
                    <Button onPress={() => setFilter("renta")} color="warning" size="lg" variant="solid" className={`text-white font-semibold ${filter === "renta" ? "bg-primary-light" : ""}`}>
                        Renta
                    </Button>
                    <Input
                        placeholder="Buscar por nombre"
                        size="lg"
                        color="primary"
                        variant="bordered"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        classNames={{
                            label: "text-white hover:text-white group-data-[focus=true]:text-white",
                            inputWrapper: "text-white bg-white/20 backdrop-blur-none backdrop-filter backdrop-saturate-200",
                            input: "placeholder:text-white",
                        }}
                        className="text-white"
                        startContent={<IoMdSearch className="text-white size-6" />}
                    />
                </section>
            </header>

            <section
                className="grid grid-cols-2 md:grid-cols-3 gap-2 container mx-auto max-w-6xl overflow-y-auto"
                style={{
                    height: "calc(100vh - 64px - 100px)",
                }}
            >
                {filteredInmuebles && filteredInmuebles.map((inmueble) => (
                    <InmuebleCardAdmin key={inmueble.idInmueble} inmueble={inmueble} />
                ))}
            </section>
        </div>
    );
}
