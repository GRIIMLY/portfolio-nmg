import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Award, Calendar, ArrowUpDown, LayoutGrid } from 'lucide-react'
import { useTable } from '../../hooks/useSupabase'
import { EDUCATION } from '../../constants/portfolioData'
import SectionTitle from '../ui/SectionTitle'

const FILTER_TABS = [
  { key: 'all',           label: 'Todos',           icon: LayoutGrid },
  { key: 'degree',        label: 'Educación',        icon: GraduationCap },
  { key: 'certification', label: 'Certificaciones',  icon: Award },
]

const SORT_OPTIONS = [
  { key: 'recent', label: 'Más reciente' },
  { key: 'oldest', label: 'Más antiguo' },
  { key: 'name',   label: 'A-Z' },
]

const TYPE_COLORS = {
  degree:        { text: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.2)' },
  certification: { text: '#a78bfa', bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.25)' },
}

function getYear(period = '') {
  const years = period.match(/\d{4}/g)
  return years ? parseInt(years[years.length - 1]) : 0
}

function EducationCard({ item, index }) {
  const iscert = item.type === 'certification'
  const col = TYPE_COLORS[item.type] || TYPE_COLORS.degree

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22, delay: index * 0.04 }}
      className="p-5 rounded-xl"
      style={{ background: 'rgba(24,24,27,0.8)', border: `1px solid ${col.border}` }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: col.bg }}
        >
          {iscert
            ? <Award size={18} style={{ color: col.text }} />
            : <GraduationCap size={18} style={{ color: col.text }} />
          }
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-rajdhani font-bold text-slate-200 text-sm leading-snug mb-1">
            {item.title}
          </h4>
          <p className="text-xs font-semibold mb-2" style={{ color: col.text }}>
            {item.institution}
          </p>
          {item.description && (
            <p className="text-xs text-slate-500 mb-2">{item.description}</p>
          )}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-xs text-slate-600 font-mono">
              <Calendar size={11} />
              {item.period}
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded font-mono shrink-0"
              style={{ color: col.text, background: col.bg, border: `1px solid ${col.border}` }}
            >
              {iscert ? 'Certificación' : 'Educación'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function EducationSection() {
  const { data: dbEdu, loading } = useTable('education')
  const education = dbEdu.length > 0 ? dbEdu : EDUCATION

  const [filter, setFilter]   = useState('all')
  const [sortBy, setSortBy]   = useState('recent')

  const displayed = useMemo(() => {
    const filtered = filter === 'all'
      ? education
      : education.filter(e => e.type === filter)

    return [...filtered].sort((a, b) => {
      if (sortBy === 'recent') return getYear(b.period) - getYear(a.period)
      if (sortBy === 'oldest') return getYear(a.period) - getYear(b.period)
      if (sortBy === 'name')   return a.title.localeCompare(b.title, 'es')
      return (a.display_order ?? 99) - (b.display_order ?? 99)
    })
  }, [education, filter, sortBy])

  return (
    <section id="educacion" className="py-24 px-4 sm:px-6" style={{ background: '#09090b' }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="educación"
          title="Educación & Certificaciones"
          subtitle="Formación académica y capacitaciones profesionales."
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-10">
          {/* Filter tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {FILTER_TABS.map(({ key, label, icon: Icon }) => {
              const isActive = filter === key
              const isDegree = key === 'degree'
              const isCert   = key === 'certification'
              const activeColor = isDegree ? '#3b82f6' : isCert ? '#a78bfa' : '#3b82f6'
              const activeBg    = isDegree ? 'rgba(59,130,246,0.12)' : isCert ? 'rgba(139,92,246,0.12)' : 'rgba(59,130,246,0.12)'
              const activeBorder = isDegree ? 'rgba(59,130,246,0.35)' : isCert ? 'rgba(139,92,246,0.35)' : 'rgba(59,130,246,0.35)'
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-rajdhani font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? activeBg : 'rgba(24,24,27,0.8)',
                    border: isActive ? `1px solid ${activeBorder}` : '1px solid rgba(39,39,42,0.5)',
                    color: isActive ? activeColor : '#64748b',
                  }}
                >
                  <Icon size={14} />
                  {label}
                  <span
                    className="text-xs font-mono ml-0.5 px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? `${activeColor}20` : 'rgba(100,116,139,0.15)',
                      color: isActive ? activeColor : '#475569',
                    }}
                  >
                    {key === 'all'
                      ? education.length
                      : education.filter(e => e.type === key).length}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown size={13} className="text-slate-600 shrink-0" />
            {SORT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className="px-3 py-1 rounded-md text-xs font-mono transition-all duration-150"
                style={{
                  background: sortBy === key ? 'rgba(100,116,139,0.2)' : 'transparent',
                  border: sortBy === key ? '1px solid rgba(100,116,139,0.4)' : '1px solid transparent',
                  color: sortBy === key ? '#94a3b8' : '#475569',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="text-center text-slate-500 font-mono text-sm py-8">Cargando educación...</div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {displayed.map((item, i) => (
                <EducationCard key={item.id ?? item.title} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
