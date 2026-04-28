import { useState, useMemo } from 'react'
import { GraduationCap, Award, LayoutGrid, ArrowUpDown } from 'lucide-react'
import { useTable } from '../../hooks/useSupabase'
import { AdminCRUD, FormField } from '../../components/ui/AdminCRUD'

const TYPE_OPTIONS = [
  { value: 'degree',        label: 'Educación formal' },
  { value: 'certification', label: 'Certificación / Curso' },
]

const TYPE_COLORS = {
  degree:        { text: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)' },
  certification: { text: '#a78bfa', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)' },
}

const TYPE_LABELS = { degree: 'Educación', certification: 'Certificación' }

const FILTER_TABS = [
  { key: 'all',           label: 'Todos',          icon: LayoutGrid },
  { key: 'degree',        label: 'Educación',       icon: GraduationCap },
  { key: 'certification', label: 'Certificaciones', icon: Award },
]

const SORT_OPTIONS = [
  { key: 'recent', label: 'Más reciente' },
  { key: 'oldest', label: 'Más antiguo' },
  { key: 'name',   label: 'A-Z' },
  { key: 'order',  label: 'Orden' },
]

function getYear(period = '') {
  const years = period.match(/\d{4}/g)
  return years ? parseInt(years[years.length - 1]) : 0
}

const EMPTY_FORM = {
  title: '', institution: '', period: '',
  type: 'degree', description: '', display_order: 99,
}

export default function ManageEducation() {
  const { data, loading, add, update, remove } = useTable('education')

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const displayed = useMemo(() => {
    const base = filter === 'all' ? data : data.filter(e => e.type === filter)
    return [...base].sort((a, b) => {
      if (sortBy === 'recent') return getYear(b.period) - getYear(a.period)
      if (sortBy === 'oldest') return getYear(a.period) - getYear(b.period)
      if (sortBy === 'name')   return a.title.localeCompare(b.title, 'es')
      return (a.display_order ?? 99) - (b.display_order ?? 99)
    })
  }, [data, filter, sortBy])

  const toolbar = (
    <div className="flex flex-col gap-2">
      {/* Type filter */}
      <div className="flex flex-wrap gap-1.5">
        {FILTER_TABS.map(({ key, label, icon: Icon }) => {
          const isActive = filter === key
          const col = TYPE_COLORS[key]
          const activeColor  = col?.text   ?? '#3b82f6'
          const activeBg     = col?.bg     ?? 'rgba(59,130,246,0.12)'
          const activeBorder = col?.border ?? 'rgba(59,130,246,0.35)'
          const count = key === 'all' ? data.length : data.filter(e => e.type === key).length
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-rajdhani font-semibold transition-all duration-150"
              style={{
                background: isActive ? activeBg : 'rgba(24,24,27,0.8)',
                border:     isActive ? `1px solid ${activeBorder}` : '1px solid rgba(39,39,42,0.5)',
                color:      isActive ? activeColor : '#64748b',
              }}
            >
              <Icon size={12} />
              {label}
              <span className="font-mono opacity-60">({count})</span>
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
      title="Educación & Certificaciones"
      items={displayed}
      loading={loading}
      emptyMessage="No hay educación guardada."
      emptyForm={EMPTY_FORM}
      modalTitle="elemento"
      onAdd={add}
      onUpdate={update}
      onRemove={remove}
      toolbar={toolbar}
      renderRow={(item) => {
        const col = TYPE_COLORS[item.type] || TYPE_COLORS.degree
        return (
          <div className="flex flex-wrap items-start gap-2 min-w-0">
            <span
              className="text-xs px-1.5 py-0.5 rounded font-mono shrink-0 mt-0.5"
              style={{ color: col.text, background: col.bg, border: `1px solid ${col.border}` }}
            >
              {TYPE_LABELS[item.type]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-rajdhani font-semibold text-slate-200 text-sm truncate">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 font-mono truncate">
                {item.institution}
                {item.period && <> · {item.period}</>}
              </p>
            </div>
          </div>
        )
      }}
      renderForm={(form, handleChange) => (
        <>
          <FormField label="Título / Nombre" name="title" value={form.title} onChange={handleChange} placeholder="Ej: Ingeniería de Sistemas" required />
          <FormField label="Institución" name="institution" value={form.institution} onChange={handleChange} placeholder="Ej: Universidad ECCI" required />
          <FormField label="Período" name="period" value={form.period} onChange={handleChange} placeholder="Ej: 2020 — 2024" />
          <FormField label="Tipo" name="type" type="select" value={form.type} onChange={handleChange} options={TYPE_OPTIONS} />
          <FormField label="Descripción" name="description" type="textarea" value={form.description} onChange={handleChange} placeholder="Descripción breve..." />
          <FormField label="Orden de visualización" name="display_order" type="number" value={form.display_order} onChange={handleChange} />
        </>
      )}
    />
  )
}
