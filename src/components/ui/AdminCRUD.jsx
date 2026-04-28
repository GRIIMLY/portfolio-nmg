import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, AlertTriangle, Loader2 } from 'lucide-react'
import { useToast } from '../../context/ToastContext'

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl p-6 z-10 max-h-[90vh] overflow-y-auto"
        style={{ background: '#18181b', border: '1px solid rgba(59,130,246,0.2)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-orbitron text-base font-bold text-slate-100">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-sm rounded-2xl p-6 z-10"
        style={{ background: '#18181b', border: '1px solid rgba(239,68,68,0.3)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={20} className="text-red-400 shrink-0" />
          <h3 className="font-orbitron text-sm font-bold text-slate-100">Confirmar eliminación</h3>
        </div>
        <p className="text-slate-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-rajdhani font-semibold text-slate-400 transition-colors hover:text-slate-200"
            style={{ border: '1px solid rgba(39,39,42,0.8)' }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-rajdhani font-bold text-white transition-all"
            style={{ background: '#ef4444', boxShadow: '0 0 20px rgba(239,68,68,0.3)' }}
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function FormField({ label, name, type = 'text', value, onChange, placeholder, required, options }) {
  const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-slate-200 outline-none transition-all"
  const inputStyle = {
    background: 'rgba(9,9,11,0.8)',
    border: '1px solid rgba(39,39,42,0.8)',
  }
  const focusStyle = { borderColor: 'rgba(59,130,246,0.5)' }
  const blurStyle  = { borderColor: 'rgba(39,39,42,0.8)' }

  return (
    <div>
      <label className="text-xs font-mono text-slate-500 mb-1.5 block">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`${inputClass} resize-none`}
          style={inputStyle}
          onFocus={e => Object.assign(e.target.style, focusStyle)}
          onBlur={e => Object.assign(e.target.style, blurStyle)}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={inputClass}
          style={{ ...inputStyle, colorScheme: 'dark' }}
          onFocus={e => Object.assign(e.target.style, focusStyle)}
          onBlur={e => Object.assign(e.target.style, blurStyle)}
        >
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
            className="w-4 h-4 accent-cyan-400"
          />
          <span className="text-sm text-slate-300">{placeholder}</span>
        </label>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
          style={inputStyle}
          onFocus={e => Object.assign(e.target.style, focusStyle)}
          onBlur={e => Object.assign(e.target.style, blurStyle)}
        />
      )}
    </div>
  )
}

export function AdminCRUD({
  title,
  items,
  loading,
  emptyMessage,
  onAdd,
  onUpdate,
  onRemove,
  renderRow,
  renderForm,
  emptyForm,
  modalTitle,
  toolbar,
}) {
  const toast = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openAdd = () => {
    setForm(emptyForm)
    setModal('add')
  }

  const openEdit = (item) => {
    setForm({ ...emptyForm, ...item })
    setModal('edit')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    let err
    if (modal === 'add') {
      err = await onAdd(form)
      if (!err) toast('Elemento creado', 'success')
    } else {
      err = await onUpdate(form.id, form)
      if (!err) toast('Elemento actualizado', 'success')
    }
    if (err) toast(err.message || 'Error al guardar', 'error')
    setSaving(false)
    if (!err) setModal(null)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const err = await onRemove(deleteTarget.id)
    if (!err) toast('Elemento eliminado', 'success')
    else toast(err.message || 'Error al eliminar', 'error')
    setDeleteTarget(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-orbitron text-xl font-bold text-slate-100">{title}</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-rajdhani font-bold transition-all"
          style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
        >
          <Plus size={16} />
          Agregar
        </button>
      </div>

      {/* Toolbar (filter/sort) */}
      {toolbar && <div className="mb-4">{toolbar}</div>}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 size={24} className="animate-spin mr-2" />
          <span className="font-mono text-sm">Cargando...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-slate-600 font-mono text-sm">
          {emptyMessage || 'No hay elementos. Agrega el primero.'}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}
              >
                <div className="flex-1 min-w-0">
                  {renderRow(item)}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 transition-colors"
                    title="Editar"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <Modal title={modal === 'add' ? `Agregar ${modalTitle}` : `Editar ${modalTitle}`} onClose={() => setModal(null)}>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {renderForm(form, handleChange)}
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-rajdhani font-bold text-sm transition-all disabled:opacity-60 mt-2"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff' }}
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <ConfirmDialog
            message={`¿Eliminar este elemento? Esta acción no se puede deshacer.`}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
