import { useState, useMemo } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { useTable } from '../../hooks/useSupabase'
import { AdminCRUD, FormField } from '../../components/ui/AdminCRUD'

const CATEGORY_OPTIONS = [
  { value: 'backend',  label: 'Back-end' },
  { value: 'frontend', label: 'Front-end' },
  { value: 'database', label: 'Base de datos' },
  { value: 'devops',   label: 'DevOps & Otros' },
  { value: 'ia',       label: 'Inteligencia Artificial' },
]

const LEVEL_OPTIONS = [
  { value: 1, label: '1 — Básico' },
  { value: 2, label: '2 — Medio' },
  { value: 3, label: '3 — Avanzado' },
  { value: 4, label: '4 — Experto' },
  { value: 5, label: '5 — Master' },
]

const CATEGORY_LABELS = {
  backend: 'Back-end', frontend: 'Front-end',
  database: 'BD', devops: 'DevOps', ia: 'IA',
}

const LEVEL_LABELS = ['', 'Básico', 'Medio', 'Avanzado', 'Experto', 'Master']

const CATEGORY_COLORS = {
  backend:  { text: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)' },
  frontend: { text: '#a78bfa', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)' },
  database: { text: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  devops:   { text: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  ia:       { text: '#f472b6', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)' },
}

const CAT_TABS = [{ value: 'all', label: 'Todos' }, ...CATEGORY_OPTIONS]

const SORT_OPTIONS = [
  { key: 'order',      label: 'Orden' },
  { key: 'level_desc', label: 'Nivel ↓' },
  { key: 'level_asc',  label: 'Nivel ↑' },
  { key: 'name',       label: 'A-Z' },
]

const EMPTY_FORM = { name: '', category: 'backend', level: 3, display_order: 99 }

export default function ManageSkills() {
  const { data, loading, add, update, remove } = useTable('skills')

  const [filterCat, setFilterCat] = useState('all')
  const [sortBy, setSortBy]       = useState('order')

  const displayed = useMemo(() => {
    const base = filterCat === 'all' ? data : data.filter(s => s.category === filterCat)
    return [...base].sort((a, b) => {
      if (sortBy === 'level_desc') return b.level - a.level
      if (sortBy === 'level_asc')  return a.level - b.level
      if (sortBy === 'name')       return a.name.localeCompare(b.name, 'es')
      return (a.display_order ?? 99) - (b.display_order ?? 99)
    })
  }, [data, filterCat, sortBy])

  const toolbar = (
    <div className="flex flex-col gap-2">
      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {CAT_TABS.map(({ value, label }) => {
          const isActive = filterCat === value
          const col = value === 'all' ? null : CATEGORY_COLORS[value]
          return (
            <button
              key={value}
              onClick={() => setFilterCat(value)}
              className="px-3 py-1.5 rounded-lg text-xs font-rajdhani font-semibold transition-all duration-150"
              style={{
                background: isActive ? (col?.bg ?? 'rgba(59,130,246,0.12)') : 'rgba(24,24,27,0.8)',
                border:     isActive ? `1px solid ${col?.border ?? 'rgba(59,130,246,0.35)'}` : '1px solid rgba(39,39,42,0.5)',
                color:      isActive ? (col?.text ?? '#3b82f6') : '#64748b',
              }}
            >
              {label}
              {value !== 'all' && (
                <span className="ml-1 opacity-60">
                  ({data.filter(s => s.category === value).length})
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Sort + count */}
      <div className="flex flex-wrap items-center gap-1.5">
        <ArrowUpDown size={12} className="text-slate-600" />
        {SORT_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className="px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150"
            style={{
              background: sortBy === key ? 'rgba(100,116,139,0.2)' : 'transparent',
              border:     sortBy === key ? '1px solid rgba(100,116,139,0.35)' : '1px solid transparent',
              color:      sortBy === key ? '#94a3b8' : '#475569',
            }}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto text-xs font-mono text-slate-600">
          {displayed.length} / {data.length}
        </span>
      </div>
    </div>
  )

  return (
    <AdminCRUD
      title="Habilidades"
      items={displayed}
      loading={loading}
      emptyMessage="No hay habilidades."
      emptyForm={EMPTY_FORM}
      modalTitle="habilidad"
      onAdd={add}
      onUpdate={update}
      onRemove={remove}
      toolbar={toolbar}
      renderRow={(item) => {
        const col = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.backend
        return (
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span
              className="text-xs px-2 py-0.5 rounded font-mono shrink-0"
              style={{ color: col.text, border: `1px solid ${col.border}`, background: col.bg }}
            >
              {CATEGORY_LABELS[item.category] || item.category}
            </span>
            <span className="font-rajdhani font-semibold text-slate-200 text-sm truncate">
              {item.name}
            </span>
            <div className="flex items-center gap-2 ml-auto shrink-0">
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                {LEVEL_LABELS[item.level]}
              </span>
              <div className="w-16 h-1 rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(item.level / 5) * 100}%`, background: col.text }}
                />
              </div>
            </div>
          </div>
        )
      }}
      renderForm={(form, handleChange) => (
        <>
          <FormField label="Nombre" name="name" value={form.name} onChange={handleChange} placeholder="Ej: Spring Boot" required />
          <FormField label="Categoría" name="category" type="select" value={form.category} onChange={handleChange} options={CATEGORY_OPTIONS} />
          <FormField label="Nivel" name="level" type="select" value={form.level} onChange={handleChange}
            options={LEVEL_OPTIONS.map(o => ({ ...o, value: String(o.value) }))} />
          <FormField label="Orden de visualización" name="display_order" type="number" value={form.display_order} onChange={handleChange} placeholder="99" />
        </>
      )}
    />
  )
}
