import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { ToastProvider } from './context/ToastContext'

// Public
import Home   from './pages/Home'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Admin
import AdminLogin       from './pages/admin/Login'
import AdminDashboard   from './pages/admin/Dashboard'
import ManageHero       from './pages/admin/ManageHero'
import ManageSkills     from './pages/admin/ManageSkills'
import ManageExperience from './pages/admin/ManageExperience'
import ManageEducation  from './pages/admin/ManageEducation'
import ManageProjects   from './pages/admin/ManageProjects'
import SiteConfig       from './pages/admin/SiteConfig'
import AdminLayout      from './components/layout/AdminLayout'

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#09090b' }}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function ProtectedRoute({ authenticated }) {
  return authenticated ? <Outlet /> : <Navigate to="/admin" replace />
}

export default function App() {
  const { authenticated, login, logout } = useAuth()

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route
            path="/admin"
            element={
              authenticated
                ? <Navigate to="/admin/dashboard" replace />
                : <AdminLogin onLogin={login} />
            }
          />

          <Route element={<ProtectedRoute authenticated={authenticated} />}>
            <Route element={<AdminLayout onLogout={logout} />}>
              <Route path="/admin/dashboard"   element={<AdminDashboard />} />
              <Route path="/admin/hero"        element={<ManageHero />} />
              <Route path="/admin/habilidades" element={<ManageSkills />} />
              <Route path="/admin/experiencia" element={<ManageExperience />} />
              <Route path="/admin/educacion"   element={<ManageEducation />} />
              <Route path="/admin/proyectos"   element={<ManageProjects />} />
              <Route path="/admin/config"      element={<SiteConfig />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
