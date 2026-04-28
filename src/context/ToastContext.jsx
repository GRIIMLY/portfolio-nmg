import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS  = { success: CheckCircle, error: XCircle, info: Info }
const COLORS = {
  success: { color: '#22c55e', border: 'rgba(34,197,94,0.35)' },
  error:   { color: '#ef4444', border: 'rgba(239,68,68,0.35)' },
  info:    { color: '#00b4d8', border: 'rgba(0,180,216,0.35)' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((msg, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }, [])

  const dismiss = id => setToasts(p => p.filter(t => t.id !== id))

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none" style={{ maxWidth: 340 }}>
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = ICONS[t.type] || ICONS.info
            const c    = COLORS[t.type] || COLORS.info
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.92 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl pointer-events-auto"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: `1px solid ${c.border}`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
                  minWidth: 240,
                }}
              >
                <Icon size={16} style={{ color: c.color, flexShrink: 0 }} />
                <span className="font-rajdhani font-semibold text-sm flex-1" style={{ color: '#e2e8f0' }}>{t.msg}</span>
                <button onClick={() => dismiss(t.id)} style={{ color: '#64748b' }}>
                  <X size={13} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
