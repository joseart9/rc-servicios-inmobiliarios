import { Controller } from "react-hook-form";
import { Input, Select, SelectItem, Checkbox, Chip, Button } from "@nextui-org/react";
import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import Servicios from "@/types/Servicios";
import Amenidades from "@/types/Amenidades";
import { v4 as uuidv4 } from "uuid";

export default function CaracteristicasForm({ control }: { control: any }) {
    const [amenidades, setAmenidades] = useState<string[]>([]);
    const [newAmenidad, setNewAmenidad] = useState<string>("");

    const [servicios, setServicios] = useState<string[]>([]);
    const [newServicio, setNewServicio] = useState<string>("");

    const antiguedadValues = [
        {
            label: "Nuevo",
            key: "nueva",
        },
        {
            label: "En construcción",
            key: "enConstruccion",
        },
        {
            label: "Usado",
            key: "usada",
        },
    ];

    const handleAddAmenidad = (amenidades: Amenidades[], setValue: any) => {
        if (newAmenidad.trim()) {
            const updatedAmenidades = [
                ...amenidades,
                { idAmenidad: uuidv4(), nombre: newAmenidad },
            ];
            setValue(updatedAmenidades);
            setNewAmenidad("");
        }
    };

    const handleAddServicio = (servicios: Servicios[], setValue: any) => {
        if (newServicio.trim()) {
            const updatedServicios = [
                ...servicios,
                { idServicio: uuidv4(), nombre: newServicio },
            ];
            setValue(updatedServicios);
            setNewServicio("");
        }
    };

    const handleDeleteAmenidad = (id: string, amenidades: Amenidades[], setValue: any) => {
        const updatedAmenidades = amenidades.filter((amenidad) => amenidad.idAmenidad !== id);
        setValue(updatedAmenidades);
    };

    const handleDeleteServicio = (id: string, servicios: Servicios[], setValue: any) => {
        const updatedServicios = servicios.filter((servicio) => servicio.idServicio !== id);
        setValue(updatedServicios);
    };


    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-accent/50 text-xl">Características</h3>
            <div className="flex flex-col gap-4 p-2">
                <div className="grid grid-cols-3 gap-2">
                    {/* Recámaras */}
                    <Controller
                        name="caracteristicas.recamaras"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Recámaras"
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            />
                        )}
                    />

                    {/* Medios Baños */}
                    <Controller
                        name="caracteristicas.medioBanos"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Medios Baños"
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            />
                        )}
                    />

                    {/* Baños Completos */}
                    <Controller
                        name="caracteristicas.banosCompletos"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Baños Completos"
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            />
                        )}
                    />

                    {/* Estacionamientos */}
                    <Controller
                        name="caracteristicas.estacionamientos"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Estacionamientos"
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            />
                        )}
                    />
                    {/* Niveles */}
                    <Controller
                        name="caracteristicas.niveles"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Niveles"
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            />
                        )}
                    />
                    {/* Mantenimiento */}
                    <Controller
                        name="caracteristicas.mantenimiento"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Mantenimiento"
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            />
                        )}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    {/* Antigüedad */}
                    <Controller
                        name="caracteristicas.antiguedad"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Antigüedad"
                                selectedKeys={[field.value]}
                                onSelectionChange={(selected) => field.onChange(Array.from(selected).join(""))}
                            >
                                {antiguedadValues.map((option) => (
                                    <SelectItem key={option.key} value={option.key}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />

                    {/* Tiempo de Antigüedad */}
                    <Controller
                        name="caracteristicas.antiguedadTiempo"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Antigüedad (Años)"
                                type="number"
                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            />
                        )}
                    />
                </div>

                <div className="flex flex-row gap-6">
                    {/* Mascotas */}
                    <Controller
                        name="caracteristicas.mascotas"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                isSelected={field.value}
                                onChange={(checked) => field.onChange(checked)}
                                color="warning"
                                className="text-white"
                            >
                                ¿Acepta Mascotas?
                            </Checkbox>
                        )}
                    />

                    {/* Privada */}
                    <Controller
                        name="caracteristicas.privada"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                isSelected={field.value}
                                onChange={(checked) => field.onChange(checked)}
                                color="warning"
                                className="text-white"
                            >
                                ¿Es una privada?
                            </Checkbox>
                        )}
                    />
                </div>

                <div className="divider" />
                <h3 className="text-accent/50 text-xl px-2">Amenidades</h3>
                <div className="flex min-w-full px-2">
                    <Controller
                        name="caracteristicas.amenidades"
                        control={control}
                        defaultValue={[] as Amenidades[]}
                        render={({ field }) => (
                            <div className="w-full">
                                <div className="flex flex-row w-full min-w-full items-center gap-2">
                                    <Input
                                        label="Agregar Amenidad"
                                        value={newAmenidad}
                                        onChange={(e) => setNewAmenidad(e.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                handleAddAmenidad(field.value, field.onChange);
                                            }
                                        }}
                                    />
                                    <Button onPress={(e) => handleAddAmenidad(field.value, field.onChange)} size="lg" isIconOnly color="warning" variant="solid" className="rounded-full">
                                        <IoAdd className="text-3xl text-white" />
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">

                                    {Array.isArray(field.value) && field.value.map((amenidad: Amenidades) => (
                                        <Chip
                                            key={amenidad.idAmenidad}
                                            variant="flat"
                                            color="primary"
                                            startContent={
                                                <IoIosRemoveCircleOutline
                                                    className="text-xl cursor-pointer"
                                                    onClick={() => handleDeleteAmenidad(amenidad.idAmenidad!, field.value, field.onChange)}
                                                />
                                            }
                                        >
                                            <p className="capitalize">{amenidad.nombre}</p>
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        )}
                    />
                </div>


                <div className="divider" />
                <h3 className="text-accent/50 text-xl px-2">Servicios</h3>
                <div className="flex min-w-full px-2">
                    <Controller
                        name="caracteristicas.servicios"
                        control={control}
                        defaultValue={[] as Servicios[]}
                        render={({ field }) => (
                            <div className="w-full">
                                <div className="flex flex-row w-full min-w-full items-center gap-2">
                                    <Input
                                        label="Agregar Servicio"
                                        value={newServicio}
                                        onChange={(e) => setNewServicio(e.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                handleAddServicio(field.value, field.onChange);
                                            }
                                        }}
                                    />
                                    <Button onPress={(e) => handleAddServicio(field.value, field.onChange)} size="lg" isIconOnly color="warning" variant="solid" className="rounded-full">
                                        <IoAdd className="text-3xl text-white" />
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">

                                    {Array.isArray(field.value) && field.value.map((servicio: Servicios) => (
                                        <Chip
                                            key={servicio.idServicio}
                                            variant="flat"
                                            color="primary"
                                            startContent={
                                                <IoIosRemoveCircleOutline
                                                    className="text-xl cursor-pointer"
                                                    onClick={() => handleDeleteServicio(servicio.idServicio, field.value, field.onChange)}
                                                />
                                            }
                                        >
                                            <p className="capitalize">{servicio.nombre}</p>
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div >
    );
}
