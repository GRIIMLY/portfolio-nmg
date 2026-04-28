import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Key, Database, Globe, Copy, Check, Eye, EyeOff } from 'lucide-react'
import { isConfigured } from '../../lib/supabase'
import { useConfig } from '../../hooks/useSupabase'
import { useToast } from '../../context/ToastContext'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="p-1.5 rounded-lg text-slate-600 hover:text-cyan-400 transition-colors"
      style={{ border: '1px solid rgba(39,39,42,0.5)' }}>
      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
    </button>
  )
}

const SUPABASE_SQL = `-- Ejecutar en Supabase → SQL Editor

create table if not exists site_config (
  section text primary key,
  content jsonb not null default '{}'
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level integer not null default 3,
  display_order integer default 99
);

create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  period text not null,
  is_current boolean default false,
  description jsonb default '[]',
  tech_stack jsonb default '[]',
  display_order integer default 99
);

create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  institution text not null,
  period text,
  type text default 'degree',
  description text,
  display_order integer default 99
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  tech_stack jsonb default '[]',
  github_url text,
  demo_url text,
  image_url text,
  featured boolean default false,
  display_order integer default 99
);

-- RLS: lectura pública, escritura libre (ajusta con Auth si lo necesitas)
alter table site_config enable row level security;
alter table skills enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table projects enable row level security;

create policy "Public read" on site_config for select using (true);
create policy "Public read" on skills for select using (true);
create policy "Public read" on experience for select using (true);
create policy "Public read" on education for select using (true);
create policy "Public read" on projects for select using (true);
create policy "Anon write" on site_config for all using (true) with check (true);
create policy "Anon write" on skills for all using (true) with check (true);
create policy "Anon write" on experience for all using (true) with check (true);
create policy "Anon write" on education for all using (true) with check (true);
create policy "Anon write" on projects for all using (true) with check (true);`

const SEED_SQL = `-- SEED INICIAL — Portfolio Nicolas Morales Galindo
-- Limpia e inserta todos los datos del CV.

TRUNCATE TABLE projects  RESTART IDENTITY CASCADE;
TRUNCATE TABLE education RESTART IDENTITY CASCADE;
TRUNCATE TABLE experience RESTART IDENTITY CASCADE;
TRUNCATE TABLE skills    RESTART IDENTITY CASCADE;
DELETE FROM site_config WHERE section IN ('hero', 'visibility');

-- Hero
INSERT INTO site_config (section, content) VALUES (
  'hero',
  '{"name":"Nicolas Morales Galindo","title":"Desarrollador Full Stack","description":"Ingeniero de Sistemas con más de 6 años de experiencia en el diseño, desarrollo y mantenimiento de sistemas de información. Especializado en .NET, Angular y microservicios. Comprometido con la calidad del código, SOLID y Clean Code.","roles":["Full Stack Developer",".NET & Angular Specialist","Java & Spring Boot Dev","Microservices Architect"],"email":"nicolasmoga12@gmail.com","phone":"+57 3202900758","location":"Bogotá, Colombia — Localidad Suba","linkedin":"https://www.linkedin.com/in/nicolas-morales-galindo","github":"https://github.com/NicolasMoralesGalindo"}'::jsonb
) ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content;

-- Visibilidad (proyectos ocultos por defecto)
INSERT INTO site_config (section, content) VALUES (
  'visibility', '{"show_projects": false}'::jsonb
) ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content;

-- Skills — Back-end
INSERT INTO skills (name, category, level, display_order) VALUES
  ('Java','backend',5,1),('.NET Core / .NET 6','backend',5,2),('Spring Boot','backend',5,3),
  ('.NET 8','backend',4,4),('Entity Framework','backend',4,5),('JPA','backend',4,6),
  ('Microservicios','backend',5,7),('REST APIs','backend',5,8),('JWT','backend',4,9),('Swagger','backend',4,10);

-- Skills — Front-end
INSERT INTO skills (name, category, level, display_order) VALUES
  ('Angular 18','frontend',5,1),('Angular 10','frontend',5,2),('TypeScript','frontend',4,3),
  ('HTML / CSS / JS','frontend',5,4),('PrimeNG','frontend',4,5),
  ('Angular Material','frontend',4,6),('Ionic','frontend',3,7);

-- Skills — Base de datos
INSERT INTO skills (name, category, level, display_order) VALUES
  ('MySQL','database',5,1),('SQL Server','database',5,2),('Oracle','database',3,3),('Liquibase','database',3,4);

-- Skills — DevOps
INSERT INTO skills (name, category, level, display_order) VALUES
  ('Docker','devops',4,1),('Git','devops',5,2),('Jenkins','devops',3,3),
  ('Azure DevOps','devops',4,4),('Netflix OSS','devops',3,5),('Maven','devops',4,6),('Python','devops',3,7);

-- Experiencia
INSERT INTO experience (company, role, period, is_current, description, tech_stack, display_order) VALUES
(
  'Double V Partner NYX','Desarrollador FullStack Semi Senior','Agosto 2024 — Actualidad',true,
  '["Desarrollo de aplicaciones web con .NET 8 (Back-end) y Angular 18 (Front-end).","Trabajo con bases de datos SQL Server para almacenamiento y gestión de datos.","Migración de datos entre sistemas utilizando Python.","Uso de Azure DevOps para gestión de proyectos y control de versiones."]'::jsonb,
  '[".NET 8","Angular 18","SQL Server","Python","Azure DevOps"]'::jsonb, 1
),
(
  'Redesis S.A.S','Ingeniero De Desarrollo Semi Senior','Agosto 2019 — Agosto 2024',false,
  '["Desarrollo de proyectos utilizando .NET 6, Angular 10 y SQL Server.","Desarrollo de API con Spring Boot, Swagger y SQL Server.","A cargo de un producto de la compañía: desarrollo, soporte y mantenimiento con Java, JSF, EJB, JDBC, Liquibase, Maven, MySQL, JBoss y PrimeFaces."]'::jsonb,
  '[".NET 6","Angular 10","Spring Boot","Java","SQL Server","MySQL"]'::jsonb, 2
),
(
  'Samtel Consultores S.A.S','Java Developer','Enero 2019 — Julio 2019',false,
  '["Modelado y gestión de bases de datos MySQL.","Desarrollo de microservicios con Java, Spring Boot, JPA, JWT y Netflix OSS.","Aplicando la metodología ágil SCRUM y utilizando Git como control de versiones."]'::jsonb,
  '["Java","Spring Boot","JPA","JWT","MySQL","Netflix OSS","SCRUM"]'::jsonb, 3
);

-- Educación
INSERT INTO education (title, institution, period, type, description, display_order) VALUES
  ('Ingeniería de Sistemas','Universidad ECCI — Bogotá D.C','2020 — 2024','degree','Pregrado en Ingeniería de Sistemas.',1),
  ('Tecnólogo en Análisis y Desarrollo de Sistemas de Información','SENA — Bogotá D.C','2017 — 2019','degree','Tecnología en Análisis y Desarrollo de Sistemas de Información.',2),
  ('AZ-900 Azure Fundamentals','Microsoft','2023','certification','Certificación oficial de Microsoft en fundamentos de Azure.',3),
  ('.NET 6','Udemy','2023','certification','Curso avanzado de .NET 6 — 16 horas.',4),
  ('Angular Avanzado','Udemy','2022','certification','Curso de Angular Avanzado — 32 horas.',5),
  ('Principios SOLID','Udemy','2022','certification','Principios SOLID y Clean Code — 6.5 horas.',6);

-- Verificar
SELECT 'site_config' AS tabla, count(*) FROM site_config
UNION ALL SELECT 'skills', count(*) FROM skills
UNION ALL SELECT 'experience', count(*) FROM experience
UNION ALL SELECT 'education', count(*) FROM education;`

function VisibilityToggle() {
  const { data: visibility, loading, save } = useConfig('visibility')
  const toast = useToast()
  const [saving, setSaving] = useState(false)

  const showProjects = loading ? true : visibility?.show_projects !== false

  const toggle = async () => {
    if (!isConfigured) { toast('Configura Supabase para guardar cambios', 'error'); return }
    setSaving(true)
    const err = await save({ ...(visibility || {}), show_projects: !showProjects })
    if (!err) toast(`Sección Proyectos ${!showProjects ? 'visible' : 'oculta'}`, 'success')
    else toast('Error al guardar', 'error')
    setSaving(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-xl" style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Eye size={16} className="text-cyan-400" />
        <h3 className="font-orbitron text-sm text-slate-300">Visibilidad de secciones</h3>
      </div>
      <div className="flex items-center justify-between py-2.5 px-3 rounded-lg"
        style={{ background: 'rgba(9,9,11,0.6)', border: '1px solid rgba(39,39,42,0.5)' }}>
        <div>
          <p className="text-sm font-rajdhani font-semibold text-slate-200">Sección Proyectos</p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {showProjects ? 'Visible en el portfolio' : 'Oculta en el portfolio'}
          </p>
        </div>
        <button
          onClick={toggle}
          disabled={saving || loading}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all disabled:opacity-50"
          style={{
            background: showProjects ? 'rgba(59,130,246,0.15)' : 'rgba(100,116,139,0.15)',
            border: showProjects ? '1px solid rgba(59,130,246,0.35)' : '1px solid rgba(100,116,139,0.3)',
            color: showProjects ? '#3b82f6' : '#64748b',
          }}
        >
          {showProjects ? <Eye size={13} /> : <EyeOff size={13} />}
          {showProjects ? 'Visible' : 'Oculta'}
        </button>
      </div>
    </motion.div>
  )
}

export default function SiteConfig() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-orbitron text-xl font-bold text-slate-100 mb-1">Configuración</h1>
        <p className="text-slate-500 text-sm">Setup de Supabase y variables de entorno.</p>
      </div>

      {/* Status */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="p-4 rounded-xl flex items-center gap-3 mb-6"
        style={{
          background: isConfigured ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
          border: `1px solid ${isConfigured ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`,
        }}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${isConfigured ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
        <p className="text-sm font-semibold" style={{ color: isConfigured ? '#34d399' : '#fbbf24' }}>
          Supabase: {isConfigured ? 'Conectado ✓' : 'No configurado'}
        </p>
      </motion.div>

      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Visibility */}
        <VisibilityToggle />

        {/* Env vars */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl" style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Key size={16} className="text-cyan-400" />
              <h3 className="font-orbitron text-sm text-slate-300">Variables de entorno (.env)</h3>
            </div>
            <CopyButton text={`VITE_ADMIN_USER=admin\nVITE_ADMIN_HASH=\nVITE_SUPABASE_URL=\nVITE_SUPABASE_ANON_KEY=`} />
          </div>
          <pre className="text-xs font-mono text-slate-400 p-4 rounded-lg overflow-x-auto leading-relaxed"
            style={{ background: 'rgba(9,9,11,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
{`# Admin (hash SHA-256 en emn178.github.io/online-tools/sha256.html)
VITE_ADMIN_USER=admin
VITE_ADMIN_HASH=<sha256-de-tu-password>

# Supabase (Project Settings → API)
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...`}
          </pre>
        </motion.div>

        {/* SQL */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-5 rounded-xl" style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-cyan-400" />
              <h3 className="font-orbitron text-sm text-slate-300">SQL — Crear tablas en Supabase</h3>
            </div>
            <CopyButton text={SUPABASE_SQL} />
          </div>
          <pre className="text-xs font-mono text-slate-500 p-4 rounded-lg overflow-x-auto leading-relaxed max-h-72 overflow-y-auto"
            style={{ background: 'rgba(9,9,11,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
            {SUPABASE_SQL}
          </pre>
        </motion.div>

        {/* Seed SQL */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="p-5 rounded-xl" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-emerald-400" />
              <h3 className="font-orbitron text-sm text-emerald-400">SQL — Seed inicial (todos los datos del CV)</h3>
            </div>
            <CopyButton text={SEED_SQL} />
          </div>
          <p className="text-xs text-slate-500 mb-3 font-mono">
            Limpia las tablas e inserta toda la información del CV de una sola vez.
            Ejecutar una única vez en Supabase → SQL Editor.
          </p>
          <pre className="text-xs font-mono text-slate-500 p-4 rounded-lg overflow-x-auto leading-relaxed max-h-60 overflow-y-auto"
            style={{ background: 'rgba(9,9,11,0.8)', border: '1px solid rgba(16,185,129,0.15)' }}>
            {SEED_SQL}
          </pre>
        </motion.div>

        {/* Links */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-5 rounded-xl" style={{ background: 'rgba(24,24,27,0.8)', border: '1px solid rgba(39,39,42,0.5)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-cyan-400" />
            <h3 className="font-orbitron text-sm text-slate-300">Links útiles</h3>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Supabase Dashboard', url: 'https://supabase.com/dashboard' },
              { label: 'SHA-256 Generator (hash del admin password)', url: 'https://emn178.github.io/online-tools/sha256.html' },
              { label: 'Vercel — Deploy gratuito', url: 'https://vercel.com' },
              { label: 'Netlify — Deploy gratuito', url: 'https://netlify.com' },
            ].map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors py-1">
                <ExternalLink size={12} className="shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
