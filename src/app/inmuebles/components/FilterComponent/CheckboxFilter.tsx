import { Checkbox, Button } from "@nextui-org/react";
import { useState } from "react";
import { DefaultValues, FilterComponentProps } from "./FilterComponent";

import icons from "@/Icons";

export default function CheckboxFilter({
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
    const [isChecked, setIsChecked] = useState<boolean>(defaultValues.value || false);

    const handleCheckboxChange = (newValue: boolean) => {
        setIsChecked(newValue);

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

        // Reset checkbox state
        setIsChecked(false);
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

            <Checkbox
                isSelected={isChecked}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                color="warning"
                size="md"
                className="text-white"
            >
                {defaultValues.label}
            </Checkbox>
        </div>
    );
}
