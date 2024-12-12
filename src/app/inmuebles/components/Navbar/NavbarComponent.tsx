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
import menuItems from "./MenuItems";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from "react-icons/io";
import FooterComponent from "@/app/components/FooterComponent";
import DrawerComponent from "@/app/inmuebles/components/Navbar/DrawerComponent";
import { Tooltip } from "@nextui-org/react";

import { useState } from "react";


import icons from "@/Icons";
import { useFavs } from "@/globals/FavsProvider";

export default function NavbarComponent({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter()
  const { favs } = useFavs();

  const [isOpen, setIsOpen] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Opcionalmente muestra un loader.
  }

  function handleRoute(href: string, _: any) {
    router.push(href)
  }

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const favIds = favs.map((fav) => fav.id);

  // Verifica si el pathname actual coincide con alguna ruta en menuItems
  const isValidPath = menuItems.some((item) => item.href === pathname);

  // Si el pathname no es válido, no renderiza el componente
  if (!isValidPath) {
    return (
      <section className="flex flex-col min-h-screen">
        <Navbar isBlurred={true} className="h-fit bg-primary/5" shouldHideOnScroll classNames={{
          base: "bg-white",
        }}>

          <NavbarItem>
            <Button onPress={(_) => router.back()} isIconOnly className="bg-transparent" variant="light">
              <IoMdArrowRoundBack className="text-3xl text-accent" />
            </Button>
          </NavbarItem>
          <NavbarContent justify="start">
            <NavbarBrand>
              <p className="font-bold text-inherit">LOGO</p>
            </NavbarBrand>

          </NavbarContent>
        </Navbar>
        <div className="flex-grow h-full w-full">
          {children}
        </div>
        <FooterComponent />
      </section>
    )
  }

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar isBlurred={true} className="h-fit bg-primary/5" position="static" classNames={{
        base: "bg-white",
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
              <Button onPress={(_) => handleRoute(item.href, _)} radius="sm" size="md" variant={`${pathname === item.href ? "solid" : "light"}`} color={`${pathname === item.href ? "warning" : "warning"}`}
                className={`font-semibold uppercase ${pathname === item.href ? "text-white" : "text-accent"}`}>
                {item.label}
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Tooltip showArrow color="warning" className="text-white" content="Favoritos">
              <Button isIconOnly onPress={toggleDrawer} className="bg-transparent" variant="light" color="warning" href="#">
                <icons.favoritoDesactivado className="text-2xl text-primary-dark" />
              </Button>
            </Tooltip>
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

      <FooterComponent />

      <DrawerComponent isOpen={isOpen} toggleDrawer={toggleDrawer} favs={favIds} />
    </section>
  );
}
