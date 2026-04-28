import { useMemo } from 'react'
import { Github, Linkedin, Mail, Code2 } from 'lucide-react'
import { HERO } from '../../constants/portfolioData'
import { useConfig } from '../../hooks/useSupabase'

export default function Footer() {
  const { data: heroDb } = useConfig('hero')
  const hero = useMemo(() => ({ ...HERO, ...heroDb }), [heroDb])

  const year = new Date().getFullYear()
  const nameParts = hero.name.split(' ')
  const firstName = nameParts.slice(0, 2).join(' ')
  const lastName  = nameParts.slice(2, 3).join(' ')

  return (
    <footer
      className="border-t"
      style={{ borderColor: 'rgba(59,130,246,0.1)', background: '#09090b' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
              <Code2 size={16} className="text-white" />
            </div>
            <div>
              <p className="font-orbitron text-sm font-bold text-slate-100">
                {firstName}
                {lastName && <span style={{ color: '#3b82f6' }}> {lastName.charAt(0)}.</span>}
              </p>
              <p className="text-slate-500 text-xs font-mono">{hero.title || 'Full Stack Developer'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hero.linkedin && (
              <a
                href={hero.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors"
                style={{ border: '1px solid rgba(100,116,139,0.2)' }}
              >
                <Linkedin size={16} />
              </a>
            )}
            {hero.github && (
              <a
                href={hero.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors"
                style={{ border: '1px solid rgba(100,116,139,0.2)' }}
              >
                <Github size={16} />
              </a>
            )}
            {hero.email && (
              <a
                href={`mailto:${hero.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors"
                style={{ border: '1px solid rgba(100,116,139,0.2)' }}
              >
                <Mail size={16} />
              </a>
            )}
          </div>

          <p className="text-slate-600 text-xs font-mono text-center">
            © {year} {hero.name} · Built with React + Vite
          </p>
        </div>
      </div>
    </footer>
  )
}
