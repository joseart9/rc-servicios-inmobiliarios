"use client";
import useScreenSize from "@/hooks/useScreenSize"
import HomePageDesktopView from "./components/HomePageDesktopView"
import HomePageMobileView from "./components/HomePageMobileView"

export default function HomePage() {
  const screenSize = useScreenSize()
  return (
    <>
      {screenSize === "desktop" ? (
        <HomePageDesktopView />
      ) : (
        <HomePageMobileView />
      )
      }
    </>
  )
}