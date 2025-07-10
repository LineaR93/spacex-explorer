import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from '../components/Spinner';
import ProtectedRoute from '../components/ProtectedRoute';

// Importo le pagine in modo lazy per code splitting
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const RocketsPage = lazy(() => import('../pages/RocketsPage'));
const RocketDetailPage = lazy(() => import('../pages/RocketDetailPage'));
const LaunchesPage = lazy(() => import('../pages/LaunchesPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Routing con autenticazione
const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Pagina Home */}
        <Route path="/" element={<HomePage />} />
        
        {/* Pagina Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Pagina Razzi */}
        <Route path="/rockets" element={<RocketsPage />} />
        
        {/* Dettaglio Razzo (Dynamic Route) */}
        <Route path="/rockets/:id" element={<RocketDetailPage />} />
        
        {/* Pagina Lanci */}
        <Route path="/launches" element={<LaunchesPage />} />
        
        {/* Dashboard protetto - richiede autenticazione */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Profilo protetto - richiede autenticazione */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        
        {/* Pagina 404 per tutte le altre route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 