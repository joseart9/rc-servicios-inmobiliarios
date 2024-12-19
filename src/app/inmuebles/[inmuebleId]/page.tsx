"use client";

import { use } from "react";

import useScreenSize from "@/hooks/useScreenSize";
import DesktopViewInmuebleShowcase from "./components/DesktopViewInmuebleShowcase";
import useInmueble from "@/hooks/useInmueble";
import { Spinner } from "@nextui-org/spinner";

export default function InmuebleIdPage({
    params,
}: {
    params: Promise<{ inmuebleId: string }>;
}) {
    const { inmuebleId: inmuebleId } = use(params);
    const screenSize = useScreenSize();

    const { inmueble, loading, error } = useInmueble(inmuebleId);

    if (loading) {
        return (
            <div className="flex w-screen h-screen items-center justify-center">
                <Spinner color="warning" size="lg" />
            </div>
        );
    }

    return (
        <>
            <section className="w-full h-full">
                {screenSize === "desktop" && <DesktopViewInmuebleShowcase inmueble={inmueble!} loading={loading} />}
            </section>
        </>
    );
}