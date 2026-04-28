import { motion } from 'framer-motion'
import { Github, ExternalLink, FolderKanban } from 'lucide-react'
import { useTable } from '../../hooks/useSupabase'
import { PROJECTS } from '../../constants/portfolioData'
import SectionTitle from '../ui/SectionTitle'

function ProjectCard({ project, index }) {
  const techStack = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : (project.tech_stack ? project.tech_stack.split(',').map(t => t.trim()) : [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col p-6 rounded-2xl group transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(24,24,27,0.9)',
        border: project.featured ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(39,39,42,0.5)',
      }}
    >
      {project.featured && (
        <span
          className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full font-mono"
          style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
        >
          destacado
        </span>
      )}

      {/* Image */}
      {project.image_url ? (
        <div className="w-full h-40 rounded-xl overflow-hidden mb-5">
          <img src={project.image_url} alt={project.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="w-full h-40 rounded-xl mb-5 flex items-center justify-center"
          style={{ background: 'rgba(59,130,246,0.05)', border: '1px dashed rgba(59,130,246,0.15)' }}
        >
          <FolderKanban size={32} className="text-slate-600" />
        </div>
      )}

      <h3 className="font-orbitron text-base font-bold text-slate-100 mb-2">{project.name}</h3>
      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {techStack.map(tech => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Github size={14} /> Código
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ExternalLink size={14} /> Demo
          </a>
        )}
      </div>
    </motion.div>
  )
}

function EmptyProjects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <FolderKanban size={48} className="mx-auto mb-4 text-slate-700" />
      <p className="font-mono text-slate-500 text-sm mb-2">// próximamente</p>
      <p className="text-slate-600 text-sm">Agrega proyectos desde el panel de administrador.</p>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const { data: dbProjects, loading } = useTable('projects', { orderBy: 'display_order' })
  const projects = dbProjects.length > 0 ? dbProjects : PROJECTS

  return (
    <section id="proyectos" className="py-24 px-4 sm:px-6" style={{ background: '#09090b' }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="proyectos"
          title="Proyectos"
          subtitle="Selección de proyectos en los que he trabajado."
        />

        {loading ? (
          <div className="text-center text-slate-500 font-mono text-sm py-8">Cargando proyectos...</div>
        ) : projects.length === 0 ? (
          <EmptyProjects />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
