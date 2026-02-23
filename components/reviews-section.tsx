import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "Marta L.",
    city: "Barcelona",
    text: "Teniamos la cocina de los 90 y no sabiamos por donde empezar. forma. nos presento 3 presupuestos en 48h. Elegimos uno y en 3 semanas teniamos cocina nueva. Impecable.",
    rating: 5,
  },
  {
    name: "Carlos y Ana",
    city: "Madrid",
    text: "Queríamos una cocina abierta al salon y todos nos decian que era complicado. El profesional que nos recomendo forma. lo resolvio con una isla preciosa. Mejor de lo que imaginabamos.",
    rating: 5,
  },
  {
    name: "Elena R.",
    city: "Valencia",
    text: "Presupuesto ajustado pero queria algo bonito. forma. encontro un equipo que supo sacar el maximo partido a cada euro. La encimera de Silestone es una maravilla.",
    rating: 5,
  },
  {
    name: "Javier M.",
    city: "Bilbao",
    text: "Reforma llave en mano. Desde el diseno 3D hasta la instalacion del ultimo tirador. Todo coordinado, sin sorpresas en el precio. Muy recomendable.",
    rating: 4,
  },
  {
    name: "Patricia S.",
    city: "Sevilla",
    text: "Cocina pequena de 6m2 que parecia imposible. El disenador que me recomendaron aprovecho cada centimetro. Ahora es mi espacio favorito de la casa.",
    rating: 5,
  },
  {
    name: "Roberto G.",
    city: "Malaga",
    text: "Segundo piso que reformo con forma. La primera vez fue tan bien que no dude en repetir. Profesionalidad y cumplimiento de plazos. Eso vale oro.",
    rating: 5,
  },
]

export function ReviewsSection() {
  return (
    <section id="opiniones" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-12 gap-4 mb-16 lg:mb-24">
        <div className="lg:col-span-5">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">Opiniones</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.05]">
            Lo dicen ellos, no nosotros.
          </h2>
        </div>
        <div className="lg:col-span-3 lg:col-start-8 flex items-end">
          <div>
            <p className="font-serif text-5xl text-foreground">4.9</p>
            <div className="flex gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-foreground" />)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-sans">847 opiniones verificadas</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {reviews.map((r, i) => (
          <article key={i} className="bg-secondary p-8 sm:p-10 flex flex-col justify-between group hover:bg-foreground transition-colors duration-500">
            <div>
              <Quote className="w-6 h-6 text-border group-hover:text-background/20 transition-colors duration-500 mb-6" />
              <p className="text-sm text-foreground group-hover:text-background transition-colors duration-500 font-sans leading-relaxed">
                {r.text}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border/50 group-hover:border-background/10 transition-colors duration-500 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-foreground group-hover:text-background transition-colors duration-500 font-sans">{r.name}</p>
                <p className="text-[10px] text-muted-foreground group-hover:text-background/50 transition-colors duration-500 font-sans mt-0.5">{r.city}</p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-current text-foreground/30 group-hover:text-background/30 transition-colors duration-500" />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
