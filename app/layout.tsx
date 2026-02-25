import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["300", "400", "500", "600"], display: "swap" })

export const metadata: Metadata = {
  title: "forma. — Reformas de Cocina en España",
  description: "Encuentra los mejores profesionales para tu reforma de cocina. Comparamos presupuestos, estilos y opiniones reales. Asesoramiento gratuito y personalizado.",
  keywords: "reforma cocina, cocina a medida, muebles cocina, encimera cocina, diseño cocina, presupuesto reforma cocina",
  openGraph: {
    title: "forma. — Reformas de Cocina en España",
    description: "Encuentra los mejores profesionales para tu reforma de cocina. Asesoramiento gratuito.",
    type: "website",
    siteName: "forma.",
    images: [{ url: "/og", width: 1200, height: 630, alt: "forma. — Reformas de Cocina" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "forma. — Reformas de Cocina",
    description: "Encuentra los mejores profesionales para tu reforma de cocina.",
    images: ["/og"],
  },
  icons: [{ rel: "icon", url: "/icon.svg", type: "image/svg+xml" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
