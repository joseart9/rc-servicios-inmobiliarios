import SliderFilter from "./SliderFilter";

import { useState } from "react";

// Icons
import { FaDollarSign } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";

import icons from "@/Icons";
import { Button } from "@nextui-org/button";

export interface DefaultValues {
    type: string;
    min: number;
    max: number;
    filterKey: string;
    label?: string;
    icon?: any;
    step?: number;
}

export interface FilterComponentProps {
    filterKey?: string;
    value?: any;
    type?: string;
}

export default function FilterComponent({ filters, setFilters }: { filters: FilterComponentProps[], setFilters: Function }) {

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
            min: 0,
            max: 10,
            filterKey: "recamaras",
            label: "Recámaras",
            icon: icons.recamara,
            step: 1
        }
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
        <div className="w-full h-fit bg-white rounded-lg overflow-y-auto">
            <h3 className="text-white bg-primary-dark px-4 p-1 font-semibold text-lg rounded-t-lg">
                Filtros
            </h3>
            <div className="flex flex-col h-full justify-between">
                <section className="flex flex-col p-3">
                    <SliderFilter defaultValues={defaultValues.find(dv => dv.filterKey === "monto")!} setFilters={setMockFilters} filters={filters} setFiltersDelete={setFilters} />
                    <div className="divider" />
                    <SliderFilter defaultValues={defaultValues.find(dv => dv.filterKey === "recamaras")!} setFilters={setMockFilters} filters={filters} setFiltersDelete={setFilters} />
                </section>
                <div className="flex w-full items-center justify-center py-4">
                    {mockFilters.length > 0 && (
                        <Button onPress={handleSetFilters} color="warning" className="text-white font-semibold">
                            Filtrar
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}


// const filters = [
//     { key: "precio", label: "Precio", defaultValue: [1, 30000000], type: "range" },
//     { key: "tipoPropiedad", label: "Casas", defaultValue: "casa", type: "property" },
//     { key: "tipoPropiedad", label: "Departamentos", defaultValue: "departamento", type: "property" },
//     { key: "tipoPropiedad", label: "Otros", defaultValue: "otro", type: "property" },
// ];