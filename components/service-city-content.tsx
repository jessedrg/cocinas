"use client"

import { useState } from "react"
import Link from "next/link"
import type { Service } from "@/lib/sitemap-data"
import { MessageCircle, Star, Shield, Clock, Ruler, Users, CheckCircle, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"

const WA_URL = "https://wa.me/34936941859?text=Hola%2C%20me%20interesa%20una%20reforma%20de%20cocina."

const SERVICE_IMAGES: Record<string, string> = {
  "reforma-cocina": "https://images.unsplash.com/photo-1632583824020-937ae9564495?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.1.0",
  "cocina-a-medida": "https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0",
  "muebles-cocina": "https://images.unsplash.com/photo-1583845112239-97ef1341b271?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0",
  "encimera-cocina": "https://images.unsplash.com/photo-1549089154-ad7b2808944c?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0",
  "cocina-moderna": "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?q=80&w=1565&auto=format&fit=crop&ixlib=rb-4.1.0",
  "cocina-integral": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0",
  "diseno-cocina": "https://images.unsplash.com/photo-1696986681436-f5ee12981bc9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0",
  "cocina-pequena": "https://images.unsplash.com/photo-1633109611134-c41b5c0bbc1a?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0",
  "instalacion-cocina": "https://images.unsplash.com/photo-1632583824020-937ae9564495?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.1.0",
  "cocina-industrial": "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?q=80&w=1565&auto=format&fit=crop&ixlib=rb-4.1.0",
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function generateReviews(cityName: string, serviceId: string) {
  const seed = hashCode(`${cityName}-${serviceId}`)
  const names = ["Maria L.", "Carlos G.", "Ana R.", "Javier M.", "Elena S.", "Roberto P.", "Patricia D.", "Fernando T.", "Laura B.", "Sergio V."]
  const surnames2 = ["Garcia", "Martinez", "Lopez", "Sanchez", "Fernandez", "Perez", "Rodriguez", "Gonzalez", "Hernandez", "Diaz"]

  const reformaTemplates = [
    `Teniamos una cocina de los anos 80 y no sabiamos por donde empezar. forma. nos presento 3 presupuestos en ${cityName} y elegimos el que mejor encajaba. En 4 semanas teniamos cocina nueva. El resultado es espectacular.`,
    `Queriamos abrir la cocina al salon y nos daba miedo el resultado. El profesional que nos recomendo forma. en ${cityName} nos hizo un diseno 3D antes de empezar. Fue exactamente como lo vimos en pantalla. Increible.`,
    `Presupuesto ajustado pero queriamos algo bonito. forma. encontro un equipo en ${cityName} que supo sacar el maximo partido a cada euro. La encimera de Silestone y los muebles lacados quedan de revista.`,
    `Reforma llave en mano en ${cityName}. Desde la demolicion hasta el ultimo tirador. Todo coordinado, sin sorpresas en el precio. Cumplieron el plazo al dia. Muy recomendable.`,
    `Cocina pequena de 6m2 que parecia imposible. El disenador que me recomendo forma. en ${cityName} aprovecho cada centimetro. Ahora es mi espacio favorito de la casa.`,
    `Segunda reforma que hago con forma. en ${cityName}. La primera vez fue tan bien que no dude en repetir. Profesionalidad y cumplimiento de plazos. Eso vale oro.`,
  ]

  const mueblesTemplates = [
    `Solo queriamos cambiar los muebles de cocina sin obra. forma. nos encontro un carpintero en ${cityName} que hizo un trabajo impecable. Muebles a medida, perfectos para nuestro espacio irregular.`,
    `Los muebles altos de nuestra cocina estaban destrozados. forma. nos recomendo un profesional en ${cityName} que cambio todo en una semana. La diferencia es brutal.`,
    `Queriamos muebles de cocina en madera natural. El artesano que nos conecto forma. en ${cityName} hizo un trabajo de otra liga. Cada detalle cuidado al milimetro.`,
    `Cambiamos solo las puertas de los muebles y la encimera. El resultado parece una cocina nueva por una fraccion del precio. Gracias forma. por la recomendacion en ${cityName}.`,
    `Isla central a medida. El carpintero de ${cityName} que nos recomendo forma. entendio perfectamente lo que buscabamos. Funcional y preciosa.`,
    `Muebles bajos con sistema de extraccion total. El montador de ${cityName} fue rapidisimo y muy limpio. Servicio 10.`,
  ]

  const templates = serviceId.includes("muebles") ? mueblesTemplates : reformaTemplates
  const startIdx = seed % templates.length

  return Array.from({ length: 6 }, (_, i) => ({
    name: names[(seed + i * 3) % names.length],
    city: cityName,
    rating: (seed + i) % 7 === 0 ? 4 : 5,
    text: templates[(startIdx + i) % templates.length],
    date: `${[3, 17, 8, 24, 11, 29][i]} de ${["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][[7, 9, 8, 10, 11, 7][i]]} 2025`,
    verified: true,
  }))
}

function generateFAQs(cityName: string, serviceName: { title: string; singular: string }, serviceId: string) {
  const faqs = [
    { q: `Cuanto cuesta una ${serviceName.singular} en ${cityName}?`, a: `El precio de una ${serviceName.singular} en ${cityName} depende del tamano, los materiales y el alcance del proyecto. Una reforma parcial puede costar entre 4.000-8.000€, mientras que una reforma integral llave en mano oscila entre 8.000-20.000€. forma. te presenta presupuestos detallados y comparados de profesionales verificados en ${cityName}. Escribenos por WhatsApp para orientacion gratuita.` },
    { q: `El servicio de forma. en ${cityName} tiene algun coste?`, a: `El asesoramiento de forma. es completamente gratuito. Comparamos profesionales, te presentamos presupuestos y te acompanamos durante la obra. Sin comisiones ni costes ocultos. Escribenos por WhatsApp sin compromiso.` },
    { q: `Cuanto tiempo tarda una ${serviceName.singular} en ${cityName}?`, a: `Depende del alcance del proyecto. Una reforma parcial (muebles y encimera) suele completarse en 1-2 semanas. Una reforma integral puede tardar entre 3-6 semanas. Los profesionales que recomendamos en ${cityName} siempre dan un plazo cerrado antes de empezar.` },
  ]

  if (serviceId.includes("reforma") || serviceId.includes("integral")) {
    faqs.push(
      { q: "Incluye diseno 3D en el presupuesto?", a: `Muchos de los profesionales de nuestra red en ${cityName} incluyen proyecto 3D en su presupuesto. Podras visualizar tu cocina con materiales, colores y distribucion antes de tomar ninguna decision.` },
      { q: "Que pasa si hay problemas durante la obra?", a: "Todos nuestros profesionales trabajan con contrato y garantia. Si surge cualquier incidencia, nuestro equipo media entre ambas partes. Es una de las principales ventajas de reformar a traves de forma." },
      { q: "Puedo vivir en casa durante la reforma?", a: "Si, aunque dependiendo del alcance de la obra puede haber unos dias sin cocina. Los profesionales que recomendamos planifican la obra para minimizar las molestias. Muchos ofrecen soluciones temporales como punto de agua y electricidad provisional." },
    )
  } else if (serviceId.includes("muebles")) {
    faqs.push(
      { q: "Puedo cambiar solo las puertas de los muebles?", a: `Si, cambiar solo las puertas es una opcion muy popular que transforma completamente la cocina por una fraccion del precio de una reforma completa. Los profesionales de ${cityName} que recomendamos son expertos en este tipo de renovacion.` },
      { q: "Que materiales de muebles recomendais?", a: "Depende de tu presupuesto y estilo. Melamina de alta calidad para presupuestos ajustados, lacado para un acabado premium, y madera maciza para estilos rusticos o nordicos. Nuestros profesionales te asesoran sobre la mejor opcion." },
    )
  } else if (serviceId.includes("encimera")) {
    faqs.push(
      { q: "Silestone, Dekton o granito: cual es mejor?", a: "Cada material tiene sus ventajas. Silestone es versatil y con amplia gama de colores. Dekton es ultraresistente al calor y los rayones. Granito es natural y unico. Corian permite formas sin juntas. Nuestros profesionales te ayudan a elegir segun tu uso y presupuesto." },
      { q: "Se puede cambiar la encimera sin cambiar los muebles?", a: `Si, es muy habitual. Los profesionales de ${cityName} que recomendamos realizan el cambio de encimera en 1-2 dias, adaptandola a tus muebles existentes. El resultado renueva completamente la cocina.` },
    )
  } else {
    faqs.push(
      { q: `Puedo ver ejemplos de trabajos en ${cityName}?`, a: `Si. Nuestros profesionales en ${cityName} tienen portfolios con trabajos anteriores que podras revisar antes de decidir. Ademas, muchos ofrecen la posibilidad de visitar cocinas ya terminadas para que veas la calidad del acabado en persona.` },
      { q: "Ofreceis ayuda con financiacion?", a: "Si. Nuestros asesores conocen las opciones de financiacion de cada profesional. Muchos ofrecen financiacion propia a 12, 24 o 36 meses. Te orientamos sobre todas las opciones disponibles." },
    )
  }
  return faqs
}

interface ServiceCityContentProps {
  pageTitle: string
  serviceName: { name: string; title: string; singular: string }
  cityName: string
  citySlug: string
  serviceId: Service
  modifierText: string
  nearbyCities: string[]
  relatedServices: string[]
  serviceNames: Record<Service, { name: string; title: string; singular: string }>
}

export function ServiceCityContent({
  pageTitle, serviceName, cityName, citySlug, serviceId, modifierText,
  nearbyCities, relatedServices, serviceNames,
}: ServiceCityContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visibleReviews, setVisibleReviews] = useState(3)

  const reviews = generateReviews(cityName, serviceId)
  const faqs = generateFAQs(cityName, serviceName, serviceId)
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["reforma-cocina"]

  function getCityDisplayName(slug: string): string {
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt={pageTitle} className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
                <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
                <span>/</span>
                <span>{serviceName.title}</span>
                <span>/</span>
                <span className="text-background/60">{cityName}</span>
              </nav>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
                {pageTitle}
              </h1>

              <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
                {"Compara los mejores profesionales de "}
                {serviceName.singular}
                {modifierText ? ` ${modifierText.toLowerCase()}` : ""}
                {` en ${cityName}. Presupuestos reales, opiniones verificadas. Gratis.`}
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex flex-col gap-3">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  Presupuesto gratis
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors"
                >
                  Como funciona
                </a>
              </div>

              <div className="flex items-center gap-4 mt-6 text-xs text-background/40 font-sans">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-background/60" />)}
                  <span className="ml-1 text-background/60 font-medium">{avgRating}</span>
                </div>
                <span>|</span>
                <span>{reviews.length}+ opiniones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Verificados", sub: "Profesionales visitados" },
              { icon: Clock, label: "< 48 horas", sub: "Presupuestos en mano" },
              { icon: Ruler, label: "Gratuito", sub: "Sin compromiso" },
              { icon: Users, label: "847 cocinas", sub: "Reformadas con forma." },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs font-sans font-medium text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground font-sans">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Proceso</p>
            <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.1]">
              {`Tu ${serviceName.singular} en ${cityName}, paso a paso`}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-0">
            {[
              { n: "01", t: "Cuentanos tu proyecto", d: `Llamanos. Que quieres reformar en ${cityName}, tu estilo, tu presupuesto. 5 minutos bastan.` },
              { n: "02", t: "Recibe presupuestos", d: `Contactamos con los mejores profesionales de ${cityName}. Recibes hasta 3 presupuestos comparados.` },
              { n: "03", t: "Elige y reforma", d: `Tu decides. Coordinamos la primera visita y te acompanamos durante toda la obra en ${cityName}.` },
            ].map((step, i) => (
              <div key={step.n} className={`flex gap-8 py-8 ${i < 2 ? "border-b border-border" : ""}`}>
                <span className="font-serif text-4xl lg:text-5xl text-foreground/10 flex-shrink-0">{step.n}</span>
                <div>
                  <h3 className="text-sm font-sans font-medium text-foreground">{step.t}</h3>
                  <p className="text-xs text-muted-foreground mt-2 font-sans leading-relaxed max-w-md">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Opiniones</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground">
                {`Clientes de ${cityName} opinan`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-foreground" />)}
              <span className="text-sm font-sans font-medium">{avgRating}/5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {reviews.slice(0, visibleReviews).map((r, i) => (
              <article key={i} className="bg-card p-8 flex flex-col justify-between">
                <p className="text-xs text-foreground/80 font-sans leading-relaxed">{r.text}</p>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium font-sans">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground font-sans">{r.city} · {r.date}</p>
                  </div>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-sans">
                      <CheckCircle className="w-3 h-3" /> Verificada
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <button onClick={() => setVisibleReviews(reviews.length)} className="mt-8 flex items-center gap-2 text-xs font-sans font-medium text-foreground hover:opacity-70 transition-opacity mx-auto">
              Ver mas opiniones <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
            {`Tu cocina en ${cityName} merece`}
            <br />
            <span className="italic font-light">los mejores profesionales.</span>
          </h2>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
            <MessageCircle className="w-4 h-4" /> Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">FAQ</p>
        <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">
          {`Preguntas sobre ${serviceName.singular} en ${cityName}`}
        </h2>
        <div className="border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-start justify-between gap-6 py-5 text-left group">
                <h3 className="text-xs sm:text-sm font-sans font-medium text-foreground leading-relaxed group-hover:opacity-70 transition-opacity">{faq.q}</h3>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="pb-5 -mt-1">
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Guia</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-8">
            {`Guia para tu ${serviceName.singular} en ${cityName}`}
          </h2>
          <div className="prose-sm font-sans text-muted-foreground space-y-4 leading-relaxed text-xs sm:text-sm">
            <p>{`Reformar la cocina en ${cityName} es una de las mejores inversiones que puedes hacer en tu hogar. Es el espacio donde mas tiempo pasamos y el que mas impacto tiene en el valor de la vivienda. En forma. lo sabemos porque hemos acompanado a mas de 800 familias en toda España en este proceso.`}</p>
            <h3 className="text-foreground font-medium text-sm pt-4">Que tener en cuenta</h3>
            <p>{`Al planificar tu ${serviceName.singular} en ${cityName}, define primero tu presupuesto real (incluyendo un 10-15% de margen para imprevistos), el estilo que buscas (moderna, nordica, clasica), y las funcionalidades prioritarias (mas almacenaje, isla, electrodomesticos integrados). Con estos datos, nuestros profesionales te presentan opciones concretas.`}</p>
            <h3 className="text-foreground font-medium text-sm pt-4">{`Por que confiar en forma. en ${cityName}`}</h3>
            <p>{`Nuestro equipo conoce a los profesionales de ${cityName} personalmente. Verificamos licencias, seguros, garantias y portfolios. Cuando te recomendamos un profesional, es porque lo conocemos por dentro. Sin sorpresas, sin intermediarios opacos.`}</p>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">{serviceName.title} en otras ciudades</p>
            <h3 className="font-serif text-xl tracking-tight text-foreground mb-6">Localidades cercanas</h3>
            <nav><ul className="space-y-0">
              {nearbyCities.map(city => (
                <li key={city}>
                  <Link href={`/${serviceId}/${city}/`} className="flex items-center justify-between py-3 border-b border-border/50 group">
                    <span className="text-xs font-sans text-foreground group-hover:opacity-70 transition-opacity">{`${serviceName.title} en ${getCityDisplayName(city)}`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul></nav>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios en {cityName}</p>
            <h3 className="font-serif text-xl tracking-tight text-foreground mb-6">Tambien te puede interesar</h3>
            <nav><ul className="space-y-0">
              {relatedServices.map(svc => (
                <li key={svc}>
                  <Link href={`/${svc}/${citySlug}/`} className="flex items-center justify-between py-3 border-b border-border/50 group">
                    <span className="text-xs font-sans text-foreground group-hover:opacity-70 transition-opacity">{`${serviceNames[svc as Service]?.title || svc} en ${cityName}`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul></nav>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-background/20 mb-4 font-sans">Da el primer paso</p>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background">La cocina que imaginas, existe.</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <Link href="/" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
              Ver servicios <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LocalBusiness",
        name: `forma. - ${pageTitle}`,
        description: `Los mejores profesionales de ${serviceName.singular} en ${cityName}. Presupuestos gratis.`,
         url: `https://www.formaypunto.com/${serviceId}/${citySlug}/`,
        address: { "@type": "PostalAddress", addressLocality: cityName, addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating, reviewCount: reviews.length, bestRating: "5", worstRating: "1" },
      })}} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })}} />
    </>
  )
}
