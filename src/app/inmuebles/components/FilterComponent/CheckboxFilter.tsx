import { Checkbox, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
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
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        const existingFilter = filters?.find(filter => filter.filterKey === defaultValues.filterKey);
        if (existingFilter) {
            setIsChecked(existingFilter.value);
        } else {
            setIsChecked(defaultValues.value || false);
        }
    }, [filters, defaultValues.filterKey, defaultValues.value]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setIsChecked(newValue);

        // Actualiza los filtros solo cuando sea necesario
        if (newValue) {
            setFilters((prevFilters: any[]) => [
                ...prevFilters.filter(filter => filter.filterKey !== defaultValues.filterKey),
                { filterKey: defaultValues.filterKey, type: defaultValues.type, value: newValue },
            ]);
        } else {
            handleRemoveFilter();
        }
    };

    const handleRemoveFilter = () => {
        // Asegúrate de no actualizar el estado del padre mientras estás renderizando
        setTimeout(() => {
            setFiltersDelete((prevFilters: any[]) =>
                prevFilters.filter(filter => filter.filterKey !== defaultValues.filterKey)
            );
        }, 0);

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
                onChange={(e) => handleCheckboxChange(e)}
                color="warning"
                size="md"
                className="text-white"
            >
                {defaultValues.label}
            </Checkbox>
        </div>
    );
}
