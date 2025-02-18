import SliderFilter from "./SliderFilter";

import { useState } from "react";

// Icons
import { FaDollarSign } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";


import icons from "@/Icons";
import { Button } from "@nextui-org/button";
import SelectFilter from "./SelectFilter";
import { Slider } from "@nextui-org/react";
import CheckboxFilter from "./CheckboxFilter";
import MultiSelectFilter from "./MultiSelectFilter";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

import { IoMdArrowRoundBack } from "react-icons/io";

export interface DefaultValues {
    type: string;
    min?: number;
    max?: number;
    filterKey: string;
    label?: string;
    icon?: any;
    step?: number;
    value?: any;
    selectOptions?: any[];
}

export interface FilterComponentProps {
    filterKey?: string;
    value?: any;
    type?: string;
}

export default function FilterComponent({ filters, setFilters, isExpanded, setIsExpanded, showArrow, closeDrawer, isMobile }: { filters: FilterComponentProps[], setFilters: Function; isExpanded: boolean; setIsExpanded: Function; showArrow?: string; closeDrawer?: any; isMobile?: boolean }) {

    const [mockFilters, setMockFilters] = useState<FilterComponentProps[]>([]);

    const defaultValues: DefaultValues[] = [
        {
            type: "slider",
            min: 0,
            max: 30000000,
            filterKey: "monto",
            label: "Precio",
            icon: icons.precio,
            step: 100000
        },
        {
            type: "slider",
            min: 1,
            max: 10,
            filterKey: "recamaras",
            label: "Recámaras",
            icon: icons.recamara,
            step: 1
        },
        {
            type: "slider",
            min: 1,
            max: 10,
            filterKey: "banosCompletos",
            label: "Baños",
            icon: icons.banosCompletos,
            step: 1
        },
        {
            type: "select",
            filterKey: "tipoInmueble",
            label: "Tipo de propiedad",
            icon: icons.casa,
            selectOptions: [
                { value: "casa", label: "Casa" },
                { value: "departamento", label: "Departamento" },
                { value: "terreno", label: "Terreno" },
                { value: "local", label: "Local" },
                { value: "otro", label: "Otros" },
            ]
        },
        {
            type: "slider",
            filterKey: "antiguedadTiempo",
            label: "Antigüedad",
            min: 0,
            max: 10,
            step: 1,
            icon: icons.antiguedad,
        },
        {
            type: "slider",
            filterKey: "estacionamientos",
            label: "Estacionamientos",
            min: 1,
            max: 10,
            step: 1,
            icon: icons.estacionamientos,
        },
        {
            type: "checkbox",
            filterKey: "privada",
            label: "Colonia Privada",
            value: false,
            icon: icons.casa,
        },
        {
            type: "checkbox",
            filterKey: "amueblado",
            label: "Amueblado",
            value: false,
            icon: icons.casa,
        },
        {
            type: "multiSelect",
            filterKey: "servicios",
            label: "Servicios",
            selectOptions: [
                { label: "Agua", value: "Agua" },
                { label: "Luz", value: "Luz" },
                { label: "Gas", value: "Gas" },
                { label: "Internet", value: "Internet" },
            ],
            icon: icons.casa,
        },
        {
            type: "multiSelect",
            filterKey: "amenidades",
            label: "Amenidades",
            selectOptions: [
                { label: "Alberca", value: "Alberca" },
                { label: "Jardín", value: "Jardín" },
                { label: "Estacionamiento", value: "Estacionamiento" },
                { label: "Gimnasio", value: "Gimnasio" },
            ],
            icon: icons.casa,
        },

    ];


    const handleSetFilters = () => {
        setFilters((prevFilters: FilterComponentProps[]) => {
            // Crear un mapa con los filtros actuales (prevFilters) por su filterKey
            const filterMap = new Map(
                prevFilters.map((filter) => [filter.filterKey, filter])
            );

            // Actualizar o agregar los filtros de mockFilters
            mockFilters.forEach((mockFilter) => {
                filterMap.set(mockFilter.filterKey, mockFilter);
            });

            // Convertir el mapa actualizado a un array y establecerlo como los nuevos filtros
            return Array.from(filterMap.values());
        });

        // Limpiar los filtros temporales
        setMockFilters([]);
    };

    return (
        <div className={`w-full bg-white rounded-lg ${isMobile ? "h-full" : "h-[550px]"} flex flex-col`}>
            {/* Header fijo */}
            <div className="flex flex-row justify-between items-center bg-primary-dark rounded-t-lg">
                <h3 className="text-white bg-primary-dark px-4 p-1 font-semibold text-xl rounded-t-lg">
                    Filtros
                </h3>
                {showArrow && (
                    <Button isIconOnly color="warning" variant="light" onPress={() => setIsExpanded(!isExpanded)}>
                        <IoMdArrowRoundBack className="font-black size-7 text-white" />
                    </Button>
                )}
            </div>


            {/* Contenedor scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <section className="flex flex-col p-3">
                    <SliderFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "monto")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <SliderFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "recamaras")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <SliderFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "banosCompletos")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <SliderFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "estacionamientos")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <SelectFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "tipoInmueble")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <SliderFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "antiguedadTiempo")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <CheckboxFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "privada")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <CheckboxFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "amueblado")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <MultiSelectFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "amenidades")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                    <div className="divider" />
                    <MultiSelectFilter
                        defaultValues={defaultValues.find((dv) => dv.filterKey === "servicios")!}
                        setFilters={setMockFilters}
                        filters={filters}
                        setFiltersDelete={setFilters}
                    />
                </section>
            </div>

            {/* Botón fijo */}
            <div className="relative flex w-full items-center justify-center py-4">
                {mockFilters.length > 0 ? (
                    <Button onPress={() => { handleSetFilters(); closeDrawer(); }} color="warning" className="text-white font-semibold w-full">
                        Aplicar
                    </Button>
                ) : (
                    <Button color="warning" isDisabled className="text-white font-semibold opacity-30 w-full">
                        Aplicar
                    </Button>
                )}
            </div>
        </div>
    )
}