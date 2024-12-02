'use client';

// Custom Imports
import InmuebleCard from "@/app/inmuebles/components/InmuebleCard";
// import inmuebles from "@/mock-data.json";
import Inmueble from "@/types/Inmueble";
import BreadcrumbNavigation from "@/app/inmuebles/components/BreadcrumbNavigation";
import FilterComponent from "@/app/inmuebles/components/FilterComponent";

import { usePathname } from 'next/navigation'

import useInmuebles from "@/hooks/useInmuebles";

import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";
import { FilterComponentProps } from "@/app/inmuebles/components/FilterComponent/FilterComponent";

import icons from "@/Icons";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";

export default function DesktopViewComponent({ type }: { type: string }) {
    const pathname = usePathname();
    const [filters, setFilters] = useState<FilterComponentProps[]>([]);

    const { inmuebles, loading, error } = useInmuebles({ filter: type, subFilter: filters });

    console.log("FILTROS ACTIVOS:", filters)

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <icons.sadFace className="w-12 h-12 text-primaryDark text-4xl" />
                <p className="text-primaryDark text-lg font-semibold mt-2">
                    Oh no! Algo salió mal
                </p>
            </div>
        )
    }


    return (
        <section className="flex flex-col w-full py-4 gap-7 container mx-auto p-2">
            <div className="flex flex-col gap-4">
                <div className="flex fles-row justify-between px-2">
                    <BreadcrumbNavigation pathname={pathname} />
                    {inmuebles && inmuebles.length > 0 ? (
                        <p className="text-sm text-primaryLight">
                            Se encontraron {inmuebles.length} resultados
                        </p>
                    ) : (
                        <p className="text-sm text-primaryLight">
                            No se encontraron resultados
                        </p>
                    )}
                </div>
                <section className="flex w-full flex-row items-center px-12 justify-between">
                    <h1 className="uppercase text-primaryDark text-2xl font-semibold">
                        Inmuebles en {type}
                    </h1>
                    <Tooltip content="Ordenar por" color="warning" className="text-white">
                        <Button isIconOnly color="warning" variant="light">
                            <icons.ordenar className="text-2xl text-primary-dark" />
                        </Button>
                    </Tooltip>

                </section>
            </div>
            <div className="lg:hidden">
                ads
            </div>

            <section className="grid grid-cols-12 gap-2 h-full w-full">
                {/* Filter Section */}
                <section className="lg:col-span-3 xl:col-span-2">
                    <FilterComponent filters={filters} setFilters={setFilters} />
                </section>

                {/* Inmuebles Section */}
                <section className="lg:col-span-9 xl:col-span-10 gap-3 gap-y-8 grid grid-flow-row grid-cols-2 xl:grid-cols-3">
                    {loading ? (
                        <div className="flex items-center justify-center col-span-12">
                            <Spinner color="warning" />
                        </div>
                    ) : <>
                        {inmuebles && inmuebles.map((inmueble, index) => (
                            <InmuebleCard key={index} inmueble={inmueble as unknown as Inmueble} />
                        ))}

                        {inmuebles && inmuebles.length === 0 && (
                            <div className="flex flex-col items-center justify-center col-span-12">
                                <icons.sadFace className="w-12 h-12 text-primaryDark text-4xl" />
                                <p className="text-primaryDark text-lg font-semibold">
                                    &nbsp; No se encontraron inmuebles.
                                </p>
                            </div>
                        )}
                    </>}


                </section>
            </section>
        </section>
    )
}