import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Send, ArrowRight } from 'lucide-react'
import { HERO } from '../../constants/portfolioData'
import { useConfig } from '../../hooks/useSupabase'
import SectionTitle from '../ui/SectionTitle'
import GlowButton from '../ui/GlowButton'

export default function ContactSection() {
  const { data: heroDb } = useConfig('hero')
  const hero = useMemo(() => ({ ...HERO, ...heroDb }), [heroDb])

  const contactItems = useMemo(() => [
    {
      icon: Mail,
      label: 'Email',
      value: hero.email,
      href: `mailto:${hero.email}`,
      color: '#3b82f6',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: hero.phone,
      href: `tel:${hero.phone}`,
      color: '#10b981',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: hero.location,
      color: '#f59e0b',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: hero.linkedin?.replace('https://www.linkedin.com/in/', '').replace(/\/$/, '') || 'LinkedIn',
      href: hero.linkedin,
      external: true,
      color: '#6366f1',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: hero.github?.replace('https://github.com/', '') || 'GitHub',
      href: hero.github,
      external: true,
      color: '#a78bfa',
    },
  ], [hero])

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6" style={{ background: '#09090b' }}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          label="contacto"
          title="Hablemos"
          subtitle="¿Tienes un proyecto interesante? Me encantaría escucharte."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-orbitron text-lg font-bold text-slate-100 mb-3">
              Disponible para colaborar
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Estoy abierto a oportunidades de trabajo Full Stack, consultorías y proyectos freelance.
              No dudes en escribirme — respondo en menos de 24 horas.
            </p>

            <div className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, label, value, href, external, color }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-600 mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <div
              className="p-8 rounded-2xl text-center"
              style={{
                background: 'rgba(24,24,27,0.9)',
                border: '1px solid rgba(59,130,246,0.15)',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, #3b82f622, #8b5cf622)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                <Send size={28} style={{ color: '#3b82f6' }} />
              </div>

              <h4 className="font-orbitron text-lg font-bold text-slate-100 mb-3">
                ¿Listo para empezar?
              </h4>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Envíame un email con los detalles de tu proyecto y exploraremos cómo puedo ayudarte.
              </p>

              <GlowButton
                variant="primary"
                size="lg"
                href={`mailto:${hero.email}?subject=Oportunidad de trabajo`}
                className="w-full justify-center"
              >
                <Mail size={18} />
                Enviar mensaje
                <ArrowRight size={16} />
              </GlowButton>

              <p className="text-slate-600 text-xs font-mono mt-4">
                Respuesta en {'< 24 horas'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
