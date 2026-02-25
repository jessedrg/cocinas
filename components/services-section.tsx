import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    id: "reforma-cocina",
    title: "Reforma integral",
    desc: "De principio a fin. Demolicion, fontaneria, electricidad, mobiliario e instalacion. Llave en mano.",
    img: "https://images.unsplash.com/photo-1632583824020-937ae9564495?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "cocina-a-medida",
    title: "Cocina a medida",
    desc: "Diseño personalizado para cada centimetro de tu espacio.",
    img: "https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "muebles-cocina",
    title: "Muebles de cocina",
    desc: "Modulos altos, bajos, columnas y islas. Todas las configuraciones.",
    img: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "encimera-cocina",
    title: "Encimeras",
    desc: "Silestone, Dekton, granito, Corian, madera. Elige tu material.",
    img: "https://images.unsplash.com/photo-1549089154-ad7b2808944c?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "diseno-cocina",
    title: "Diseño de cocina",
    desc: "Proyecto 3D completo. Visualiza tu cocina antes de construirla.",
    img: "https://images.unsplash.com/photo-1696986681436-f5ee12981bc9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "",
  },
  {
    id: "cocina-moderna",
    title: "Cocina moderna",
    desc: "Lineas puras, sin tiradores, integrada. El futuro de tu hogar.",
    img: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?q=80&w=1565&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "md:col-span-2",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-12 gap-4 mb-16 lg:mb-24">
        <div className="lg:col-span-5">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Servicios</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.05]">
            Todo lo que tu cocina necesita
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-8 flex items-end">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Desde el diseño hasta la ultima baldosa. Encontramos los profesionales perfectos para cada fase de tu reforma.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {services.map((svc) => (
          <Link
            key={svc.id}
            href={`/${svc.id}/`}
            className={`group relative overflow-hidden bg-secondary aspect-[4/3] ${svc.span}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svc.img}
              alt={svc.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 bg-foreground/40 group-hover:bg-foreground/60 transition-colors duration-500">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-xl sm:text-2xl text-background transition-colors duration-500">{svc.title}</h3>
                <ArrowUpRight className="w-5 h-5 text-background/60 group-hover:text-background transition-colors duration-500" />
              </div>
              <p className="text-xs text-background/70 group-hover:text-background/90 transition-colors duration-500 max-w-xs font-sans">
                {svc.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
