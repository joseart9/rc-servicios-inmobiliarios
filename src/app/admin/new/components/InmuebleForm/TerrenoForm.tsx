import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";

export default function TerrenoForm({ control }: { control: any }) {
    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-accent/50 text-xl">Superficie</h3>
            <div className="flex flex-col gap-4 p-2">
                <div className="flex flex-row gap-2">
                    <Controller
                        name="terreno.superficieTotal"
                        control={control}
                        render={({ field }) => <Input label="Metros de Terreno" {...field} onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            type="number" />}
                    />
                    <Controller
                        name="terreno.superficieCubierta"
                        control={control}
                        render={({ field }) => <Input label="Metros de Construcción" {...field} onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            type="number" />}
                    />
                </div>
                <Controller
                    name="terreno.terreno"
                    control={control}
                    render={({ field }) => <Input
                        label="Superficie"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        type="number"
                    />}
                />
            </div>
        </div>
    );
}
