import { Controller } from "react-hook-form";
import { Input, Select, SelectItem, Checkbox } from "@nextui-org/react";

// Helper para formatear números con comas
const formatNumberWithCommas = (value: number) =>
    value.toLocaleString("en-US", { maximumFractionDigits: 2 });

export default function PrecioForm({ control, watch }: { control: any; watch: any }) {
    const precioValues = [
        { label: "MXN", key: "MXN" },
        { label: "USD", key: "USD" },
    ];

    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-accent/50 text-xl">Valor</h3>
            <div className="flex flex-col gap-4 p-2">

                <div className="grid grid-cols-3 gap-2">
                    {/* Monto */}
                    <Controller
                        name="precio.monto"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Valor"
                                value={field.value ? formatNumberWithCommas(field.value) : ""}
                                onChange={(e) => {
                                    const rawValue = Number(e.target.value.replace(/,/g, ""));
                                    field.onChange(rawValue || 0);
                                }}
                                type="text"
                                className="col-span-2"
                            />
                        )}
                    />
                    {/* Moneda */}
                    <Controller
                        name="precio.moneda"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Moneda"
                                selectedKeys={[field.value]}
                                onSelectionChange={(selected) => field.onChange(Array.from(selected).join(""))}
                            >
                                {precioValues.map((option) => (
                                    <SelectItem key={option.key} value={option.key}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>
                {/* Incluye IVA */}
                <Controller
                    name="precio.incluyeIVA"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            isSelected={field.value}
                            onChange={(checked) => field.onChange(checked)}
                            className="text-white"
                            color="warning"
                        >
                            ¿Incluye IVA?
                        </Checkbox>
                    )}
                />

                <div className="grid grid-cols-3 gap-2">
                    {/* Monto Total (Condicional) */}
                    <Controller
                        name="precio.incluyeIVA"
                        control={control}
                        render={({ field }) =>
                            !field.value ? (
                                <>
                                    <Controller
                                        name="precio.iva"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="IVA (%)"
                                                value={field.value ? formatNumberWithCommas(field.value) : ""}
                                                onChange={(e) => {
                                                    const rawValue = Number(e.target.value.replace(/,/g, ""));
                                                    field.onChange(rawValue || 0);
                                                }}
                                                type="text"
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="precio.montoTotal"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Valor Total"
                                                value={field.value ? formatNumberWithCommas(field.value) : ""}
                                                onChange={(e) => {
                                                    const rawValue = Number(e.target.value.replace(/,/g, ""));
                                                    field.onChange(rawValue || 0);
                                                }}
                                                type="text"
                                                className="col-span-2"
                                            />
                                        )}
                                    />
                                </>
                            ) : <></>
                        }
                    />

                </div>
            </div>
        </div>
    );
}
