import { useTable } from '../../hooks/useSupabase'
import { AdminCRUD, FormField } from '../../components/ui/AdminCRUD'
import { FolderKanban } from 'lucide-react'

const EMPTY_FORM = {
  name: '',
  description: '',
  tech_stack: '',
  github_url: '',
  demo_url: '',
  image_url: '',
  featured: false,
  display_order: 99,
}

export default function ManageProjects() {
  const { data, loading, add, update, remove } = useTable('projects')

  const toDb = (form) => ({
    ...form,
    tech_stack: form.tech_stack
      ? form.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
      : [],
    display_order: Number(form.display_order) || 99,
    featured: Boolean(form.featured),
  })

  const toForm = (item) => ({
    ...item,
    tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(', ') : item.tech_stack || '',
  })

  return (
    <AdminCRUD
      title="Proyectos"
      items={data}
      loading={loading}
      emptyMessage={
        <div className="flex flex-col items-center gap-3 py-8">
          <FolderKanban size={40} className="text-slate-700" />
          <p>Agrega tu primer proyecto para que aparezca en el portfolio.</p>
        </div>
      }
      emptyForm={EMPTY_FORM}
      modalTitle="proyecto"
      onAdd={(form) => add(toDb(form))}
      onUpdate={(id, form) => update(id, toDb(form))}
      onRemove={remove}
      renderRow={(item) => (
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            {item.featured && (
              <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                destacado
              </span>
            )}
            <span className="font-orbitron text-sm font-bold text-slate-200">{item.name}</span>
          </div>
          <p className="text-xs text-slate-500 truncate">{item.description}</p>
        </div>
      )}
      renderForm={(form, handleChange) => {
        const f = form.id ? toForm(form) : form
        return (
          <>
            <FormField label="Nombre del proyecto" name="name" value={f.name} onChange={handleChange} placeholder="Ej: Sistema de inventarios" required />
            <FormField label="Descripción" name="description" type="textarea" value={f.description} onChange={handleChange} placeholder="Breve descripción del proyecto..." />
            <FormField label="Stack tecnológico (comas)" name="tech_stack" value={f.tech_stack} onChange={handleChange} placeholder=".NET 8, Angular, SQL Server" />
            <FormField label="URL GitHub" name="github_url" type="url" value={f.github_url} onChange={handleChange} placeholder="https://github.com/..." />
            <FormField label="URL Demo / Deploy" name="demo_url" type="url" value={f.demo_url} onChange={handleChange} placeholder="https://..." />
            <FormField label="URL Imagen / Screenshot" name="image_url" type="url" value={f.image_url} onChange={handleChange} placeholder="https://..." />
            <FormField label="" name="featured" type="checkbox" value={f.featured} onChange={handleChange} placeholder="Proyecto destacado" />
            <FormField label="Orden de visualización" name="display_order" type="number" value={f.display_order} onChange={handleChange} />
          </>
        )
      }}
    />
  )
}
