'use client';

// Custom Imports
import InmuebleCard from "@/app/inmuebles/components/InmuebleCard";
import Inmueble from "@/types/Inmueble";
import BreadcrumbNavigation from "@/app/inmuebles/components/BreadcrumbNavigation";
import FilterComponent from "@/app/inmuebles/components/FilterComponent";
import { usePathname } from 'next/navigation';

import useInmuebles from "@/hooks/useInmuebles";

import { Spinner } from "@nextui-org/spinner";
import { useEffect, useMemo, useState } from "react";
import { FilterComponentProps } from "@/app/inmuebles/components/FilterComponent/FilterComponent";

import icons from "@/Icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { orderByField } from "@/server/actions/inmuebles";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/react";

import type { Selection } from "@nextui-org/react";

import { BiSortAlt2 } from "react-icons/bi";
import FilterComponentSmall from "../FilterComponent/FilterComponentSmall";
import { IoIosSearch } from "react-icons/io";

export default function DesktopViewComponent({ type }: { type: string }) {
    const pathname = usePathname();

    const [filters, setFilters] = useState<FilterComponentProps[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([""])); // Campo a ordenar
    const [orderByFilter, setOrderByFilter] = useState<orderByField | undefined>();
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Recogemos los inmuebles de tu hook
    const { inmuebles, loading, error } = useInmuebles({ filter: type, subFilter: filters });

    // Esto obtiene el valor "key" del dropdown (ej. "monto" o "recamaras")
    const selectedValue = useMemo(
        () => (selectedKeys && selectedKeys !== "all" && selectedKeys.size ? Array.from(selectedKeys)[0] : ""),
        [selectedKeys]
    );

    const onSelectionChange = (keys: Selection) => {
        setSelectedKeys(keys); // para controlar qué se seleccionó a nivel de UI
        const selectedKey = Array.from(keys)[0];
        // Ejemplo: "monto_asc" / "monto_desc" / "recamaras_asc" / etc.

        const found = orderByValues.find((item) => item.key === selectedKey);
        if (!found) {
            // Si no está en la lista, no ordenamos nada
            setOrderByFilter(undefined);
            return;
        }

        // Con found.field y found.direction ya podemos setear el orderByFilter
        setOrderByFilter({
            field: found.field,
            direction: found.direction as "asc" | "desc",
        });
    };

    // Filtrado por searchTerm (nombre, título, etc.)
    const filteredInmuebles = useMemo(() => {
        if (!inmuebles) return [];
        if (!searchTerm.trim()) return inmuebles;

        return inmuebles.filter((inmueble) =>
            inmueble.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [inmuebles, searchTerm]);

    // Ordenar (si existe orderByFilter)
    const sortedInmuebles = useMemo(() => {
        const list = [...filteredInmuebles];
        if (!orderByFilter) return list;

        return list.sort((a, b) => {
            let fieldA: number | string | undefined;
            let fieldB: number | string | undefined;

            switch (orderByFilter.field) {
                case "nombre":
                    fieldA = a.nombre;
                    fieldB = b.nombre;
                    break;
                case "monto":
                    fieldA = a.precio?.monto;
                    fieldB = b.precio?.monto;
                    break;
                case "recamaras":
                    fieldA = a.caracteristicas?.recamaras;
                    fieldB = b.caracteristicas?.recamaras;
                    break;
                default:
                    return 0;
            }

            // Si uno está indefinido, no hacemos orden especial
            if (fieldA == null || fieldB == null) return 0;

            // Manejo asc/desc directo
            if (fieldA < fieldB) return orderByFilter.direction === "asc" ? -1 : 1;
            if (fieldA > fieldB) return orderByFilter.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredInmuebles, orderByFilter]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <icons.sadFace className="w-12 h-12 text-primaryDark text-4xl" />
                <p className="text-primaryDark text-lg font-semibold mt-2">
                    Oh no! Algo salió mal
                </p>
            </div>
        );
    }

    // Opciones disponibles para ordenar (key = propiedad del inmueble)
    const orderByValues = [
        {
            key: "monto_asc",
            field: "monto",      // campo real para el switch
            value: "Precio menor a mayor",
            direction: "asc"
        },
        {
            key: "monto_desc",
            field: "monto",
            value: "Precio mayor a menor",
            direction: "desc"
        },
        {
            key: "recamaras_asc",
            field: "recamaras",
            value: "Recámaras menor a mayor",
            direction: "asc"
        },
        {
            key: "recamaras_desc",
            field: "recamaras",
            value: "Recámaras mayor a menor",
            direction: "desc"
        }
    ];

    return (
        <section className="flex flex-col w-full py-4 gap-4 container mx-auto p-2">
            <div className="flex flex-col gap-6">
                <div className="flex flex-row justify-between px-2">
                    <BreadcrumbNavigation pathname={pathname} />
                    {sortedInmuebles.length > 0 ? (
                        <p className="text-sm text-primary-dark/40">
                            Se encontraron {sortedInmuebles.length} resultados
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

                    <div className="flex flex-row gap-2 items-center">
                        {/* Campo de Búsqueda */}
                        <Input
                            className="w-auto"
                            placeholder="Buscar por nombre"
                            variant="bordered"
                            color="primary"
                            size="md"
                            startContent={<IoIosSearch size={20} className="text-inherit" />}
                            classNames={{
                                input: "text-primary-dark",
                                mainWrapper: "border-primary-dark",
                                inputWrapper:
                                    "border-primary-dark data-[hover=true]:border-primary-dark data-[focus=true]:border-primary-dark group-data-[focus=true]:border-primary-dark/75 ",
                                innerWrapper: "text-foreground-500",
                            }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />

                        {/* Dropdown para escoger por cuál propiedad se va a ordenar */}
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="text-md w-auto text-primary-dark tracking-tight"
                                    variant="light"
                                    color="warning"
                                    size="md"
                                    startContent={<BiSortAlt2 size={20} className="text-primary-dark" />}
                                >
                                    {selectedValue
                                        ? `Ordenar por: ${orderByValues.find((item) => item.key === selectedValue)?.value || ""
                                        }`
                                        : "Ordenar por"}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={onSelectionChange}
                            >
                                {orderByValues.map((item) => (
                                    <DropdownItem key={item.key}>
                                        {item.value}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </section>
            </div>

            <div className="divider" />

            <section className="grid grid-cols-12 gap-2 h-full w-full">
                {/* Sección de Filtros */}
                <section
                    className={`${isExpanded ? "lg:col-span-4 xl:col-span-3" : "lg:col-span-1 xl:col-span-1"
                        }`}
                >
                    <div className="sticky top-4">
                        {isExpanded ? (
                            <FilterComponent
                                filters={filters}
                                setFilters={setFilters}
                                isExpanded={isExpanded}
                                setIsExpanded={setIsExpanded}
                            />
                        ) : (
                            <FilterComponentSmall
                                isExpanded={isExpanded}
                                setIsExpanded={setIsExpanded}
                                filters={filters}
                            />
                        )}
                    </div>
                </section>

                {/* Sección de Inmuebles */}
                <section
                    className={`${isExpanded
                        ? "lg:col-span-8 xl:col-span-9 grid-cols-2 xl:grid-cols-3"
                        : "lg:col-span-11 xl:col-span-11 grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
                        }
             gap-3 gap-y-8 grid grid-flow-row`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center col-span-12">
                            <Spinner color="warning" />
                        </div>
                    ) : (
                        <>
                            {sortedInmuebles.map((inmueble, index) => (
                                <InmuebleCard
                                    key={index}
                                    inmueble={inmueble as unknown as Inmueble}
                                />
                            ))}

                            {sortedInmuebles.length === 0 && (
                                <div className="flex flex-col items-center justify-center col-span-12">
                                    <icons.sadFace className="w-12 h-12 text-primaryDark text-4xl" />
                                    <p className="text-primaryDark text-lg font-semibold">
                                        &nbsp; No se encontraron inmuebles.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </section>
        </section>
    );
}
