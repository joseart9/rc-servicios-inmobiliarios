"use client";

import AddInmuebleForm from "@/app/admin/new/components/InmuebleForm/InmuebleForm";
import Inmueble from "@/types/Inmueble";
import { useForm } from "react-hook-form";
import defaultValues from "@/app/admin/new/components/InmuebleForm/defaultValues";
import InmuebleCardPreview from "./components/InmuebleCardPreview/InmuebleCardPreview";
import { useState } from "react";
import { ImageUploadProps } from "@/app/admin/components/ImageUpload";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip } from "@nextui-org/react";

export default function NewInmueble() {

    const { control, handleSubmit, watch, setValue } = useForm<Inmueble>({ defaultValues });
    const [images, setImages] = useState<ImageUploadProps[]>([]);

    return (
        <main className="min-h-screen flex flex-col gap-4 p-4">

            <section className="grid grid-cols-3 gap-2">
                <div className="w-full h-full bg-white col-span-2 rounded-lg">
                    <h3 className="text-xl bg-accent text-white p-2 px-4 rounded-t-lg font-semibold">
                        Registrar Nuevo Inmueble
                    </h3>
                    <div className="p-6">
                        <AddInmuebleForm images={images} setImages={setImages} control={control} handleSubmit={handleSubmit} watch={watch} setValue={setValue} />
                    </div>
                </div>

                <div className="w-full h-fit rounded-md sticky top-4">
                    <div className="flex flex-row items-center justify-between bg-accent text-white p-2 px-4 rounded-t-lg">
                        <h3 className="text-xl font-semibold">Vista Previa</h3>
                        <Tooltip className="text-white" content="La primera imagen es la que se mostrara en la tarjeta." showArrow color="warning">
                            <IoIosInformationCircleOutline className="text-2xl text-white" />
                        </Tooltip>
                    </div>

                    <InmuebleCardPreview images={images} inmueble={watch()} />
                </div>
            </section>
        </main>
    );
}