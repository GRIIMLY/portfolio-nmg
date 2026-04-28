import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Zap, Briefcase, GraduationCap,
  FolderKanban, User, LogOut, Menu, X, Code2, Globe, Settings,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/admin/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/hero',        icon: Zap,             label: 'Hero / Inicio' },
  { to: '/admin/habilidades', icon: Code2,           label: 'Habilidades' },
  { to: '/admin/experiencia', icon: Briefcase,       label: 'Experiencia' },
  { to: '/admin/educacion',   icon: GraduationCap,   label: 'Educación' },
  { to: '/admin/proyectos',   icon: FolderKanban,    label: 'Proyectos' },
  { to: '/admin/config',      icon: Settings,        label: 'Configuración' },
]

export default function AdminLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/admin')
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-rajdhani font-semibold transition-all duration-200 ${
      isActive
        ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
    }`

  const Sidebar = () => (
    <div className="flex flex-col h-full" style={{ background: '#111111', borderRight: '1px solid rgba(59,130,246,0.08)' }}>
      <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
          <Code2 size={16} className="text-white" />
        </div>
        <div>
          <p className="font-orbitron text-xs font-bold text-slate-100">NMG.dev</p>
          <p className="text-slate-500 text-xs">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={linkClass} onClick={() => setSidebarOpen(false)}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3" style={{ borderTop: '1px solid rgba(59,130,246,0.08)' }}>
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-rajdhani font-semibold text-slate-500 hover:text-slate-200 hover:bg-slate-800/60 transition-all mb-1"
        >
          <Globe size={16} />
          Ver sitio
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-rajdhani font-semibold text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex" style={{ background: '#09090b' }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 fixed top-0 bottom-0 left-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-60 lg:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 sm:px-6 h-14"
          style={{ background: 'rgba(9,9,11,0.95)', borderBottom: '1px solid rgba(59,130,246,0.08)', backdropFilter: 'blur(12px)' }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="font-mono text-xs text-slate-500">Portfolio Admin</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-500">online</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
