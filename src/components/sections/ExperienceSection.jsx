import { motion } from 'framer-motion'
import { Briefcase, CheckCircle, Calendar } from 'lucide-react'
import { useTable } from '../../hooks/useSupabase'
import { EXPERIENCE } from '../../constants/portfolioData'
import SectionTitle from '../ui/SectionTitle'

function ExperienceCard({ job, index }) {
  const isEven = index % 2 === 0
  const descriptions = Array.isArray(job.description)
    ? job.description
    : (job.description ? [job.description] : [])
  const techStack = Array.isArray(job.tech_stack)
    ? job.tech_stack
    : (job.tech_stack ? job.tech_stack.split(',').map(t => t.trim()) : [])

  return (
    <div className={`relative flex gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}>
      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center shrink-0" style={{ width: 48 }}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, type: 'spring' }}
          className="w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{
            background: job.is_current
              ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
              : 'rgba(24,24,27,0.9)',
            border: job.is_current ? 'none' : '2px solid rgba(59,130,246,0.3)',
          }}
        >
          <Briefcase size={16} className={job.is_current ? 'text-white' : 'text-cyan-400'} />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="flex-1 p-6 rounded-2xl mb-8"
        style={{
          background: 'rgba(24,24,27,0.9)',
          border: job.is_current ? '1px solid rgba(59,130,246,0.25)' : '1px solid rgba(39,39,42,0.5)',
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-orbitron text-base font-bold text-slate-100 mb-1">{job.role}</h3>
            <p className="font-rajdhani font-semibold text-sm" style={{ color: '#3b82f6' }}>
              {job.company}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Calendar size={12} />
              {job.period}
            </div>
            {job.is_current && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                Actual
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <ul className="space-y-2 mb-4">
          {descriptions.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
              <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: '#10b981' }} />
              {item}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map(tech => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-md font-mono"
              style={{
                background: 'rgba(59,130,246,0.07)',
                border: '1px solid rgba(59,130,246,0.15)',
                color: '#94a3b8',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function ExperienceSection() {
  const { data: dbExp, loading } = useTable('experience')
  const experience = dbExp.length > 0 ? dbExp : EXPERIENCE

  return (
    <section id="experiencia" className="py-24 px-4 sm:px-6" style={{ background: '#09090b' }}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          label="experiencia"
          title="Experiencia Laboral"
          subtitle="Mi trayectoria profesional construyendo software de impacto."
        />

        {/* Timeline line */}
        <div className="relative">
          <div
            className="hidden md:block absolute left-6 top-5 bottom-5 w-px"
            style={{ background: 'linear-gradient(to bottom, #3b82f644, #8b5cf644, transparent)' }}
          />

          {loading ? (
            <div className="text-center text-slate-500 font-mono text-sm py-8">Cargando experiencia...</div>
          ) : (
            experience
              .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
              .map((job, i) => (
                <ExperienceCard key={job.id} job={job} index={i} />
              ))
          )}
        </div>
      </div>
    </section>
  )
}
