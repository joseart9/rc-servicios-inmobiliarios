"use client";

// Custom Imports
import InmuebleCardMobile from "@/app/inmuebles/components/InmuebleCardMobile";
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
import { Divider, Input, Spacer } from "@nextui-org/react";
import { orderByField } from "@/server/actions/inmuebles";
import { IoClose } from "react-icons/io5";

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
import { BsFilterLeft } from "react-icons/bs";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export default function MobileView({ type }: { type: string }) {
    const pathname = usePathname();

    const [filters, setFilters] = useState<FilterComponentProps[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([""]));
    const [orderByFilter, setOrderByFilter] = useState<orderByField | undefined>();
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

    const toggleFilterDrawer = () => setIsFilterDrawerOpen(!isFilterDrawerOpen);

    const { inmuebles, loading, error } = useInmuebles({ filter: type, subFilter: filters });

    const selectedValue = useMemo(
        () => (selectedKeys && selectedKeys !== "all" && selectedKeys.size ? Array.from(selectedKeys)[0] : ""),
        [selectedKeys]
    );

    const onSelectionChange = (keys: Selection) => {
        setSelectedKeys(keys);
        const selectedKey = Array.from(keys)[0];

        const found = orderByValues.find((item) => item.key === selectedKey);
        if (!found) {
            setOrderByFilter(undefined);
            return;
        }

        setOrderByFilter({
            field: found.field,
            direction: found.direction as "asc" | "desc",
        });
    };

    const filteredInmuebles = useMemo(() => {
        if (!inmuebles) return [];
        if (!searchTerm.trim()) return inmuebles;

        return inmuebles.filter((inmueble) =>
            inmueble.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [inmuebles, searchTerm]);

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

            if (fieldA == null || fieldB == null) return 0;

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

    const orderByValues = [
        {
            key: "monto_asc",
            field: "monto",
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
            <div className="flex flex-col">
                <div className="flex flex-col space-y-4 justify-between">
                    <BreadcrumbNavigation pathname={pathname} />
                </div>

                <Spacer y={4} />

                <section className="flex w-full flex-col space-y-4">
                    <h1 className="uppercase text-primaryDark text-2xl font-semibold">
                        Inmuebles en {type}
                    </h1>

                    <div className="flex flex-row justify-between items-center">
                        <Input
                            className="w-fit"
                            placeholder="Buscar por nombre"
                            variant="bordered"
                            color="primary"
                            size="lg"
                            startContent={<IoIosSearch size={20} className="text-inherit" />}
                            classNames={{
                                input: "text-primary-dark",
                                mainWrapper: "border-primary-dark",
                                inputWrapper: "border-primary-dark",
                                innerWrapper: "text-foreground-500",
                            }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                        <Button onClick={toggleFilterDrawer} variant="light" color="warning" size="lg" className="text-md w-auto text-primary-dark tracking-tight text-semibold" startContent={
                            <BsFilterLeft size={20} className="text-primary-dark" />
                        }>
                            Filtrar
                        </Button>
                    </div>
                    {/* Dropdown para escoger por cuál propiedad se va a ordenar */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="text-md w-fit text-primary-dark tracking-tight"
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
                </section>
            </div>
            <Divider />

            <Drawer
                open={isFilterDrawerOpen}
                onClose={toggleFilterDrawer}
                direction="right"
                size="100vw"
                lockBackgroundScroll={true}
            >
                <div className="p-4 h-svh flex flex-col overflow-y-clip">
                    {/* Botón de cierre */}
                    <div className="flex justify-end pb-4">
                        <Button disableRipple isIconOnly onClick={toggleFilterDrawer} variant="light" color="default" className="text-primary-dark">
                            <IoClose className="size-8" />
                        </Button>
                    </div>

                    {/* Contenedor flexible que ocupa el espacio restante */}
                    <div className="flex-1 overflow-y-auto">
                        <FilterComponent
                            filters={filters}
                            setFilters={setFilters}
                            isExpanded={true}
                            setIsExpanded={setIsExpanded}
                            closeDrawer={toggleFilterDrawer}
                            isMobile={true}
                        />
                    </div>
                </div>
            </Drawer>


            <section className="flex flex-col space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center col-span-12">
                        <Spinner color="warning" />
                    </div>
                ) : (
                    <>
                        {sortedInmuebles.map((inmueble, index) => (
                            <InmuebleCardMobile key={index} inmueble={inmueble as unknown as Inmueble} />
                        ))}
                    </>
                )}
            </section>
        </section>
    )
}
