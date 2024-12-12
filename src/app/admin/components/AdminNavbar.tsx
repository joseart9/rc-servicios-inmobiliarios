"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { usePathname, useRouter } from 'next/navigation'
import FooterComponent from "@/app/components/FooterComponent";

export default function AdminNavbar({ children }: { children?: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter()

    function handleRoute(href: string, _: any) {
        router.push(href)
    }


    const menuItems = [
        {
            label: "Inmuebles",
            href: "/admin/inmuebles",
        },
        {
            label: "Agregar Inmueble",
            href: "/admin/new",
        }
    ];


    return (
        <section className="flex flex-col min-h-screen">
            <Navbar position="static" className="h-fit" classNames={{
                base: "bg-primary/5", // Adjust the color and opacity as needed
            }}>
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <p className="font-bold text-inherit">LOGO</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-2" justify="center">
                    <NavbarBrand>
                        <p className="font-bold text-inherit">LOGO</p>
                    </NavbarBrand>

                    {menuItems.map((item, index) => (
                        <NavbarItem key={`${item}-${index}`}>
                            <Button onPress={(_) => handleRoute(item.href, _)} size="md" variant={`${pathname === item.href ? "solid" : "light"}`} color={`${pathname === item.href ? "warning" : "warning"}`}
                                className={`font-semibold uppercase ${pathname === item.href ? "text-white" : "text-accent"}`}>
                                {item.label}
                            </Button>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="text-primary-dark text-xl font-semibold">
                        Bienvenido, Usuario
                    </NavbarItem>
                </NavbarContent>



                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                href={item.href}
                                size="lg"
                                color="foreground"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            <div className="flex-grow h-full w-full">
                {children}
            </div>
        </section>
    );
}
