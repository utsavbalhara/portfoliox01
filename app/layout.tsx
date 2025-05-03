import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Outfit } from "next/font/google"
import { Syne } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import SvgFilters from "@/components/svg-filters"
import LoadingScreen from "@/components/loading-screen"
import { Toaster } from "@/components/ui/toaster"
import { HoverProvider } from "@/context/HoverContext"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })

export const metadata: Metadata = {
  title: "Aryaman Jaiswal | Developer Portfolio",
  description: "Professional developer portfolio showcasing skills and projects",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased font-outfit", outfit.variable, geist.variable, syne.variable)} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HoverProvider>
            <SvgFilters />
            <LoadingScreen />
            {children}
            <Toaster />
          </HoverProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
