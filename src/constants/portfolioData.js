export const HERO = {
  name: 'Nicolas Morales Galindo',
  title: 'Desarrollador Full Stack',
  roles: [
    'Full Stack Developer',
    '.NET & Angular Specialist',
    'Java & Spring Boot Dev',
    'Microservices Architect',
  ],
  description:
    'Ingeniero de Sistemas con más de 6 años de experiencia en el diseño, desarrollo y mantenimiento de sistemas de información. Especializado en .NET, Angular y microservicios. Comprometido con la calidad del código, SOLID y Clean Code.',
  github: 'https://github.com/NicolasMoralesGalindo',
  linkedin: 'https://www.linkedin.com/in/nicolas-morales-galindo',
  email: 'nicolasmoga12@gmail.com',
  phone: '+57 3202900758',
  location: 'Bogotá, Colombia — Localidad Suba',
}

export const SKILLS = [
  // Backend
  { id: 1, name: 'Java',            category: 'backend',  level: 5, display_order: 1 },
  { id: 2, name: 'Spring Boot',     category: 'backend',  level: 5, display_order: 2 },
  { id: 3, name: '.NET Core / .NET 6', category: 'backend', level: 5, display_order: 3 },
  { id: 4, name: '.NET 8',          category: 'backend',  level: 4, display_order: 4 },
  { id: 5, name: 'Entity Framework',category: 'backend',  level: 4, display_order: 5 },
  { id: 6, name: 'JPA',             category: 'backend',  level: 4, display_order: 6 },
  { id: 7, name: 'Microservicios',  category: 'backend',  level: 5, display_order: 7 },
  { id: 8, name: 'REST APIs',       category: 'backend',  level: 5, display_order: 8 },
  { id: 9, name: 'JWT',             category: 'backend',  level: 4, display_order: 9 },
  { id: 10, name: 'Swagger',        category: 'backend',  level: 4, display_order: 10 },
  // Frontend
  { id: 11, name: 'Angular 18',     category: 'frontend', level: 5, display_order: 1 },
  { id: 12, name: 'Angular 10',     category: 'frontend', level: 5, display_order: 2 },
  { id: 13, name: 'TypeScript',     category: 'frontend', level: 4, display_order: 3 },
  { id: 14, name: 'HTML / CSS / JS',category: 'frontend', level: 5, display_order: 4 },
  { id: 15, name: 'PrimeNG',        category: 'frontend', level: 4, display_order: 5 },
  { id: 16, name: 'Angular Material',category: 'frontend',level: 4, display_order: 6 },
  { id: 17, name: 'Ionic',          category: 'frontend', level: 3, display_order: 7 },
  // Database
  { id: 18, name: 'MySQL',          category: 'database', level: 5, display_order: 1 },
  { id: 19, name: 'SQL Server',     category: 'database', level: 5, display_order: 2 },
  { id: 20, name: 'Oracle',         category: 'database', level: 3, display_order: 3 },
  { id: 21, name: 'Liquibase',      category: 'database', level: 3, display_order: 4 },
  // DevOps
  { id: 22, name: 'Docker',         category: 'devops',   level: 4, display_order: 1 },
  { id: 23, name: 'Git',            category: 'devops',   level: 5, display_order: 2 },
  { id: 24, name: 'Jenkins',        category: 'devops',   level: 3, display_order: 3 },
  { id: 25, name: 'Azure DevOps',   category: 'devops',   level: 4, display_order: 4 },
  { id: 26, name: 'Netflix OSS',    category: 'devops',   level: 3, display_order: 5 },
  { id: 27, name: 'Maven',          category: 'devops',   level: 4, display_order: 6 },
  { id: 28, name: 'Python',         category: 'devops',   level: 3, display_order: 7 },
  // IA
  { id: 29, name: 'GitHub Copilot', category: 'ia',       level: 5, display_order: 1 },
  { id: 30, name: 'Claude Code',    category: 'ia',       level: 2, display_order: 2 },
]

export const EXPERIENCE = [
  {
    id: 1,
    company: 'Double V Partner NYX',
    role: 'Desarrollador FullStack Semi Senior',
    period: 'Agosto 2024 — Actualidad',
    is_current: true,
    description: [
      'Desarrollo de aplicaciones web con .NET 8 (Back-end) y Angular 18 (Front-end).',
      'Trabajo con bases de datos SQL Server para almacenamiento y gestión de datos.',
      'Migración de datos entre sistemas utilizando Python.',
      'Uso de Azure DevOps para gestión de proyectos y control de versiones.',
    ],
    tech_stack: ['.NET 8', 'Angular 18', 'SQL Server', 'Python', 'Azure DevOps'],
    display_order: 1,
  },
  {
    id: 2,
    company: 'Redesis S.A.S',
    role: 'Ingeniero De Desarrollo Semi Senior',
    period: 'Agosto 2019 — Agosto 2024',
    is_current: false,
    description: [
      'Desarrollo de proyectos utilizando .NET 6, Angular 10 y SQL Server.',
      'Desarrollo de API con Spring Boot, Swagger y SQL Server.',
      'A cargo de un producto de la compañía: desarrollo, soporte y mantenimiento con Java, JSF, EJB, JDBC, Liquibase, Maven, MySQL, JBoss y PrimeFaces.',
    ],
    tech_stack: ['.NET 6', 'Angular 10', 'Spring Boot', 'Java', 'SQL Server', 'MySQL'],
    display_order: 2,
  },
  {
    id: 3,
    company: 'Samtel Consultores S.A.S',
    role: 'Java Developer',
    period: 'Enero 2019 — Julio 2019',
    is_current: false,
    description: [
      'Modelado y gestión de bases de datos MySQL.',
      'Desarrollo de microservicios con Java, Spring Boot, JPA, JWT y Netflix OSS.',
      'Aplicando la metodología ágil SCRUM y utilizando Git como control de versiones.',
    ],
    tech_stack: ['Java', 'Spring Boot', 'JPA', 'JWT', 'MySQL', 'Netflix OSS', 'SCRUM'],
    display_order: 3,
  },
]

export const EDUCATION = [
  {
    id: 1,
    title: 'Ingeniería de Sistemas',
    institution: 'Universidad ECCI — Bogotá D.C',
    period: '2020 — 2024',
    type: 'degree',
    description: 'Pregrado en Ingeniería de Sistemas.',
    display_order: 1,
  },
  {
    id: 2,
    title: 'Tecnólogo en Análisis y Desarrollo de Sistemas de Información',
    institution: 'SENA — Bogotá D.C',
    period: '2017 — 2019',
    type: 'degree',
    description: 'Tecnología en Análisis y Desarrollo de Sistemas.',
    display_order: 2,
  },
  {
    id: 3,
    title: 'AZ-900 Azure Fundamentals',
    institution: 'Microsoft',
    period: '2023',
    type: 'certification',
    description: 'Certificación oficial de Microsoft en fundamentos de Azure.',
    display_order: 3,
  },
  {
    id: 4,
    title: 'NET 6',
    institution: 'Udemy',
    period: '2023',
    type: 'certification',
    description: 'Curso avanzado de .NET 6 — 16 horas.',
    display_order: 4,
  },
  {
    id: 5,
    title: 'Angular Avanzado',
    institution: 'Udemy',
    period: '2022',
    type: 'certification',
    description: 'Curso de Angular Avanzado — 32 horas.',
    display_order: 5,
  },
  {
    id: 6,
    title: 'Principios SOLID',
    institution: 'Udemy',
    period: '2022',
    type: 'certification',
    description: 'Principios SOLID y Clean Code — 6.5 horas.',
    display_order: 6,
  },
]

export const PROJECTS = []
