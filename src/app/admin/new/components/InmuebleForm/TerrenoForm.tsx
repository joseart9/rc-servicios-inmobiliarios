import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";

export default function TerrenoForm({ control }: { control: any }) {
    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-accent/50 text-xl">Terreno</h3>
            <div className="flex flex-col gap-4 p-2">
                <div className="flex flex-row gap-2">
                    <Controller
                        name="terreno.superficieTotal"
                        control={control}
                        render={({ field }) => <Input label="Superficie Total" {...field} onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            type="number" isRequired required />}
                    />
                    <Controller
                        name="terreno.superficieCubierta"
                        control={control}
                        render={({ field }) => <Input label="Superficie Cubierta" {...field} onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            type="number" isRequired required />}
                    />
                </div>
                <Controller
                    name="terreno.terreno"
                    control={control}
                    render={({ field }) => <Input
                        label="Terreno"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        type="number"
                    />}
                />
            </div>
        </div>
    );
}
