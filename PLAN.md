# G3D Clan Page — Plan de Desarrollo

## Resumen del Proyecto

Página web del clan de Halo 2 **G3D**. Sitio público con panel de administración protegido
por credenciales quemadas. Sin servidor propio: datos en Firebase Firestore (gratis),
hosting en Firebase Hosting (gratis). Diseño temático Halo 2 con animaciones premium.

---

## Stack Tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend | React 18 + Vite | Rápido, ecosistema amplio, hot reload |
| Estilos | Tailwind CSS v4 | Utilidades, dark theme fácil, responsive |
| Animaciones | Framer Motion + GSAP | Animaciones de entrada, partículas, parallax |
| Datos | Firebase Firestore | Free tier: 1GB, 50K reads/día, 20K writes/día |
| Hosting | Firebase Hosting | CDN global, HTTPS gratis, custom domain |
| Auth | Credencial quemada (hash SHA-256) | Sin backend propio, admin único |
| Routing | React Router v6 | SPA con rutas limpias |
| Íconos | Lucide React | Íconos SVG limpios |
| Fuentes | Google Fonts (Orbitron + Rajdhani) | Look sci-fi/militar Halo |

**Por qué NO Google Sheets:** CORS problemático del lado cliente, tokens expuestos,
lento para updates en tiempo real. Firebase resuelve todo gratis con SDK limpio.

**Por qué NO JSON en GitHub:** Escribir requiere GitHub token expuesto o Netlify Functions
añadiendo complejidad. Firebase es más directo.

---

## Estructura de Datos (Firestore Collections)

```
/members
  {id}: {
    nombre: string
    gamertag: string
    rango: "Líder" | "Sub-líder" | "Elite" | "Veterano" | "Soldado" | "Recluta"
    activo: boolean
    fechaIngreso: timestamp
    avatar: string (url o initial)
  }

/reglas
  {id}: {
    numero: number
    titulo: string
    descripcion: string
    orden: number
  }

/jerarquia
  {id}: {
    nombre: string
    gamertag: string
    rol: "Líder" | "Sub-líder"
    orden: number
    memberId: string (ref)
  }

/links
  {id}: {
    nombre: string
    url: string
    tipo: "discord" | "youtube" | "otro"
    icono: string
  }

/blacklist
  {id}: {
    nombre: string
    gamertag: string
    razon: string
    deuda: number (pesos/moneda)
    moneda: string
    fechaAgregado: timestamp
    pagado: boolean
    evidencia: string (url opcional)
  }

/config
  global: {
    clanName: "G3D"
    descripcion: string
    fundacion: string
    bannerUrl: string
  }
```

---

## Autenticación Admin

- Credenciales quemadas en variables de entorno (`.env`)
- Contraseña hasheada con SHA-256 en el cliente
- Session almacenada en `sessionStorage` (se borra al cerrar tab)
- Sin Firebase Auth (innecesario para un solo admin)
- Ruta protegida `/admin` redirige al login si no hay sesión

```
VITE_ADMIN_USER=admin_g3d
VITE_ADMIN_HASH=<sha256 de la password>
```

---

## Páginas y Rutas

```
/                    → Landing / Home (hero animado, stats del clan)
/integrantes         → Grid de miembros con rangos y filtros
/jerarquia           → Árbol visual de la jerarquia del clan
/reglas              → Lista de reglas del clan
/lista-negra         → Tabla pública de morosos
/admin               → Login
/admin/dashboard     → Panel principal
/admin/integrantes   → CRUD integrantes
/admin/reglas        → CRUD reglas
/admin/jerarquia     → Editar jerarquía
/admin/lista-negra   → CRUD lista negra
/admin/links         → Editar links de Discord
/admin/config        → Configuración general del clan
```

---

## Diseño & UX — Tema Halo 2

### Paleta de Colores
```css
--bg-primary:     #050a12   /* Negro espacial */
--bg-secondary:   #0a1628   /* Azul marino oscuro */
--bg-card:        #0f1f35   /* Cards */
--accent-blue:    #00b4d8   /* Azul plasma Halo */
--accent-green:   #39ff14   /* Verde energía */
--accent-gold:    #ffd60a   /* Dorado rangos */
--text-primary:   #e2e8f0
--text-muted:     #64748b
--danger:         #ef4444   /* Lista negra */
--border:         #1e3a5f
```

### Tipografía
- **Orbitron** → Títulos, gamertags, rangos (sci-fi)
- **Rajdhani** → Subtítulos, UI labels
- **Inter** → Texto de cuerpo, descripciones

### Animaciones Planeadas
| Sección | Animación |
|---|---|
| Hero | Partículas flotantes (GSAP), texto glitch reveal, scanlines |
| Navegación | Slide-in lateral con backdrop blur |
| Cards miembros | Flip card 3D al hover, glow border animado |
| Rangos | Badge con brillo pulsante según rango |
| Lista negra | Entrada con efecto "archivo clasificado" |
| Jerarquía | Árbol que se construye animado |
| Transiciones de página | Fade + slide con Framer Motion |
| Botones | Ripple effect + glow |
| Loading | Spinner estilo radar Halo |
| Admin login | Pantalla de "acceso restringido" estilo terminal |

### Componentes Visuales Destacados
- **Header**: Logo G3D + nav con efecto glassmorphism + borde plasma
- **Hero**: Video/imagen de fondo Halo, overlay con grid lines animadas, contador de stats
- **Rank Badges**: Íconos SVG con colores por rango + animación idle
- **Member Card**: Foto/avatar + gamertag en Orbitron + rango + badge
- **Blacklist Table**: Fondo rojo translúcido, efecto "stamp" en entradas pagadas
- **Admin Panel**: Sidebar oscuro con iconografía militar

---

## Estructura de Archivos del Proyecto

```
g3d-clan/
├── public/
│   ├── favicon.ico
│   └── assets/
│       └── halo-bg.jpg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── ui/
│   │   │   ├── RankBadge.jsx
│   │   │   ├── MemberCard.jsx
│   │   │   ├── BlacklistRow.jsx
│   │   │   ├── GlowButton.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── animations/
│   │   │   ├── ParticleField.jsx
│   │   │   ├── GlitchText.jsx
│   │   │   └── PageTransition.jsx
│   │   └── sections/
│   │       ├── HeroSection.jsx
│   │       ├── StatsSection.jsx
│   │       └── HierarchyTree.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Members.jsx
│   │   ├── Hierarchy.jsx
│   │   ├── Rules.jsx
│   │   ├── Blacklist.jsx
│   │   └── admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── ManageMembers.jsx
│   │       ├── ManageRules.jsx
│   │       ├── ManageHierarchy.jsx
│   │       ├── ManageBlacklist.jsx
│   │       ├── ManageLinks.jsx
│   │       └── SiteConfig.jsx
│   ├── hooks/
│   │   ├── useFirestore.js
│   │   ├── useAuth.js
│   │   └── useMembers.js
│   ├── lib/
│   │   ├── firebase.js
│   │   └── auth.js
│   ├── constants/
│   │   └── ranks.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .env.example
├── firebase.json
├── .firebaserc
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Fases de Desarrollo

### Fase 0 — Setup (Día 1)
- [ ] Crear proyecto React + Vite
- [ ] Instalar dependencias (Tailwind, Framer Motion, GSAP, Firebase SDK, React Router, Lucide)
- [ ] Configurar Firebase proyecto (Firestore + Hosting)
- [ ] Configurar variables de entorno
- [ ] Setup Tailwind con tema personalizado Halo
- [ ] Configurar Google Fonts (Orbitron, Rajdhani, Inter)

### Fase 1 — Base y Layout (Día 1-2)
- [ ] App.jsx con rutas (React Router)
- [ ] Header con navegación responsive + glassmorphism
- [ ] Footer con links de Discord
- [ ] PageTransition (Framer Motion entre rutas)
- [ ] LoadingSpinner estilo radar
- [ ] GlowButton componente reutilizable
- [ ] Conexión Firebase y hooks base (`useFirestore`)

### Fase 2 — Páginas Públicas (Día 2-3)
- [ ] **Home**: Hero con partículas GSAP + texto glitch + stats del clan
- [ ] **Members**: Grid de MemberCards con filtro por rango, animaciones entrada
- [ ] **Hierarchy**: Árbol visual animado de jerarquía
- [ ] **Rules**: Lista de reglas con animaciones scroll
- [ ] **Blacklist**: Tabla "archivo clasificado" con deudas y estado de pago

### Fase 3 — Panel Admin (Día 3-4)
- [ ] Login page (estilo terminal acceso restringido)
- [ ] `useAuth` hook + protección de rutas
- [ ] Dashboard con stats y accesos rápidos
- [ ] CRUD Integrantes (tabla + modal add/edit + delete confirm)
- [ ] CRUD Reglas (ordenables con drag & drop)
- [ ] Edición Jerarquía (asignar líder/sub-líder)
- [ ] CRUD Lista Negra (agregar deuda, marcar como pagado, eliminar)
- [ ] Edición Links Discord
- [ ] Config general del clan

### Fase 4 — Animaciones y Polish (Día 4-5)
- [ ] ParticleField en hero (GSAP)
- [ ] GlitchText en títulos principales
- [ ] Hover effects en MemberCards (flip 3D, glow)
- [ ] Rank badges con animación por tier
- [ ] Scanlines overlay en hero
- [ ] Animaciones de scroll (intersection observer)
- [ ] Responsive testing completo (mobile, tablet, desktop)

### Fase 5 — Deploy (Día 5)
- [ ] Configurar Firestore Security Rules
- [ ] Build de producción (`npm run build`)
- [ ] Deploy a Firebase Hosting (`firebase deploy`)
- [ ] Custom domain (opcional, Freenom o similar)
- [ ] Testing final en producción

---

## Seguridad Considerations

- Hash SHA-256 de la password en cliente: **no es seguro para datos críticos**, pero
  es aceptable para un admin único de un clan de juego
- Firestore rules: lectura pública en `/members`, `/reglas`, `/blacklist`, `/jerarquia`, `/links`
- Firestore rules: escritura bloqueada del lado cliente (solo el admin con token temporal)
  → Usar Firebase Auth anónima + Custom Claims, o aceptar que las reglas de Firestore
  son la única barrera (suficiente para este caso de uso)
- `.env` nunca se sube a Git (está en `.gitignore`)

---

## Costo Estimado

| Servicio | Plan | Costo |
|---|---|---|
| Firebase Hosting | Spark (gratis) | $0/mes |
| Firebase Firestore | Spark (gratis) | $0/mes |
| Dominio | Opcional (Freenom .tk o comprado) | $0–$12/año |
| **Total** | | **$0/mes** |

Firebase Spark permite:
- 10 GB de hosting
- 1 GB de Firestore storage
- 50,000 lecturas/día
- 20,000 escrituras/día

Más que suficiente para un clan de Halo 2.

---

## Dependencias del Proyecto

```json
{
  "dependencies": {
    "react": "^18.3",
    "react-dom": "^18.3",
    "react-router-dom": "^6.26",
    "firebase": "^10.13",
    "framer-motion": "^11.5",
    "gsap": "^3.12",
    "lucide-react": "^0.441",
    "tailwindcss": "^4.0",
    "@tailwindcss/vite": "^4.0"
  },
  "devDependencies": {
    "vite": "^5.4",
    "@vitejs/plugin-react": "^4.3"
  }
}
```

---

## Rangos del Clan G3D

```
🏆 Líder          → Color: Dorado   (#ffd60a)
⭐ Sub-líder       → Color: Plateado (#94a3b8)
💎 Elite          → Color: Cian     (#00b4d8)
🛡️ Veterano       → Color: Verde    (#22c55e)
⚔️ Soldado        → Color: Azul     (#3b82f6)
🎮 Recluta        → Color: Gris     (#64748b)
```

---

## Próximos Pasos Inmediatos

1. Confirmar stack con el usuario → **React + Vite + Firebase**
2. Correr `npm create vite@latest g3d-clan -- --template react`
3. Instalar todas las dependencias
4. Crear proyecto Firebase en console.firebase.google.com
5. Comenzar con Fase 0 del desarrollo

---

*Plan generado: 2026-04-27 | Proyecto: G3D Clan Halo 2*
