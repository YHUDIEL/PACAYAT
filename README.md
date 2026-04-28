# PACAYAT — Sistema de Gestión Escolar
## Secundaria Técnica 177

---

## Stack
- **Frontend**: React 19 + Vite + React Router DOM + Recharts
- **Backend**: Node.js + Express.js + JWT + bcryptjs
- **ORM**: Prisma
- **BD**: PostgreSQL 17

---

## Estructura del proyecto
```
pacayat/
├── frontend/          # React 19 + Vite
│   └── src/
│       ├── api/          # Clientes axios por módulo
│       ├── components/   # UI, layout, reportes, expediente...
│       ├── context/      # AuthContext
│       ├── hooks/        # useFetch, useAuth
│       ├── layouts/      # AdminLayout, DocenteLayout...
│       ├── pages/        # Páginas por rol
│       ├── routes/       # AppRouter, ProtectedRoute
│       ├── styles/       # globals.css (variables CSS)
│       └── utils/        # formatters, helpers
│
└── backend/           # Express.js + Prisma
    └── src/
        ├── config/       # db.js (PrismaClient)
        ├── controllers/  # Lógica por módulo
        ├── middlewares/  # auth.js, roleGuard.js
        ├── routes/       # Rutas Express
        ├── services/     # puntosService, avisoService...
        └── jobs/         # avisoScheduler (cron)
```

---

## Inicio rápido

### 1. Backend
```bash
cd backend
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
npm install
npx prisma migrate dev --name init
npm run dev
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## Roles del sistema
| Rol             | Acceso principal                              |
|-----------------|-----------------------------------------------|
| ADMIN           | Todo el sistema, configuración                |
| DIRECTIVO       | Estadísticas, reportes (solo lectura)         |
| DOCENTE         | Horario, asistencia, calificaciones           |
| PREFECTO        | Alumnos, horarios, reportes                   |
| SECRETARIA      | Alumnos, tutores, documentos                  |
| CONTROL_ESCOLAR | Horarios, asignaciones, calificaciones        |
| TUTOR           | Información de sus hijos (solo lectura)       |

---

## Progreso de desarrollo
- [x] Fase 1 — Auth, JWT, Layout, Login
- [x] Fase 2 — CRUD Alumnos, Personal (Frontend + Backend base)
- [ ] Fase 3 — Horarios, Asistencia, Calificaciones
- [ ] Fase 4 — Reportes avanzados, Avisos automáticos
- [ ] Fase 5 — WhatsApp/Correo, PDFs, Deploy
