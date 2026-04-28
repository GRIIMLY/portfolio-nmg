import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Code2, Briefcase, GraduationCap, FolderKanban, ExternalLink, Settings } from 'lucide-react'
import { isConfigured } from '../../lib/supabase'

const SECTIONS = [
  { to: '/admin/hero',        icon: Zap,           label: 'Hero',         desc: 'Edita el título, descripción y CTAs del inicio.' },
  { to: '/admin/habilidades', icon: Code2,         label: 'Habilidades',  desc: 'Gestiona tu stack tecnológico y niveles.' },
  { to: '/admin/experiencia', icon: Briefcase,     label: 'Experiencia',  desc: 'Añade y edita tu historial laboral.' },
  { to: '/admin/educacion',   icon: GraduationCap, label: 'Educación',    desc: 'Estudios formales y certificaciones.' },
  { to: '/admin/proyectos',   icon: FolderKanban,  label: 'Proyectos',    desc: 'Muestra tus proyectos con links y demos.' },
  { to: '/admin/config',      icon: Settings,      label: 'Config',       desc: 'Configuración general del portfolio.' },
]

export default function Dashboard() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-orbitron text-2xl font-bold text-slate-100 mb-2">Dashboard</h1>
        <p className="text-slate-400 text-sm font-mono">
          Gestiona el contenido de tu portfolio desde aquí.
        </p>
      </motion.div>

      {/* Supabase status */}
      {!isConfigured && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 rounded-xl flex items-start gap-3"
          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
        >
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse mt-1.5 shrink-0" />
          <div>
            <p className="text-yellow-400 text-sm font-semibold mb-1">Supabase no configurado</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              El portfolio usa datos locales. Para habilitar edición persistente, configura{' '}
              <code className="text-yellow-300">VITE_SUPABASE_URL</code> y{' '}
              <code className="text-yellow-300">VITE_SUPABASE_ANON_KEY</code> en tu archivo <code className="text-yellow-300">.env</code>.
            </p>
          </div>
        </motion.div>
      )}

      {/* Section cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map(({ to, icon: Icon, label, desc }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={to}
              className="flex flex-col p-5 rounded-xl transition-all duration-200 group hover:-translate-y-0.5"
              style={{
                background: 'rgba(24,24,27,0.8)',
                border: '1px solid rgba(39,39,42,0.6)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(39,39,42,0.6)'}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                <Icon size={18} style={{ color: '#3b82f6' }} />
              </div>
              <h3 className="font-orbitron text-sm font-bold text-slate-200 mb-1 group-hover:text-cyan-400 transition-colors">
                {label}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
              <div className="flex items-center gap-1 text-xs font-mono text-slate-600 mt-3 group-hover:text-cyan-400 transition-colors">
                Gestionar <ExternalLink size={10} className="ml-0.5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick link to portfolio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center justify-between p-4 rounded-xl"
        style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}
      >
        <div>
          <p className="text-sm font-semibold text-slate-300 mb-0.5">Ver portfolio público</p>
          <p className="text-xs text-slate-500 font-mono">nicolas-morales.dev</p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-rajdhani font-semibold transition-colors"
          style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.25)' }}
        >
          <ExternalLink size={14} />
          Abrir
        </Link>
      </motion.div>
    </div>
  )
}
