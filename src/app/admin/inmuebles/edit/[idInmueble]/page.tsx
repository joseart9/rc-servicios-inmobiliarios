"use client";

import { use, useEffect, useState } from "react";
import { getInmueble } from "@/server/actions/inmuebles";
import Inmueble from "@/types/Inmueble";

import { useForm } from "react-hook-form";
import EditInmuebleForm from "@/app/admin/new/components/InmuebleForm/EditInmuebleForm";
import defaultValues from "@/app/admin/new/components/InmuebleForm/defaultValues";
import { ImageUploadProps } from "@/utils/uploadImageToImgBB";
import { Spinner } from "@nextui-org/react";

export default function EdtitInmueble({
    params,
}: {
    params: Promise<{ idInmueble: string }>;
}) {
    const { idInmueble: inmuebleId } = use(params);
    const [inmueble, setInmueble] = useState<Inmueble>();
    const [images, setImages] = useState<ImageUploadProps[] | undefined>([]);
    const { control, handleSubmit, watch, setValue, reset } = useForm<Inmueble>({ defaultValues });
    const [loadingInmueble, setLoadingInmueble] = useState(true);

    useEffect(() => {
        const fetchInmueble = async () => {
            try {
                const inmueble = await getInmueble(inmuebleId);
                if (inmueble) {
                    setInmueble(inmueble);
                    setLoadingInmueble(false);
                }
            } catch (error) {
                console.error(error);
                setLoadingInmueble(false);
            }
        };

        fetchInmueble();
    }, []);

    useEffect(() => {
        if (inmueble) {
            reset(inmueble);
            setImages(inmueble.imagenes);
            setLoadingInmueble(false);
        }
    }, [inmueble]);

    if (loadingInmueble) return (
        <div className="flex flex-col h-screen items-center justify-center gap-8">
            <h1 className="text-2xl font-semibold text-primary-dark">Cargando...</h1>
            <Spinner color="warning" size="lg" />
        </div>
    )

    return (
        <section className="p-4">
            <h3 className="text-xl bg-accent text-white p-2 px-4 rounded-t-lg font-semibold">
                Editar Inmueble
            </h3>
            <div className="p-6 bg-white">
                {inmueble && <EditInmuebleForm images={images} setImages={setImages} control={control} handleSubmit={handleSubmit} watch={watch} setValue={setValue} inmueble={inmueble} />}
            </div>

        </section>
    );
}