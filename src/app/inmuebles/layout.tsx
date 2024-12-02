import { ReactNode } from "react";
import InmueblesNavbar from "./components/Navbar";

export default function InmueblesLayout({ children }: { children: ReactNode }) {
    return (
        <InmueblesNavbar>
            {children}
        </InmueblesNavbar>
    );
}