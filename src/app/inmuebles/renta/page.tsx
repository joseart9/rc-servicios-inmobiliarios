"use client";
import useScreenSize from "@/hooks/useScreenSize"
import DesktopView from "@/app/inmuebles/components/DesktopView";

export default function InmueblesRenta() {
    const screenSize = useScreenSize();

    return (
        <section className="w-full h-full">
            {screenSize === "desktop" && <DesktopView type="renta" />}
        </section>
    )
}