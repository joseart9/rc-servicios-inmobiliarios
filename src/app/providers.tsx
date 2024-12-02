'use client'

import { NextUIProvider } from '@nextui-org/react'
import { FavsProvider } from '@/globals/FavsProvider'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <FavsProvider>
                {children}
            </FavsProvider>
        </NextUIProvider>
    )
}