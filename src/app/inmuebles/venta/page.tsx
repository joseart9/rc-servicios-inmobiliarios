"use client";

import useScreenSize from "@/hooks/useScreenSize"
import DesktopView from "@/app/inmuebles/components/DesktopView";

export default function InmueblesVenta() {
    const screenSize = useScreenSize();

    return (
        <>
            {screenSize === "desktop" && <DesktopView type="venta" />}
        </>
    )
}

