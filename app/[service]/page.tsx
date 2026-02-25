import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VALID_SERVICES, type Service } from "@/lib/sitemap-data"
import { MessageCircle, ArrowRight, MapPin } from "lucide-react"

export const dynamicParams = true
export const revalidate = 604800

const WA_URL = "https://wa.me/34936941859?text=Hola%2C%20me%20interesa%20una%20reforma%20de%20cocina."

interface ServiceInfo {
  name: string
  title: string
  singular: string
  description: string
  benefits: string[]
  process: { step: string; desc: string }[]
  tips: string[]
  duration: string
  guarantee: string
}

const SERVICE_INFO: Record<Service, ServiceInfo> = {
  "reforma-cocina": {
    name: "Reforma de Cocina", title: "Reforma de Cocina", singular: "reforma de cocina",
    description: "La reforma integral de cocina transforma completamente tu espacio. Incluye demolición, fontanería, electricidad, alicatado, mobiliario e instalación de electrodomésticos. El resultado: una cocina nueva, funcional y adaptada a tu estilo de vida.",
    benefits: ["Llave en mano: nos encargamos de todo", "Sin sorpresas: presupuesto cerrado", "Diseño 3D: visualiza antes de empezar", "Coordinación total: un solo interlocutor", "Garantía: materiales y mano de obra", "Financiación: opciones de pago flexibles"],
    process: [
      { step: "Visita y medición", desc: "El profesional visita tu cocina, toma medidas exactas y escucha tus necesidades y preferencias." },
      { step: "Diseño y presupuesto", desc: "Recibes un proyecto 3D con materiales, colores y distribución. Presupuesto detallado sin sorpresas." },
      { step: "Demolición", desc: "Retirada de la cocina antigua: muebles, azulejos, instalaciones. Gestión de escombros incluida." },
      { step: "Instalaciones", desc: "Fontanería, electricidad y gas según el nuevo diseño. Cumpliendo toda la normativa vigente." },
      { step: "Acabados", desc: "Alicatado, suelo, pintura. Preparación para recibir el mobiliario." },
      { step: "Montaje", desc: "Instalación de muebles, encimera y electrodomésticos. Ajustes finales y limpieza." },
    ],
    tips: ["Define tu presupuesto máximo antes de empezar", "Piensa en cómo usas la cocina: ¿cocinas mucho? ¿comes en ella?", "El triángulo de trabajo (fregadero-fuegos-nevera) es clave", "Invierte en buena iluminación", "Los electrodomésticos integrados dan un look más limpio"],
    duration: "3-6 semanas", guarantee: "2-5 años"
  },
  "cocina-a-medida": {
    name: "Cocina a Medida", title: "Cocina a Medida", singular: "cocina a medida",
    description: "Una cocina a medida se diseña específicamente para tu espacio y necesidades. Cada centímetro se aprovecha al máximo, con soluciones personalizadas que no encontrarás en cocinas estándar. Ideal para espacios irregulares o con requisitos especiales.",
    benefits: ["Aprovecha cada centímetro", "Diseño único y personalizado", "Materiales a tu elección", "Soluciones para espacios difíciles", "Calidad artesanal", "Durabilidad superior"],
    process: [
      { step: "Consulta inicial", desc: "Analizamos tu espacio, estilo de vida y preferencias estéticas." },
      { step: "Medición precisa", desc: "Medición milimétrica de todo el espacio, incluyendo irregularidades." },
      { step: "Diseño personalizado", desc: "Proyecto 3D con todas las soluciones a medida para tu cocina." },
      { step: "Selección de materiales", desc: "Eliges acabados, tiradores, encimera y todos los detalles." },
      { step: "Fabricación", desc: "Producción de los muebles en taller con control de calidad." },
      { step: "Instalación", desc: "Montaje profesional con ajustes perfectos a tu espacio." },
    ],
    tips: ["Aprovecha las esquinas con soluciones giratorias", "Los cajones son más prácticos que las puertas", "Piensa en el almacenamiento vertical", "Los módulos extraíbles facilitan el acceso", "Invierte en herrajes de calidad"],
    duration: "4-8 semanas", guarantee: "5-10 años"
  },
  "muebles-cocina": {
    name: "Muebles de Cocina", title: "Muebles de Cocina", singular: "muebles de cocina",
    description: "Cambiar los muebles de cocina es la forma más rápida de transformar el espacio sin obra mayor. Muebles altos, bajos, columnas e islas en todos los estilos y materiales. Desde económicos hasta premium, siempre con instalación profesional.",
    benefits: ["Transformación rápida sin obra", "Amplia variedad de estilos", "Diferentes rangos de precio", "Instalación profesional", "Opciones modulares o a medida", "Garantía del fabricante"],
    process: [
      { step: "Evaluación", desc: "Verificamos el estado de las instalaciones existentes y tomamos medidas." },
      { step: "Selección", desc: "Eliges el estilo, color, material y configuración de los muebles." },
      { step: "Presupuesto", desc: "Detalle de muebles, accesorios e instalación con precio cerrado." },
      { step: "Pedido", desc: "Confirmación y pedido de los muebles al fabricante." },
      { step: "Instalación", desc: "Montaje profesional, nivelación y ajustes." },
    ],
    tips: ["Mide bien antes de comprar", "Los muebles altos hasta el techo dan más almacenaje", "El interior de los muebles también importa", "Compara calidad de tableros y cantos", "Pregunta por la garantía de bisagras y guías"],
    duration: "1-3 semanas", guarantee: "2-5 años"
  },
  "encimera-cocina": {
    name: "Encimera de Cocina", title: "Encimera de Cocina", singular: "encimera de cocina",
    description: "La encimera es la superficie de trabajo más importante de la cocina. Silestone, Dekton, granito, Corian, madera, acero inoxidable... Cada material tiene sus ventajas. Te ayudamos a elegir la mejor opción para tu uso y presupuesto.",
    benefits: ["Variedad de materiales", "Resistencia y durabilidad", "Fácil mantenimiento", "Estética premium", "Instalación profesional", "Garantía del fabricante"],
    process: [
      { step: "Asesoramiento", desc: "Te explicamos las características de cada material para tu uso." },
      { step: "Medición", desc: "Plantilla exacta de tu encimera, incluyendo huecos y formas." },
      { step: "Fabricación", desc: "Corte y pulido de la encimera en taller especializado." },
      { step: "Instalación", desc: "Colocación, sellado y ajustes. Integración de fregadero si procede." },
    ],
    tips: ["Silestone y Dekton son muy resistentes a manchas", "El granito requiere sellado periódico", "La madera necesita más mantenimiento", "El grosor estándar es 2-3 cm", "El canto puede cambiar mucho el aspecto"],
    duration: "1-2 semanas", guarantee: "10-25 años"
  },
  "cocina-moderna": {
    name: "Cocina Moderna", title: "Cocina Moderna", singular: "cocina moderna",
    description: "Las cocinas modernas se caracterizan por líneas puras, ausencia de tiradores, electrodomésticos integrados y superficies lisas. Colores neutros, materiales como el Fenix o el lacado mate, y mucha funcionalidad oculta. El futuro de tu hogar.",
    benefits: ["Diseño minimalista y elegante", "Fácil limpieza", "Electrodomésticos integrados", "Sistemas de apertura push", "Iluminación LED integrada", "Máxima funcionalidad"],
    process: [
      { step: "Inspiración", desc: "Definimos el estilo exacto: colores, materiales, nivel de minimalismo." },
      { step: "Diseño técnico", desc: "Proyecto 3D con todos los sistemas de apertura y almacenaje." },
      { step: "Selección", desc: "Eliges acabados, electrodomésticos y accesorios." },
      { step: "Ejecución", desc: "Reforma completa o parcial según el estado de tu cocina." },
    ],
    tips: ["Los tiradores integrados o push son más limpios", "El color oscuro marca más las huellas", "Invierte en buenos sistemas de apertura", "La iluminación bajo muebles es imprescindible", "Planifica bien el almacenaje oculto"],
    duration: "4-6 semanas", guarantee: "2-5 años"
  },
  "cocina-integral": {
    name: "Cocina Integral", title: "Cocina Integral", singular: "cocina integral",
    description: "Una cocina integral incluye absolutamente todo: diseño, mobiliario, electrodomésticos, instalaciones y acabados. Un proyecto completo con un único responsable. La solución más cómoda para quien quiere despreocuparse de todo.",
    benefits: ["Todo incluido en un presupuesto", "Un solo interlocutor", "Coordinación perfecta", "Sin imprevistos", "Garantía global", "Financiación disponible"],
    process: [
      { step: "Proyecto completo", desc: "Diseño integral que incluye distribución, mobiliario y electrodomésticos." },
      { step: "Presupuesto global", desc: "Un único presupuesto que incluye todo, sin sorpresas." },
      { step: "Ejecución coordinada", desc: "Todos los gremios coordinados por un único responsable." },
      { step: "Entrega llave en mano", desc: "Te entregamos la cocina terminada, lista para usar." },
    ],
    tips: ["Compara presupuestos integrales, no parciales", "Pregunta qué incluye exactamente", "Verifica la marca de electrodomésticos", "Pide referencias de trabajos anteriores", "Asegura la garantía por escrito"],
    duration: "4-8 semanas", guarantee: "2-5 años"
  },
  "diseno-cocina": {
    name: "Diseño de Cocina", title: "Diseño de Cocina", singular: "diseño de cocina",
    description: "El diseño de cocina profesional optimiza el espacio, la funcionalidad y la estética. Incluye proyecto 3D fotorrealista, planos técnicos y lista de materiales. Visualiza tu cocina antes de gastar un euro en la reforma.",
    benefits: ["Visualización 3D realista", "Optimización del espacio", "Planos técnicos detallados", "Lista de materiales", "Evita errores costosos", "Base para presupuestos"],
    process: [
      { step: "Briefing", desc: "Entendemos cómo usas la cocina, tu estilo y tu presupuesto." },
      { step: "Medición", desc: "Medidas exactas del espacio, incluyendo instalaciones." },
      { step: "Propuesta", desc: "Primera propuesta de distribución y estilo." },
      { step: "Desarrollo", desc: "Proyecto 3D completo con materiales y colores." },
      { step: "Documentación", desc: "Planos, alzados y lista de materiales para presupuestar." },
    ],
    tips: ["Un buen diseño ahorra dinero en la reforma", "Pide varias opciones de distribución", "Visualiza con los colores reales", "Verifica las medidas de electrodomésticos", "El diseño debe incluir iluminación"],
    duration: "1-2 semanas", guarantee: "Proyecto entregado"
  },
  "cocina-pequena": {
    name: "Cocina Pequeña", title: "Cocina Pequeña", singular: "cocina pequeña",
    description: "Las cocinas pequeñas requieren soluciones inteligentes para aprovechar cada centímetro. Muebles hasta el techo, sistemas extraíbles, electrodomésticos compactos y trucos visuales que amplían el espacio. Pequeña en metros, grande en funcionalidad.",
    benefits: ["Máximo aprovechamiento", "Soluciones inteligentes", "Electrodomésticos compactos", "Trucos visuales", "Almacenaje optimizado", "Diseño funcional"],
    process: [
      { step: "Análisis", desc: "Estudiamos el espacio y tus necesidades reales de almacenaje." },
      { step: "Diseño inteligente", desc: "Soluciones específicas para espacios reducidos." },
      { step: "Selección", desc: "Electrodomésticos y muebles adaptados al espacio." },
      { step: "Ejecución", desc: "Instalación precisa donde cada milímetro cuenta." },
    ],
    tips: ["Los colores claros amplían visualmente", "Muebles hasta el techo dan más almacenaje", "Los espejos multiplican la luz", "Electrodomésticos 45cm en vez de 60cm", "Menos es más: no sobrecargues"],
    duration: "2-4 semanas", guarantee: "2-5 años"
  },
  "instalacion-cocina": {
    name: "Instalación de Cocina", title: "Instalación de Cocina", singular: "instalación de cocina",
    description: "El montaje profesional de cocina garantiza un resultado perfecto. Nivelación, ajustes, conexiones y acabados impecables. Tanto si has comprado los muebles por tu cuenta como si necesitas instalar una cocina completa.",
    benefits: ["Montaje profesional", "Nivelación perfecta", "Ajustes precisos", "Conexiones seguras", "Acabados impecables", "Garantía de instalación"],
    process: [
      { step: "Verificación", desc: "Comprobamos que todos los elementos están y las medidas son correctas." },
      { step: "Preparación", desc: "Marcaje de niveles y puntos de fijación." },
      { step: "Montaje", desc: "Instalación de muebles bajos, altos y columnas." },
      { step: "Encimera", desc: "Colocación y sellado de la encimera." },
      { step: "Conexiones", desc: "Fregadero, grifo, electrodomésticos." },
      { step: "Ajustes", desc: "Nivelación final, ajuste de puertas y cajones." },
    ],
    tips: ["Verifica que todo ha llegado antes de la cita", "El suelo debe estar terminado", "Las instalaciones deben estar preparadas", "Deja espacio para trabajar", "Revisa todo antes de firmar"],
    duration: "1-3 días", guarantee: "1-2 años"
  },
  "cocina-industrial": {
    name: "Cocina Industrial", title: "Cocina Industrial", singular: "cocina industrial",
    description: "El estilo industrial en cocinas combina materiales como el acero, el hormigón y la madera envejecida. Tuberías vistas, lámparas de fábrica y electrodomésticos de aspecto profesional. Un look urbano y con carácter para tu hogar.",
    benefits: ["Estética urbana y moderna", "Materiales resistentes", "Fácil mantenimiento", "Combina con espacios abiertos", "Personalidad única", "Tendencia atemporal"],
    process: [
      { step: "Concepto", desc: "Definimos el nivel de industrialización: desde sutil hasta radical." },
      { step: "Materiales", desc: "Selección de acero, madera, hormigón y acabados." },
      { step: "Diseño", desc: "Proyecto que integra el estilo con la funcionalidad." },
      { step: "Ejecución", desc: "Reforma con los materiales y acabados seleccionados." },
    ],
    tips: ["El acero inoxidable es el rey del estilo industrial", "La madera aporta calidez al conjunto", "Las lámparas tipo fábrica son un must", "Los electrodomésticos profesionales completan el look", "No olvides la funcionalidad por la estética"],
    duration: "4-6 semanas", guarantee: "2-5 años"
  },
}

const SERVICE_IMAGES: Record<string, string> = {
  "reforma-cocina": "https://images.unsplash.com/photo-1632583824020-937ae9564495?q=80&w=1558&auto=format&fit=crop",
  "cocina-a-medida": "https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?q=80&w=987&auto=format&fit=crop",
  "muebles-cocina": "https://images.unsplash.com/photo-1583845112239-97ef1341b271?q=80&w=987&auto=format&fit=crop",
  "encimera-cocina": "https://images.unsplash.com/photo-1549089154-ad7b2808944c?q=80&w=1035&auto=format&fit=crop",
  "cocina-moderna": "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?q=80&w=1565&auto=format&fit=crop",
  "cocina-integral": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=2070&auto=format&fit=crop",
  "diseno-cocina": "https://images.unsplash.com/photo-1696986681436-f5ee12981bc9?q=80&w=2071&auto=format&fit=crop",
  "cocina-pequena": "https://images.unsplash.com/photo-1633109611134-c41b5c0bbc1a?q=80&w=3132&auto=format&fit=crop",
  "instalacion-cocina": "https://images.unsplash.com/photo-1632583824020-937ae9564495?q=80&w=1558&auto=format&fit=crop",
  "cocina-industrial": "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?q=80&w=1565&auto=format&fit=crop",
}

const MAIN_CITIES = [
  "madrid", "barcelona", "valencia", "sevilla", "zaragoza", "malaga",
  "murcia", "palma-de-mallorca", "las-palmas-de-gran-canaria", "bilbao",
  "alicante", "cordoba", "valladolid", "vigo", "gijon", "hospitalet-de-llobregat",
  "vitoria-gasteiz", "la-coruna", "granada", "elche", "oviedo", "terrassa",
  "badalona", "cartagena", "jerez-de-la-frontera", "sabadell", "mostoles",
  "santa-cruz-de-tenerife", "alcala-de-henares", "pamplona", "fuenlabrada",
  "almeria", "san-sebastian", "leganes", "santander", "burgos", "albacete",
  "getafe", "salamanca", "logrono", "huelva", "badajoz", "tarragona",
  "lleida", "marbella", "leon", "cadiz", "dos-hermanas", "torrevieja",
]

function getCityDisplayName(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

interface PageProps { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) return { title: "No encontrado" }

  const serviceInfo = SERVICE_INFO[serviceId as Service]
  return {
    title: `${serviceInfo.title} en España | Profesionales Verificados | forma.`,
    description: `${serviceInfo.description} Servicio en toda España. Presupuestos gratis.`,
    alternates: { canonical: `https://formaypunto.com/${serviceId}/` },
    openGraph: { title: `${serviceInfo.title} en España`, description: serviceInfo.description, type: "website", siteName: "forma." },
  }
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceId } = await params
  if (!VALID_SERVICES.includes(serviceId as Service)) notFound()

  const serviceInfo = SERVICE_INFO[serviceId as Service]
  const heroImg = SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["reforma-cocina"]
  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg} alt={serviceInfo.title} className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
            <nav className="text-[10px] tracking-[0.3em] uppercase text-background/30 mb-8 font-sans flex items-center gap-2">
              <Link href="/" className="hover:text-background/60 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-background/60">{serviceInfo.title}</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-background leading-[0.95]">
              {serviceInfo.title}
              <br />
              <span className="italic font-light">en toda España</span>
            </h1>
            <p className="text-sm sm:text-base text-background/50 mt-8 max-w-xl font-sans leading-relaxed">
              {serviceInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> Presupuesto gratis
              </a>
              <a href="#ciudades" className="inline-flex items-center justify-center gap-2 border border-background/20 text-background px-8 py-4 text-sm font-sans hover:border-background/50 transition-colors">
                Ver ciudades <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ventajas</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                ¿Por qué elegir {serviceInfo.singular}?
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Trabajamos solo con profesionales verificados que garantizan resultados excepcionales.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid sm:grid-cols-2 gap-4">
                {serviceInfo.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-secondary/50">
                    <span className="text-xs text-muted-foreground font-mono mt-0.5">0{i + 1}</span>
                    <span className="text-sm text-foreground font-sans">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">El proceso</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                Cómo trabajamos
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Nuestros profesionales verificados siguen un proceso claro para garantizar tu satisfacción.
              </p>
              <div className="mt-6 p-4 bg-secondary/50">
                <p className="text-xs text-muted-foreground font-sans">Duración estimada</p>
                <p className="text-lg font-serif text-foreground mt-1">{serviceInfo.duration}</p>
                <p className="text-xs text-muted-foreground font-sans mt-3">Garantía</p>
                <p className="text-lg font-serif text-foreground mt-1">{serviceInfo.guarantee}</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6">
                {serviceInfo.process.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-foreground text-background flex items-center justify-center font-serif text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-sans font-medium text-foreground">{step.step}</h3>
                      <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consejos */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Consejos</p>
              <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground leading-[1.05]">
                Lo que debes saber
              </h2>
              <p className="text-sm text-muted-foreground mt-4 font-sans leading-relaxed">
                Antes de empezar tu proyecto, ten en cuenta estos consejos de nuestros expertos:
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="space-y-4">
                {serviceInfo.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 border border-border">
                    <svg className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-foreground font-sans">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Ciudades principales */}
        <section id="ciudades" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-4 mb-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Ciudades</p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground leading-[1.05]">
                {serviceInfo.title}
                <br />
                <span className="italic font-light">cerca de ti</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                Selecciona tu ciudad para ver profesionales verificados en tu zona. Servicio disponible en más de 8.000 localidades.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {MAIN_CITIES.map(city => (
              <Link
                key={city}
                href={`/${serviceId}/${city}/`}
                className="group flex items-center gap-2 p-4 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                <span className="text-sm font-sans text-foreground truncate">{getCityDisplayName(city)}</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              ¿No encuentras tu ciudad? <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:no-underline">Escríbenos por WhatsApp</a> y te conectamos con profesionales de tu zona.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-background leading-[1.05]">
              {serviceInfo.title} profesional
              <br />
              <span className="italic font-light">con garantía</span>
            </h2>
            <p className="text-sm text-background/50 mt-6 font-sans max-w-md mx-auto">
              Profesionales verificados. Presupuestos gratis. Resultados garantizados.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 mt-10 text-sm font-sans font-medium hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4" /> Contactar ahora
            </a>
          </div>
        </section>

        {/* Otros servicios */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Otros servicios</p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-12">También te puede interesar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(svc => (
              <Link
                key={svc}
                href={`/${svc}/`}
                className="group p-6 border border-border hover:border-foreground/30 hover:bg-secondary transition-all"
              >
                <h3 className="text-sm font-sans font-medium text-foreground group-hover:underline">{SERVICE_INFO[svc as Service]?.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{SERVICE_INFO[svc as Service]?.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
