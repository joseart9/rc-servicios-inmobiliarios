"use client";

import useScreenSize from "@/hooks/useScreenSize"
import DesktopView from "@/app/inmuebles/components/DesktopView";
import MobileView from "@/app/inmuebles/components/MobileView";

export default function InmueblesVenta() {
    const screenSize = useScreenSize();

    return (
        <>
            {screenSize === "desktop" && <DesktopView type="venta" />}
            {screenSize === "mobile" && <MobileView type="venta" />}
            {screenSize === "tablet" && <MobileView type="venta" />}
        </>
    )
}

