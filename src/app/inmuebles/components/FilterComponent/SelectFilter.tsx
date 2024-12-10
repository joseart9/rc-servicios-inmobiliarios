import React, { useState } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { DefaultValues, FilterComponentProps } from "./FilterComponent";

import icons from "@/Icons";

export default function SelectFilter({
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
    const [selectedValue, setSelectedValue] = useState<string>(defaultValues.value || "");

    const handleSelectionChange = (newValue: string) => {
        setSelectedValue(newValue);

        setFilters((prevFilters: any[]) => {
            const updatedFilters = prevFilters.filter(
                (filter) => filter.filterKey !== defaultValues.filterKey
            );
            return [
                ...updatedFilters,
                { filterKey: defaultValues.filterKey, type: defaultValues.type, value: newValue },
            ];
        });
    };

    const handleRemoveFilter = () => {
        setFiltersDelete((prevFilters: any[]) =>
            prevFilters.filter((filter) => filter.filterKey !== defaultValues.filterKey)
        );

        // Reset selected value
        setSelectedValue("");
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

            <div className="flex flex-row items-center">
                <span className="inline-block mr-2 text-primary-dark text-2xl"> <defaultValues.icon /></span>

                <Select
                    placeholder="Selecciona una opción"
                    selectedKeys={new Set([selectedValue])}
                    onSelectionChange={(keys) => handleSelectionChange([...keys][0] as string)}
                    className="max-w-xs text-primary-dark font-semibold"
                    color="warning"
                >
                    {(defaultValues.selectOptions || []).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}
