import { Button, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DefaultValues, FilterComponentProps } from "./FilterComponent";

import icons from "@/Icons";

export default function MultiSelectFilter({
    defaultValues,
    setFilters,
    filters,
    setFiltersDelete,
}: {
    defaultValues: DefaultValues;
    setFilters: any;
    filters?: FilterComponentProps[];
    setFiltersDelete: any;
}) {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultValues.value || []);

    useEffect(() => {
        // Verifica si el filtro existe en filters
        const existingFilter = filters?.find(filter => filter.filterKey === defaultValues.filterKey);

        if (existingFilter) {
            setSelectedKeys(existingFilter.value);
        } else {
            setSelectedKeys(defaultValues.value || []);
        }
    }, [filters, defaultValues.filterKey, defaultValues.min, defaultValues.max]);

    const handleChipToggle = (key: string) => {
        const isSelected = selectedKeys.includes(key);

        const updatedKeys = isSelected
            ? selectedKeys.filter((k) => k !== key) // Deselecciona
            : [...selectedKeys, key]; // Selecciona

        setSelectedKeys(updatedKeys);

        setFilters((prevFilters: any[]) => {
            const updatedFilters = prevFilters.filter(
                (filter) => filter.filterKey !== defaultValues.filterKey
            );
            return [
                ...updatedFilters,
                { filterKey: defaultValues.filterKey, type: defaultValues.type, value: updatedKeys },
            ];
        });
    };

    const handleRemoveFilter = () => {
        setFiltersDelete((prevFilters: any[]) =>
            prevFilters.filter((filter) => filter.filterKey !== defaultValues.filterKey)
        );

        // Reset chip selection
        setSelectedKeys([]);
    };

    return (
        <div className="flex flex-col gap-1 align-middle">
            <div className="flex flex-row w-full justify-between items-center">
                <h3 className="text-primary-dark uppercase font-bold">
                    {defaultValues.label}
                </h3>
                <Button
                    color="warning"
                    size="sm"
                    isIconOnly
                    onPress={handleRemoveFilter}
                    radius="full"
                    className={`bg-transparent p-0 m-0 ${filters &&
                        filters.find(
                            (filter: FilterComponentProps) =>
                                filter.filterKey === defaultValues.filterKey
                        )
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                        }`}
                >
                    <icons.close className="text-primary-dark text-xl" />
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {defaultValues.selectOptions?.map((option) => (
                    <Chip
                        key={option.value}
                        onClick={() => handleChipToggle(option.value)}
                        color={selectedKeys.includes(option.value) ? "warning" : "default"}
                        className={`cursor-pointer ${selectedKeys.includes(option.value) ? "bg-warning text-white" : ""
                            }`}
                    >
                        {option.label}
                    </Chip>
                ))}
            </div>
        </div>
    );
}
