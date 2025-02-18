"use client";
import useScreenSize from "@/hooks/useScreenSize"
import DesktopView from "@/app/inmuebles/components/DesktopView";
import MobileView from "@/app/inmuebles/components/MobileView";

export default function InmueblesRenta() {
    const screenSize = useScreenSize();

    return (
        <section className="w-full h-full">
            {screenSize === "desktop" && <DesktopView type="renta" />}
            {screenSize === "mobile" && <MobileView type="renta" />}
            {screenSize === "tablet" && <MobileView type="renta" />}
        </section>
    )
}