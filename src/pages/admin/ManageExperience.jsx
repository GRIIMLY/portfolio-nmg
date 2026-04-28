import { useTable } from '../../hooks/useSupabase'
import { AdminCRUD, FormField } from '../../components/ui/AdminCRUD'

const EMPTY_FORM = {
  company: '',
  role: '',
  period: '',
  is_current: false,
  description: '',
  tech_stack: '',
  display_order: 99,
}

export default function ManageExperience() {
  const { data, loading, add, update, remove } = useTable('experience')

  const toDb = (form) => ({
    ...form,
    description: form.description
      ? form.description.split('\n').filter(Boolean)
      : [],
    tech_stack: form.tech_stack
      ? form.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
      : [],
    display_order: Number(form.display_order) || 99,
    is_current: Boolean(form.is_current),
  })

  const toForm = (item) => ({
    ...item,
    description: Array.isArray(item.description) ? item.description.join('\n') : item.description || '',
    tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(', ') : item.tech_stack || '',
  })

  return (
    <AdminCRUD
      title="Experiencia Laboral"
      items={data}
      loading={loading}
      emptyMessage="No hay experiencia laboral guardada."
      emptyForm={EMPTY_FORM}
      modalTitle="experiencia"
      onAdd={(form) => add(toDb(form))}
      onUpdate={(id, form) => update(id, toDb(form))}
      onRemove={remove}
      renderRow={(item) => (
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-orbitron text-sm font-bold text-slate-200">{item.role}</span>
            {item.is_current && (
              <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                actual
              </span>
            )}
          </div>
          <span className="text-xs font-mono" style={{ color: '#3b82f6' }}>{item.company}</span>
          <span className="text-xs text-slate-500 ml-3">{item.period}</span>
        </div>
      )}
      renderForm={(form, handleChange) => {
        const displayForm = form.id ? toForm(form) : form
        return (
          <>
            <FormField label="Empresa" name="company" value={displayForm.company} onChange={handleChange} placeholder="Ej: Redesis S.A.S" required />
            <FormField label="Rol / Cargo" name="role" value={displayForm.role} onChange={handleChange} placeholder="Ej: Full Stack Developer Senior" required />
            <FormField label="Período" name="period" value={displayForm.period} onChange={handleChange} placeholder="Ej: Agosto 2019 — Agosto 2024" required />
            <FormField label="" name="is_current" type="checkbox" value={displayForm.is_current} onChange={handleChange} placeholder="Es el trabajo actual" />
            <FormField
              label="Descripción (una línea por ítem)"
              name="description"
              type="textarea"
              value={displayForm.description}
              onChange={handleChange}
              placeholder={"Desarrollé X con Y\nImplementé Z"}
            />
            <FormField
              label="Stack tecnológico (separado por comas)"
              name="tech_stack"
              value={displayForm.tech_stack}
              onChange={handleChange}
              placeholder=".NET 8, Angular 18, SQL Server"
            />
            <FormField label="Orden de visualización" name="display_order" type="number" value={displayForm.display_order} onChange={handleChange} />
          </>
        )
      }}
    />
  )
}
