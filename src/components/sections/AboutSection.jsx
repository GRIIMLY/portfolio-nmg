import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Linkedin, User } from 'lucide-react'
import { HERO } from '../../constants/portfolioData'
import { useConfig } from '../../hooks/useSupabase'
import SectionTitle from '../ui/SectionTitle'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay },
})

export default function AboutSection() {
  const { data: heroDb } = useConfig('hero')
  const hero = useMemo(() => ({ ...HERO, ...heroDb }), [heroDb])

  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6" style={{ background: '#09090b' }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="sobre mí"
          title="Quién soy"
          subtitle="Desarrollador Full Stack apasionado por construir software de calidad."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Avatar / visual */}
          <motion.div {...fadeIn(0.1)} className="flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />

              <div className="relative rounded-2xl overflow-hidden w-64 h-64 sm:w-80 sm:h-80"
                style={{ border: '1px solid rgba(59,130,246,0.2)', background: '#18181b' }}>
                {hero.avatar_url ? (
                  <img
                    src={hero.avatar_url}
                    alt={hero.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #3b82f622, #8b5cf622)', border: '2px solid rgba(59,130,246,0.3)' }}>
                      <User size={40} className="text-cyan-400" />
                    </div>
                    <p className="font-mono text-xs text-slate-500 text-center px-4">
                      // Agrega tu foto<br />desde el admin panel
                    </p>
                  </div>
                )}

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg"
                  style={{ borderColor: '#3b82f6' }} />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg"
                  style={{ borderColor: '#8b5cf6' }} />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg"
                  style={{ borderColor: '#8b5cf6' }} />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-lg"
                  style={{ borderColor: '#3b82f6' }} />
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <motion.div {...fadeIn(0.2)}>
              <h3 className="font-orbitron text-xl font-bold text-slate-100 mb-3">
                Nicolas Morales <span style={{ color: '#3b82f6' }}>Galindo</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Ingeniero de Sistemas con perfil de Desarrollador Full Stack con más de <strong className="text-slate-200">6 años de experiencia</strong> en el diseño, desarrollo y mantenimiento de sistemas de información.
              </p>
              <p className="text-slate-400 leading-relaxed mt-3">
                Especializado en tecnologías como <strong className="text-cyan-400">.NET</strong>, <strong className="text-cyan-400">Angular</strong> y <strong className="text-cyan-400">microservicios</strong>. Comprometido con la calidad del código, las mejores prácticas <strong className="text-slate-200">(SOLID, Clean Code)</strong> y la innovación tecnológica.
              </p>
            </motion.div>

            {/* Contact info grid */}
            <motion.div {...fadeIn(0.3)} className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: 'Ubicación', value: hero.location || 'Bogotá, Colombia' },
                { icon: Mail,   label: 'Email',     value: hero.email, href: `mailto:${hero.email}` },
                { icon: Phone,  label: 'Teléfono',  value: hero.phone, href: `tel:${hero.phone}` },
                { icon: Linkedin, label: 'LinkedIn', value: hero.linkedin?.replace('https://www.linkedin.com/in/', '').replace(/\/$/, ''), href: hero.linkedin, external: true },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(59,130,246,0.1)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(59,130,246,0.1)' }}>
                    <Icon size={15} style={{ color: '#3b82f6' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-mono">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-slate-300 hover:text-cyan-400 transition-colors truncate block"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300 truncate">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Language badge */}
            <motion.div {...fadeIn(0.4)} className="flex flex-wrap gap-3">
              {[
                { lang: 'Español', level: 'Nativo', color: '#10b981' },
                { lang: 'Inglés',  level: 'A1',     color: '#6366f1' },
              ].map(({ lang, level, color }) => (
                <div
                  key={lang}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                  style={{ background: `${color}10`, border: `1px solid ${color}33`, color }}
                >
                  <span className="font-semibold">{lang}</span>
                  <span className="text-xs opacity-70">{level}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
