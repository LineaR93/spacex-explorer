import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navbar con sistema di autenticazione
const Navbar = () => {
  const { isLoggedIn, user, isAdmin, logout } = useAuth();
  // Ottengo la location corrente per evidenziare il link attivo
  const location = useLocation();

  // Funzione per determinare se un link è attivo
  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand/Logo */}
        <Link className="navbar-brand" to="/">
          <i className="fas fa-rocket me-2"></i>
          SpaceX Explorer
        </Link>

        {/* Toggler per mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu di navigazione con autenticazione */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActiveLink('/')}`} to="/">
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActiveLink('/rockets')}`} to="/rockets">
                <i className="fas fa-rocket me-1"></i>
                Razzi
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActiveLink('/launches')}`} to="/launches">
                <i className="fas fa-space-shuttle me-1"></i>
                Lanci
              </Link>
            </li>

            {/* Dashboard visibile solo se l'utente è loggato */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className={`nav-link ${isActiveLink('/dashboard')}`} to="/dashboard">
                  <i className="fas fa-tachometer-alt me-1"></i>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Menu utente sulla destra */}
          <ul className="navbar-nav">
            {isLoggedIn ? (
              // Se l'utente è loggato, mostro il nome e il logout
              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle btn btn-link text-light" 
                  data-bs-toggle="dropdown"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fas fa-user me-1"></i>
                  {user?.name || 'Utente'}
                  {isAdmin && <span className="badge bg-warning ms-1">Admin</span>}
                </button>
                
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user me-2"></i>
                      Profilo
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              // Se l'utente non è loggato, mostro il link di login
              <li className="nav-item">
                <Link className={`nav-link ${isActiveLink('/login')}`} to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 