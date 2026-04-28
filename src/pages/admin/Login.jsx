import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, User, LogIn, Code2, AlertCircle } from 'lucide-react'

export default function AdminLogin({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await onLogin(user, pass)
    if (!ok) setError('Credenciales incorrectas.')
    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#09090b' }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div
          className="p-8 rounded-2xl"
          style={{
            background: 'rgba(24,24,27,0.95)',
            border: '1px solid rgba(59,130,246,0.15)',
            boxShadow: '0 0 60px rgba(59,130,246,0.05)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              <Code2 size={22} className="text-white" />
            </div>
            <h1 className="font-orbitron text-lg font-bold text-slate-100">Admin Panel</h1>
            <p className="text-slate-500 text-xs font-mono mt-1">nicolas-morales.dev</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-mono text-slate-500 mb-1.5 block">Usuario</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  autoComplete="username"
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  style={{
                    background: 'rgba(9,9,11,0.8)',
                    border: '1px solid rgba(39,39,42,0.8)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(39,39,42,0.8)'}
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 mb-1.5 block">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  autoComplete="current-password"
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  style={{
                    background: 'rgba(9,9,11,0.8)',
                    border: '1px solid rgba(39,39,42,0.8)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(39,39,42,0.8)'}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <AlertCircle size={13} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !user || !pass}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-rajdhani font-bold text-sm transition-all duration-200 disabled:opacity-50 mt-2"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: '#fff',
                boxShadow: '0 0 20px rgba(59,130,246,0.2)',
              }}
            >
              <LogIn size={16} />
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          <p className="text-center text-slate-700 text-xs font-mono mt-6">
            <a href="/" className="hover:text-slate-500 transition-colors">← Volver al portfolio</a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
