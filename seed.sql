-- ============================================================
-- SEED INICIAL — Portfolio Nicolas Morales Galindo
-- Ejecutar en Supabase → SQL Editor
-- Limpia e inserta todos los datos del CV de una sola vez.
-- ============================================================

-- Limpiar datos previos (orden inverso a FK si las hubiera)
TRUNCATE TABLE projects  RESTART IDENTITY CASCADE;
TRUNCATE TABLE education RESTART IDENTITY CASCADE;
TRUNCATE TABLE experience RESTART IDENTITY CASCADE;
TRUNCATE TABLE skills    RESTART IDENTITY CASCADE;
DELETE FROM site_config WHERE section IN ('hero', 'visibility');


-- ============================================================
-- SITE CONFIG — Hero (sección principal)
-- ============================================================
INSERT INTO site_config (section, content)
VALUES (
  'hero',
  '{
    "name":        "Nicolas Morales Galindo",
    "title":       "Desarrollador Full Stack",
    "description": "Ingeniero de Sistemas con más de 6 años de experiencia en el diseño, desarrollo y mantenimiento de sistemas de información. Especializado en .NET, Angular y microservicios. Comprometido con la calidad del código, SOLID y Clean Code.",
    "roles":       ["Full Stack Developer", ".NET & Angular Specialist", "Java & Spring Boot Dev", "Microservices Architect"],
    "email":       "nicolasmoga12@gmail.com",
    "phone":       "+57 3202900758",
    "location":    "Bogotá, Colombia — Localidad Suba",
    "linkedin":    "https://www.linkedin.com/in/nicolas-morales-galindo",
    "github":      "https://github.com/NicolasMoralesGalindo"
  }'::jsonb
)
ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content;


-- ============================================================
-- SITE CONFIG — Visibilidad de secciones
-- (show_projects: false → oculta la sección proyectos)
-- ============================================================
INSERT INTO site_config (section, content)
VALUES (
  'visibility',
  '{"show_projects": false}'::jsonb
)
ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content;


-- ============================================================
-- SKILLS — Habilidades técnicas
-- ============================================================

-- Back-end
INSERT INTO skills (name, category, level, display_order) VALUES
  ('Java',               'backend', 5, 1),
  ('Spring Boot',        'backend', 5, 2),
  ('.NET Core / .NET 6', 'backend', 5, 3),
  ('.NET 8',             'backend', 4, 4),
  ('Entity Framework',   'backend', 4, 5),
  ('JPA',                'backend', 4, 6),
  ('Microservicios',     'backend', 5, 7),
  ('REST APIs',          'backend', 5, 8),
  ('JWT',                'backend', 4, 9),
  ('Swagger',            'backend', 4, 10);

-- Front-end
INSERT INTO skills (name, category, level, display_order) VALUES
  ('Angular 18',      'frontend', 5, 1),
  ('Angular 10',      'frontend', 5, 2),
  ('TypeScript',      'frontend', 4, 3),
  ('HTML / CSS / JS', 'frontend', 5, 4),
  ('PrimeNG',         'frontend', 4, 5),
  ('Angular Material','frontend', 4, 6),
  ('Ionic',           'frontend', 3, 7);

-- Base de datos
INSERT INTO skills (name, category, level, display_order) VALUES
  ('MySQL',      'database', 5, 1),
  ('SQL Server', 'database', 5, 2),
  ('Oracle',     'database', 3, 3),
  ('Liquibase',  'database', 3, 4);

-- DevOps & Otros
INSERT INTO skills (name, category, level, display_order) VALUES
  ('Docker',      'devops', 4, 1),
  ('Git',         'devops', 5, 2),
  ('Jenkins',     'devops', 3, 3),
  ('Azure DevOps','devops', 4, 4),
  ('Netflix OSS', 'devops', 3, 5),
  ('Maven',       'devops', 4, 6),
  ('Python',      'devops', 3, 7);


-- ============================================================
-- EXPERIENCE — Experiencia laboral
-- ============================================================
INSERT INTO experience (company, role, period, is_current, description, tech_stack, display_order)
VALUES
(
  'Double V Partner NYX',
  'Desarrollador FullStack Semi Senior',
  'Agosto 2024 — Actualidad',
  true,
  '["Desarrollo de aplicaciones web con .NET 8 (Back-end) y Angular 18 (Front-end).", "Trabajo con bases de datos SQL Server para almacenamiento y gestión de datos.", "Migración de datos entre sistemas utilizando Python.", "Uso de Azure DevOps para gestión de proyectos y control de versiones."]'::jsonb,
  '[".NET 8", "Angular 18", "SQL Server", "Python", "Azure DevOps"]'::jsonb,
  1
),
(
  'Redesis S.A.S',
  'Ingeniero De Desarrollo Semi Senior',
  'Agosto 2019 — Agosto 2024',
  false,
  '["Desarrollo de proyectos utilizando .NET 6, Angular 10 y SQL Server.", "Desarrollo de API con Spring Boot, Swagger y SQL Server.", "A cargo de un producto de la compañía: desarrollo, soporte y mantenimiento con Java, JSF, EJB, JDBC, Liquibase, Maven, MySQL, JBoss y PrimeFaces."]'::jsonb,
  '[".NET 6", "Angular 10", "Spring Boot", "Java", "SQL Server", "MySQL"]'::jsonb,
  2
),
(
  'Samtel Consultores S.A.S',
  'Java Developer',
  'Enero 2019 — Julio 2019',
  false,
  '["Modelado y gestión de bases de datos MySQL.", "Desarrollo de microservicios con Java, Spring Boot, JPA, JWT y Netflix OSS.", "Aplicando la metodología ágil SCRUM y utilizando Git como control de versiones."]'::jsonb,
  '["Java", "Spring Boot", "JPA", "JWT", "MySQL", "Netflix OSS", "SCRUM"]'::jsonb,
  3
);


-- ============================================================
-- EDUCATION — Educación y certificaciones
-- ============================================================
INSERT INTO education (title, institution, period, type, description, display_order)
VALUES
-- Educación formal
(
  'Ingeniería de Sistemas',
  'Universidad ECCI — Bogotá D.C',
  '2020 — 2024',
  'degree',
  'Pregrado en Ingeniería de Sistemas.',
  1
),
(
  'Tecnólogo en Análisis y Desarrollo de Sistemas de Información',
  'SENA — Bogotá D.C',
  '2017 — 2019',
  'degree',
  'Tecnología en Análisis y Desarrollo de Sistemas de Información.',
  2
),
-- Certificaciones
(
  'AZ-900 Azure Fundamentals',
  'Microsoft',
  '2023',
  'certification',
  'Certificación oficial de Microsoft en fundamentos de Azure.',
  3
),
(
  '.NET 6',
  'Udemy',
  '2023',
  'certification',
  'Curso avanzado de .NET 6 — 16 horas.',
  4
),
(
  'Angular Avanzado',
  'Udemy',
  '2022',
  'certification',
  'Curso de Angular Avanzado — 32 horas.',
  5
),
(
  'Principios SOLID',
  'Udemy',
  '2022',
  'certification',
  'Principios SOLID y Clean Code — 6.5 horas.',
  6
);


-- ============================================================
-- Verificar datos insertados
-- ============================================================
SELECT 'site_config' AS tabla, count(*) FROM site_config
UNION ALL
SELECT 'skills',     count(*) FROM skills
UNION ALL
SELECT 'experience', count(*) FROM experience
UNION ALL
SELECT 'education',  count(*) FROM education;
