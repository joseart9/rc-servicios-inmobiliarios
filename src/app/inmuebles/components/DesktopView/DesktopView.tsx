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

export default function DesktopViewComponent({ type }: { type: string }) {
    const pathname = usePathname();
    const [filters, setFilters] = useState<FilterComponentProps[]>([]);
    const [orderBy, setOrderBy] = useState<string>("asc");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([""]));
    const [orderByFilter, setOrderByFilter] = useState<orderByField>();

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

    function handleDeleteOrder() {
        setOrderBy("");
        setSelectedKeys(new Set([""]));
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


    return (
        <section className="flex flex-col w-full py-4 gap-7 container mx-auto p-2">
            <div className="flex flex-col gap-4">
                <div className="flex fles-row justify-between px-2">
                    <BreadcrumbNavigation pathname={pathname} />
                    {inmuebles && inmuebles.length > 0 ? (
                        <p className="text-sm text-primary-dark/80">
                            Se encontraron {inmuebles.length} resultados
                        </p>
                    ) : (
                        <p className="text-sm text-primary-dark/80">
                            No se encontraron resultados
                        </p>
                    )}
                </div>
                <section className="flex w-full flex-row items-center px-12 justify-between">
                    <h1 className="uppercase text-primaryDark text-2xl font-semibold">
                        Inmuebles en {type}
                    </h1>
                    <div className="flex flex-row gap-1 items-center">
                        {selectedValue === "" && (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="light"
                                        className="capitalize text-xl"
                                        color="warning"
                                        startContent={
                                            <icons.ordenar className="text-2xl text-primaryDark" />
                                        }
                                        size="md"
                                        isIconOnly
                                    >
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={setSelectedKeys}
                                >
                                    {orderByValues.map((item) => (
                                        <DropdownItem key={item.key}>
                                            {item.value}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        )}

                        {selectedValue !== "" && (
                            <div className="flex flex-row gap-1">
                                {orderBy === "asc" ? (
                                    <Tooltip content="Ascendente" showArrow color="warning" className="text-white">
                                        <Button size="md" isIconOnly variant="light" color="warning" onClick={handleOrdenar} >
                                            <icons.sortUp className="text-xl text-primaryDark" />
                                        </Button>
                                    </Tooltip>
                                ) : (
                                    <Tooltip content="Descendente" showArrow color="warning" className="text-white">
                                        <Button size="md" isIconOnly variant="light" color="warning" onClick={handleOrdenar} >
                                            <icons.sortDown className="text-xl text-primaryDark" />
                                        </Button>
                                    </Tooltip>
                                )}
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="light"
                                            className="capitalize text-lg"
                                            color="warning"
                                            size="md"
                                        >
                                            {selectedDisplayValue}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Single selection example"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedKeys}
                                        onSelectionChange={setSelectedKeys}
                                    >
                                        {orderByValues.map((item) => (
                                            <DropdownItem key={item.key}>
                                                {item.value}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        )}

                        {selectedValue !== "" && (
                            <Tooltip content="Eliminar" showArrow color="warning" className="text-white">
                                <Button size="sm" isIconOnly variant="light" color="warning" onClick={handleDeleteOrder} >
                                    <icons.close className="text-md text-primaryDark" />
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </section>
            </div>

            <section className="grid grid-cols-12 gap-2 h-full w-full">
                {/* Filter Section */}
                <section className="lg:col-span-3 xl:col-span-2">
                    <div className="sticky top-4">
                        <FilterComponent filters={filters} setFilters={setFilters} />
                    </div>
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