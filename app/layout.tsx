import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import "./globals.css"

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-arabic",
})

export const metadata: Metadata = {
  title: "Depth - عمق الخبرة لحلول الأعمال",
  description: "Professional business solutions with depth of experience | حلول الأعمال المهنية بعمق الخبرة",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className={`${ibmPlexArabic.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
