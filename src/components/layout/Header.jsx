import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, Terminal } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Inicio',      href: '#inicio' },
  { label: 'Sobre mí',   href: '#sobre-mi' },
  { label: 'Habilidades',href: '#habilidades' },
  { label: 'Experiencia',href: '#experiencia' },
  { label: 'Educación',  href: '#educacion' },
  { label: 'Proyectos',  href: '#proyectos' },
  { label: 'Contacto',   href: '#contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(9,9,11,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(59,130,246,0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => handleNav('#inicio')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-orbitron text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
              NMG<span style={{ color: '#3b82f6' }}>.</span>dev
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="relative px-3 py-2 text-sm font-rajdhani font-semibold transition-colors duration-200"
                style={{ color: active === href ? '#3b82f6' : '#94a3b8' }}
              >
                {label}
                {active === href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: '#3b82f6' }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
              style={{ color: '#64748b', border: '1px solid rgba(100,116,139,0.25)' }}
            >
              <Terminal size={12} />
              admin
            </a>
            <button
              onClick={() => setOpen(p => !p)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{ background: 'rgba(9,9,11,0.98)', borderBottom: '1px solid rgba(59,130,246,0.1)' }}
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className="text-left px-4 py-3 rounded-lg font-rajdhani font-semibold text-sm transition-colors"
                  style={{
                    color: active === href ? '#3b82f6' : '#94a3b8',
                    background: active === href ? 'rgba(59,130,246,0.06)' : 'transparent',
                  }}
                >
                  {active === href && <span style={{ color: '#3b82f6' }} className="mr-2">&gt;</span>}
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
