import { Slider, SliderValue, Button } from "@nextui-org/react";
import { useState } from "react";
import { DefaultValues, FilterComponentProps } from "./FilterComponent";

import icons from "@/Icons";

export default function SliderFilter({ defaultValues, setFilters, filters, setFiltersDelete }: { defaultValues: DefaultValues, setFilters: any, filters?: FilterComponentProps[], setFiltersDelete: any }) {
    const [value, setValue] = useState<SliderValue>([defaultValues.min, defaultValues.max]);

    const handleSliderChange = (newValue: SliderValue) => {
        setValue(newValue);

        setFilters((prevFilters: any[]) => {
            const updatedFilters = prevFilters.filter(filter => filter.filterKey !== defaultValues.filterKey);
            return [
                ...updatedFilters,
                { filterKey: defaultValues.filterKey, type: defaultValues.type, value: newValue }
            ];
        });
    };

    const handleRemoveFilter = () => {
        setFiltersDelete((prevFilters: any[]) =>
            prevFilters.filter(filter => filter.filterKey !== defaultValues.filterKey)
        );

        // Reset slider value
        setValue([defaultValues.min, defaultValues.max]);
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
                    className={`bg-transparent p-0 m-0 ${filters && filters.find((filter: FilterComponentProps) => filter.filterKey === defaultValues.filterKey) ? "opacity-100 visible" : "opacity-0 invisible"}`}
                >
                    <icons.close className="text-primary-dark text-xl" />
                </Button>
            </div>

            <div className="flex flex-row items-center">
                <span className="inline-block mr-2 text-primary-dark text-2xl"> <defaultValues.icon /></span>

                <Slider
                    label="Precio"
                    formatOptions={{ currency: "USD", maximumFractionDigits: 0, compactDisplay: "short" }}
                    step={defaultValues.step}
                    maxValue={defaultValues.max}
                    minValue={defaultValues.min}
                    value={value}
                    onChange={handleSliderChange}
                    className="max-w-md text-primary-dark font-semibold uppercase"
                    color="warning"
                    renderLabel={() => ""}
                />
            </div>
        </div>
    );
}
