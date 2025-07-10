import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

// Componente per proteggere le route che richiedono autenticazione
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  // Mostro il loading mentre controllo l'autenticazione
  if (loading) {
    return <Spinner />;
  }

  // Se l'utente non è loggato, lo reindirizzo al login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Se la route richiede privilegi admin ma l'utente non è admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger text-center">
              <h4>
                <i className="fas fa-shield-alt me-2"></i>
                Accesso Negato
              </h4>
              <p className="mb-0">
                Non hai i permessi necessari per accedere a questa pagina.
                <br />
                È richiesto il ruolo di amministratore.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se tutti i controlli passano, mostro il componente figlio
  return children;
};

export default ProtectedRoute; 