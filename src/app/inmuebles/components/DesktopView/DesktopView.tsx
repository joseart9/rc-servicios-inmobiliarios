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
import { useEffect, useMemo, useState } from "react";
import { FilterComponentProps } from "@/app/inmuebles/components/FilterComponent/FilterComponent";

import icons from "@/Icons";
import { Button } from "@nextui-org/button";
import { Tooltip, Menu, select } from "@nextui-org/react";
import { orderByField } from "@/server/actions/inmuebles";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";

import { BiSortAlt2 } from "react-icons/bi";

import FilterComponentSmall from "../FilterComponent/FilterComponentSmall";

export default function DesktopViewComponent({ type }: { type: string }) {
    const pathname = usePathname();
    const [filters, setFilters] = useState<FilterComponentProps[]>([]);
    const [orderBy, setOrderBy] = useState<string>("asc");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([""]));
    const [orderByFilter, setOrderByFilter] = useState<orderByField>();
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    useEffect(() => {
        if (selectedValue) {
            setOrderByFilter({
                field: selectedValue,
                direction: orderBy as "asc" | "desc",
            });
        } else {
            setOrderByFilter(undefined);
        }
    }, [orderBy, selectedValue]);

    const { inmuebles, loading, error } = useInmuebles({ filter: type, subFilter: filters });

    function handleOrdenar() {
        setOrderBy(orderBy === "asc" ? "desc" : "asc");
    }

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

    const orderByValues = [
        {
            key: "monto",
            value: "Precio"
        },
        {
            key: "recamaras",
            value: "Recamaras"
        }
    ]

    // Encontrar el texto legible para mostrar en el botón
    const selectedDisplayValue = useMemo(() => {
        const selectedItem = orderByValues.find(item => item.key === selectedValue);
        return selectedItem ? selectedItem.value : "";
    }, [selectedValue]);

    console.log(inmuebles);


    return (
        <section className="flex flex-col w-full py-4 gap-4 container mx-auto p-2">
            <div className="flex flex-col gap-6">
                <div className="flex flex-row justify-between px-2">
                    <BreadcrumbNavigation pathname={pathname} />
                    {inmuebles && inmuebles.length > 0 ? (
                        <p className="text-sm text-primary-dark/40">
                            Se encontraron {inmuebles.length} resultados
                        </p>
                    ) : (
                        <p className="text-sm text-primary-dark/40">
                            No se encontraron resultados
                        </p>
                    )}
                </div>
                <section className="flex w-full flex-row items-center px-12 justify-between">
                    <h1 className="uppercase text-primaryDark text-2xl font-semibold">
                        Inmuebles en {type}
                    </h1>
                    <div className="flex flex-row gap-1 items-center">
                        <Button className="text-md" variant="light" color="warning" size="md" startContent={
                            <BiSortAlt2 size={20} />
                        }>
                            Ordenar por
                        </Button>
                    </div>
                </section>
            </div>

            <div className="divider" />


            <section className={`grid grid-cols-12 gap-2 h-full w-full`}>
                {/* Filter Section */}
                <section className={`
                    ${isExpanded ? "lg:col-span-4 xl:col-span-3" : "lg:col-span-1 xl:col-span-1"}
                    `}>
                    <div className="sticky top-4">
                        {isExpanded ? (
                            <FilterComponent filters={filters} setFilters={setFilters} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        ) : (
                            <FilterComponentSmall isExpanded={isExpanded} setIsExpanded={setIsExpanded} filters={filters} />
                        )}

                    </div>
                </section>

                {/* Inmuebles Section */}
                <section className={` 
                ${isExpanded ? "lg:col-span-8 xl:col-span-9 grid-cols-2 xl:grid-cols-3" :
                        "lg:col-span-11 xl:col-span-11 grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"} 
                gap-3 gap-y-8 grid grid-flow-row `}
                >
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