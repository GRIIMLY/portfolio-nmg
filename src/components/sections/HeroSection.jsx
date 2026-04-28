import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { HERO } from '../../constants/portfolioData'
import { useConfig } from '../../hooks/useSupabase'
import GlowButton from '../ui/GlowButton'

function useTypewriter(words, speed = 80, pause = 1800) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const current = words[index % words.length]
    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % words.length)
      return
    }
    const t = setTimeout(() => {
      setSubIndex(s => s + (deleting ? -1 : 1))
      setText(current.substring(0, subIndex + (deleting ? -1 : 1)))
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [subIndex, deleting, index, words, speed, pause])

  return text
}

function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot pattern — professional, subtle */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Top-left blue glow */}
      <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />

      {/* Bottom-right violet glow */}
      <div className="absolute -bottom-40 -right-40 w-125 h-125 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />

      {/* Fade to bg at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to bottom, transparent, #09090b)' }} />
    </div>
  )
}

export default function HeroSection() {
  const { data: heroDb } = useConfig('hero')
  const hero = useMemo(() => ({
    ...HERO,
    ...heroDb,
    roles: Array.isArray(heroDb?.roles) && heroDb.roles.length > 0 ? heroDb.roles : HERO.roles,
  }), [heroDb])

  const typedRole = useTypewriter(hero.roles)

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#09090b' }}
    >
      <Background />

      {/* Floating accent blobs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-8"
          style={{
            border: '1px solid rgba(59,130,246,0.3)',
            background: 'rgba(59,130,246,0.06)',
            color: '#3b82f6',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Disponible para nuevas oportunidades
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-orbitron font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-100 mb-4 leading-tight"
        >
          {hero.name.split(' ').slice(0, 2).join(' ')}
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {hero.name.split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-lg sm:text-xl text-slate-300 mb-6 h-8 flex items-center justify-center gap-2"
        >
          <span style={{ color: '#8b5cf6' }}>&lt;</span>
          <span style={{ color: '#3b82f6' }}>{typedRole}</span>
          <span className="w-0.5 h-5 bg-cyan-400 animate-pulse" />
          <span style={{ color: '#8b5cf6' }}>/&gt;</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <GlowButton
            variant="primary"
            size="lg"
            href={`mailto:${hero.email}`}
          >
            <Mail size={18} />
            Contáctame
          </GlowButton>

          <GlowButton
            variant="ghost"
            size="lg"
            href={hero.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={18} />
            LinkedIn
          </GlowButton>

          <GlowButton
            variant="ghostPurple"
            size="lg"
            href={hero.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} />
            GitHub
          </GlowButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: '6+',  label: 'Años de experiencia' },
            { value: '3',   label: 'Empresas' },
            { value: '20+', label: 'Tecnologías' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-orbitron text-2xl sm:text-3xl font-bold"
                style={{ color: '#3b82f6' }}>
                {value}
              </p>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  )
}
