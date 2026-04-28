import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Save, Loader2, Info, User, Upload, Trash2, ImageIcon, CheckCircle2 } from 'lucide-react'
import { useConfig } from '../../hooks/useSupabase'
import { useToast } from '../../context/ToastContext'
import { FormField } from '../../components/ui/AdminCRUD'
import { HERO } from '../../constants/portfolioData'
import { isConfigured } from '../../lib/supabase'

const MAX_SIDE = 400
const JPEG_QUALITY = 0.82

function compressToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const ratio = Math.min(MAX_SIDE / img.width, MAX_SIDE / img.height, 1)
        const w = Math.round(img.width  * ratio)
        const h = Math.round(img.height * ratio)
        const canvas = document.createElement('canvas')
        canvas.width  = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function base64KiB(b64) {
  return Math.round((b64.length - b64.indexOf(',') - 1) * 0.75 / 1024)
}

export default function ManageHero() {
  const { data: dbData, loading, save } = useConfig('hero')
  const toast    = useToast()
  const fileRef  = useRef(null)
  const [saving,     setSaving]     = useState(false)
  const [compressing, setCompressing] = useState(false)

  const defaults = {
    name:       HERO.name,
    title:      HERO.title,
    description:HERO.description,
    github:     HERO.github,
    linkedin:   HERO.linkedin,
    email:      HERO.email,
    phone:      HERO.phone,
    location:   HERO.location,
    roles:      HERO.roles.join('\n'),
    avatar_url: '',
  }
  const [form, setForm] = useState(null)
  const current = form ?? (
    dbData
      ? { ...defaults, ...dbData, roles: Array.isArray(dbData.roles) ? dbData.roles.join('\n') : (dbData.roles ?? defaults.roles) }
      : defaults
  )

  const patch = (fields) => setForm(f => ({ ...(f ?? current), ...fields }))

  const handleChange = (e) => {
    const { name, value } = e.target
    patch({ [name]: value })
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    if (file.size > 5 * 1024 * 1024) {
      toast('Imagen demasiado grande (máx. 5 MB)', 'error')
      return
    }

    setCompressing(true)
    try {
      const b64 = await compressToBase64(file)
      patch({ avatar_url: b64 })
      toast(`Imagen lista · ${base64KiB(b64)} KB`, 'success')
    } catch {
      toast('Error al procesar la imagen', 'error')
    } finally {
      setCompressing(false)
    }
  }

  const removePhoto = () => patch({ avatar_url: '' })

  const handleSave = async (e) => {
    e.preventDefault()
    if (!isConfigured) { toast('Configura Supabase para guardar cambios', 'error'); return }
    setSaving(true)
    const toSave = { ...current, roles: current.roles.split('\n').filter(Boolean) }
    const err = await save(toSave)
    if (!err) toast('Hero actualizado', 'success')
    else toast(err.message || 'Error al guardar', 'error')
    setSaving(false)
  }

  if (loading) return (
    <div className="flex items-center gap-2 text-slate-500 font-mono text-sm py-8">
      <Loader2 size={18} className="animate-spin" /> Cargando...
    </div>
  )

  const hasPhoto = Boolean(current.avatar_url)
  const photoKiB = hasPhoto ? base64KiB(current.avatar_url) : 0

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-orbitron text-xl font-bold text-slate-100 mb-1">Hero / Inicio</h1>
        <p className="text-slate-500 text-sm">Edita el contenido de la sección principal del portfolio.</p>
      </div>

      {!isConfigured && (
        <div className="mb-6 p-4 rounded-xl flex items-start gap-3"
          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <Info size={16} className="text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-yellow-400 text-xs">Supabase no configurado — los cambios no se guardarán permanentemente.</p>
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-2xl">

        {/* Información personal */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl" style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
          <h3 className="font-orbitron text-sm text-cyan-400 mb-4">Información personal</h3>
          <div className="flex flex-col gap-4">
            <FormField label="Nombre completo" name="name" value={current.name} onChange={handleChange} />
            <FormField label="Título principal" name="title" value={current.title} onChange={handleChange} />
            <FormField label="Descripción / Bio" name="description" type="textarea" value={current.description} onChange={handleChange} />
            <FormField label="Roles animados (uno por línea)" name="roles" type="textarea" value={current.roles} onChange={handleChange}
              placeholder={'Full Stack Developer\n.NET & Angular Specialist'} />
          </div>
        </motion.div>

        {/* Foto de perfil */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="p-5 rounded-xl" style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon size={14} className="text-cyan-400" />
            <h3 className="font-orbitron text-sm text-cyan-400">Foto de perfil</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Preview */}
            <div
              className="w-28 h-28 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
              style={{ background: 'rgba(9,9,11,0.8)', border: `1px solid ${hasPhoto ? 'rgba(59,130,246,0.35)' : 'rgba(39,39,42,0.6)'}` }}
            >
              {compressing ? (
                <Loader2 size={24} className="animate-spin text-slate-600" />
              ) : hasPhoto ? (
                <img src={current.avatar_url} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User size={36} className="text-slate-700" />
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              {/* Hidden file input */}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFile}
              />

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={compressing}
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-rajdhani font-bold transition-all disabled:opacity-50"
                  style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
                >
                  {compressing ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                  {compressing ? 'Comprimiendo…' : hasPhoto ? 'Cambiar foto' : 'Subir foto'}
                </button>

                {hasPhoto && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-rajdhani font-bold transition-all"
                    style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }}
                  >
                    <Trash2 size={15} />
                    Eliminar
                  </button>
                )}
              </div>

              {/* Status */}
              {hasPhoto ? (
                <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: '#34d399' }}>
                  <CheckCircle2 size={13} />
                  Imagen lista · {photoKiB} KB · se guardará en la BD
                </div>
              ) : (
                <p className="text-xs text-slate-600 font-mono leading-relaxed">
                  JPG · PNG · WEBP — máx. 5 MB.<br />
                  Se comprime automáticamente a 400×400 px antes de guardar.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Contacto & Redes */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
          className="p-5 rounded-xl" style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
          <h3 className="font-orbitron text-sm text-cyan-400 mb-4">Contacto & Redes</h3>
          <div className="flex flex-col gap-4">
            <FormField label="Email" name="email" type="email" value={current.email} onChange={handleChange} />
            <FormField label="Teléfono" name="phone" value={current.phone} onChange={handleChange} />
            <FormField label="Ubicación" name="location" value={current.location} onChange={handleChange} />
            <FormField label="URL LinkedIn" name="linkedin" type="url" value={current.linkedin} onChange={handleChange} />
            <FormField label="URL GitHub" name="github" type="url" value={current.github} onChange={handleChange} />
          </div>
        </motion.div>

        <button
          type="submit"
          disabled={saving || compressing}
          className="self-start flex items-center gap-2 px-6 py-3 rounded-xl font-rajdhani font-bold text-sm transition-all disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff' }}
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}
