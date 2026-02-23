"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Cuanto cuesta reformar una cocina?",
    a: "El precio depende del tamano, los materiales y el alcance de la reforma. Una reforma parcial (muebles y encimera) puede estar entre 4.000-8.000€. Una reforma integral llave en mano suele oscilar entre 8.000-20.000€. forma. te presenta presupuestos detallados y comparados para que elijas con informacion real.",
  },
  {
    q: "Cuanto tiempo tarda una reforma de cocina?",
    a: "Una reforma parcial puede completarse en 1-2 semanas. Una reforma integral suele tardar entre 3-6 semanas dependiendo de la complejidad. Los profesionales que recomendamos siempre dan un plazo cerrado antes de empezar.",
  },
  {
    q: "El servicio de forma. tiene algun coste?",
    a: "No. Nuestro asesoramiento es 100% gratuito. Comparamos profesionales, te presentamos presupuestos y te acompanamos durante la obra. Sin comisiones, sin costes ocultos.",
  },
  {
    q: "Puedo ver un diseno 3D antes de reformar?",
    a: "Si. Muchos de los profesionales de nuestra red incluyen proyecto 3D en su presupuesto. Podras visualizar tu cocina con materiales, colores y distribucion antes de tomar ninguna decision.",
  },
  {
    q: "Que pasa si hay problemas durante la obra?",
    a: "Todos nuestros profesionales trabajan con contrato y garantia. Si surge cualquier incidencia, nuestro equipo media entre ambas partes. Es una de las principales ventajas de reformar a traves de forma.",
  },
  {
    q: "Trabajais en toda España?",
    a: "Si. Tenemos profesionales verificados en mas de 8.000 municipios de toda España. Desde grandes ciudades hasta localidades pequenas.",
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">FAQ</p>
      <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-foreground mb-16">
        Preguntas frecuentes
      </h2>

      <div className="border-t border-border">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left group"
            >
              <h3 className="text-sm font-sans font-medium text-foreground leading-relaxed group-hover:opacity-70 transition-opacity">
                {faq.q}
              </h3>
              <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 pb-6" : "max-h-0"}`}>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed -mt-2">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
