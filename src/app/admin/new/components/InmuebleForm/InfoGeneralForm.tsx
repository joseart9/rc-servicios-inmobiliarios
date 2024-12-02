import { Controller } from "react-hook-form";
import { Checkbox, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

export default function InfoGeneralForm({ control }: { control: any }) {
    const tipoInmuebleValues = [
        {
            value: "casa",
            label: "Casa",
        },
        {
            value: "departamento",
            label: "Departamento",
        },
        {
            value: "terreno",
            label: "Terreno",
        },
        {
            value: "local",
            label: "Local",
        },
        {
            value: "oficina",
            label: "Oficina",
        },
        {
            value: "bodega",
            label: "Bodega",
        },
        {
            value: "edificio",
            label: "Edificio",
        },
        {
            value: "otro",
            label: "Otro",
        },
    ]

    const tipoOperacionValues = [
        {
            value: "venta",
            label: "Venta",
        },
        {
            value: "renta",
            label: "Renta",
        },
    ]
    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-accent/50 text-xl">Información General</h3>
            <div className="flex flex-col gap-4 p-2">
                <Controller
                    name="nombre"
                    control={control}
                    render={({ field }) => (
                        <Input label="Nombre" {...field} isRequired required />
                    )}
                />
                <Controller
                    name="descripcion"
                    control={control}
                    render={({ field }) => (
                        <Textarea label="Descripción" {...field} isRequired required />
                    )}
                />

                <div className="flex flex-row gap-2">
                    <Controller
                        name="tipoInmueble"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Tipo de Inmueble"
                                selectedKeys={[field.value]}
                                onSelectionChange={(selected) => field.onChange(Array.from(selected).join(""))}
                                isRequired
                                required
                            >
                                {tipoInmuebleValues.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                    <Controller
                        name="tipoOperacion"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Tipo de Operación"
                                selectedKeys={[field.value]}
                                onSelectionChange={(selected) => field.onChange(Array.from(selected).join(""))}
                                isRequired
                                required
                            >
                                {tipoOperacionValues.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>
                <Controller
                    name="amueblado"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            isSelected={field.value}
                            onChange={(checked) => field.onChange(checked)}
                            className="text-white"
                            color="warning"
                        >
                            Amueblado
                        </Checkbox>
                    )}
                />
            </div>
        </div>
    );
}
