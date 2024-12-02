"use client";

// Custom Imports
import DireccionForm from "./DireccionForm";
import InfoGeneralForm from "./InfoGeneralForm";
import TerrenoForm from "./TerrenoForm";
import PrecioForm from "./PrecioForm";
import CaracteristicasForm from "./CaracteristicasForm";
import ImageUpload from "@/app/admin/components/ImageUpload";
import { uploadImagesToImgBB } from "@/utils/uploadImageToImgBB";
import { addInmueble } from "@/server/actions/inmuebles";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddInmuebleForm({ control, handleSubmit, watch, setValue, images, setImages }: any) {

    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        try {
            // Subir imágenes a ImgBB
            const uploadedImages = await uploadImagesToImgBB(images);

            // Actualizar los campos en react-hook-form
            setValue("imagenes", uploadedImages);
            setValue("idInmueble", uuidv4());
            setValue("createdAt", new Date());

            // Llama a handleSubmit nuevamente para obtener los datos actualizados
            handleSubmit(async (finalData: any) => {
                try {
                    await addInmueble(finalData);
                    console.log("Inmueble guardado exitosamente:", finalData);
                } catch (error) {
                    console.error("Error al guardar el inmueble:", error);
                } finally {
                    setLoading(false);
                }
            })();
        } catch (error) {
            console.error("Error durante la subida de imágenes o actualización del formulario:", error);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
            {/* Subcomponentes del formulario */}
            <InfoGeneralForm control={control} />
            <PrecioForm watch={watch} control={control} />
            <DireccionForm control={control} />
            <TerrenoForm control={control} />
            <CaracteristicasForm control={control} />
            <div className="flex flex-col w-full bg-white rounded-lg p-2 overflow-x-auto">
                <h3 className="text-accent/50 text-xl">Imágenes</h3>
                <div className="divider" />
                <ImageUpload images={images} setImages={setImages} />
            </div>
            <div className="flex w-full justify-end">
                <Button isLoading={loading} type="submit" className="text-white w-fit" variant="solid" color="warning">
                    Guardar
                </Button>
            </div>
        </form>
    );
}
