import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import { useTable } from '../../hooks/useSupabase'
import { SKILLS } from '../../constants/portfolioData'
import SectionTitle from '../ui/SectionTitle'

const CATEGORIES = [
  { key: 'all',      label: 'Todos' },
  { key: 'backend',  label: 'Back-end' },
  { key: 'frontend', label: 'Front-end' },
  { key: 'database', label: 'Base de datos' },
  { key: 'devops',   label: 'DevOps & Otros' },
  { key: 'ia',       label: 'IA' },
]

const CATEGORY_COLORS = {
  backend:  { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.35)', text: '#3b82f6' },
  frontend: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', text: '#a78bfa' },
  database: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)', text: '#34d399' },
  devops:   { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', text: '#fbbf24' },
  ia:       { bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.35)', text: '#f472b6' },
}

const ALL_COLOR = { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', text: '#3b82f6' }

const SORT_OPTIONS = [
  { key: 'order',      label: 'Relevancia' },
  { key: 'level_desc', label: 'Nivel ↓' },
  { key: 'level_asc',  label: 'Nivel ↑' },
  { key: 'name',       label: 'A-Z' },
]

const LEVEL_LABELS = ['', 'Básico', 'Medio', 'Avanzado', 'Experto', 'Master']

function SkillCard({ skill, index }) {
  const colors = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS.backend
  const pct = (skill.level / 5) * 100

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="p-4 rounded-xl"
      style={{ background: 'rgba(24,24,27,0.8)', border: `1px solid ${colors.border}` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-rajdhani font-semibold text-slate-200 text-sm">{skill.name}</span>
        <span className="text-xs font-mono" style={{ color: colors.text }}>
          {LEVEL_LABELS[skill.level] || ''}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, delay: index * 0.03 + 0.1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${colors.text}88, ${colors.text})` }}
        />
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const { data: dbSkills, loading } = useTable('skills')
  const skills = dbSkills.length > 0 ? dbSkills : SKILLS

  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('order')

  const displayed = useMemo(() => {
    const filtered = activeCategory === 'all'
      ? skills
      : skills.filter(s => s.category === activeCategory)

    return [...filtered].sort((a, b) => {
      if (sortBy === 'level_desc') return b.level - a.level
      if (sortBy === 'level_asc')  return a.level - b.level
      if (sortBy === 'name')       return a.name.localeCompare(b.name, 'es')
      return (a.display_order ?? 99) - (b.display_order ?? 99)
    })
  }, [skills, activeCategory, sortBy])

  return (
    <section id="habilidades" className="py-24 px-4 sm:px-6" style={{ background: '#09090b' }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="habilidades"
          title="Stack Tecnológico"
          subtitle="Tecnologías con las que construyo soluciones robustas y escalables."
        />

        {/* Controls */}
        <div className="flex flex-col gap-3 mb-10">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(({ key, label }) => {
              const isActive = activeCategory === key
              const col = key === 'all' ? ALL_COLOR : CATEGORY_COLORS[key]
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className="px-4 py-2 rounded-lg text-sm font-rajdhani font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? col.bg : 'rgba(24,24,27,0.8)',
                    border: isActive ? `1px solid ${col.border}` : '1px solid rgba(39,39,42,0.5)',
                    color: isActive ? col.text : '#64748b',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Sort + count */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <ArrowUpDown size={13} className="text-slate-600" />
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
            <span className="ml-2 text-xs font-mono text-slate-600">
              {displayed.length} {displayed.length === 1 ? 'habilidad' : 'habilidades'}
            </span>
          </div>
        </div>

        {/* Skills grid */}
        {loading ? (
          <div className="text-center text-slate-500 font-mono text-sm">Cargando habilidades...</div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <AnimatePresence mode="popLayout">
              {displayed.map((skill, i) => (
                <SkillCard key={skill.id ?? skill.name} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
