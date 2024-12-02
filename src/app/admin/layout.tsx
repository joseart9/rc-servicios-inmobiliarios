import { ReactNode } from "react";
import AdminNavbar from "./components/AdminNavbar";

export default function InmueblesLayout({ children }: { children: ReactNode }) {
    return (
        <AdminNavbar>
            {children}
        </AdminNavbar>
    );
}