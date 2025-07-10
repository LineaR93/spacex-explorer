import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pagina Home con contenuto condizionale
const HomePage = () => {
  const { isLoggedIn, user } = useAuth();
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Hero Section */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary">
              <i className="fas fa-rocket me-3"></i>
              SpaceX Explorer
            </h1>
            <p className="lead text-muted">
              Esplora i razzi e i lanci di SpaceX
            </p>
            <hr className="my-4" />
            
            {/* Contenuto condizionale in base all'autenticazione */}
            {isLoggedIn ? (
              // Se l'utente è loggato, mostro un messaggio personalizzato
              <div>
                <p className="mb-4">
                  Ciao <strong>{user?.name}</strong>! 
                  Benvenuto di nuovo nella tua dashboard SpaceX.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link 
                    to="/dashboard" 
                    className="btn btn-primary btn-lg me-md-2"
                  >
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Dashboard
                  </Link>
                  <Link 
                    to="/rockets" 
                    className="btn btn-outline-primary btn-lg"
                  >
                    <i className="fas fa-rocket me-2"></i>
                    Esplora i Razzi
                  </Link>
                </div>
              </div>
            ) : (
              // Se l'utente non è loggato, mostro il link di login
              <div>
                <p className="mb-4">
                  Accedi per esplorare tutti i razzi SpaceX e accedere alla dashboard personalizzata.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link 
                    to="/login" 
                    className="btn btn-primary btn-lg me-md-2"
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Accedi
                  </Link>
                  <Link 
                    to="/rockets" 
                    className="btn btn-outline-primary btn-lg"
                  >
                    <i className="fas fa-rocket me-2"></i>
                    Vedi i Razzi
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sezione Features semplificata */}
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="text-primary mb-3">
                    <i className="fas fa-rocket fa-3x"></i>
                  </div>
                  <h5 className="card-title">Razzi SpaceX</h5>
                  <p className="card-text text-muted">
                    Scopri tutti i razzi SpaceX con le loro specifiche tecniche e dettagli.
                  </p>
                  <Link to="/rockets" className="btn btn-outline-primary">
                    Esplora Razzi
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="text-success mb-3">
                    <i className="fas fa-space-shuttle fa-3x"></i>
                  </div>
                  <h5 className="card-title">Lanci SpaceX</h5>
                  <p className="card-text text-muted">
                    Visualizza tutti i lanci passati, presenti e futuri con i loro dettagli.
                  </p>
                  <Link to="/launches" className="btn btn-outline-success">
                    Vedi Lanci
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sezione Informazioni */}
          <div className="mt-5 p-4 bg-light rounded-3">
            <h3 className="text-center mb-4">Su SpaceX</h3>
            <p className="text-muted text-center">
              SpaceX è una compagnia aerospaziale americana fondata nel 2002 da Elon Musk. 
              La compagnia ha rivoluzionato l'industria spaziale con razzi riutilizzabili 
              e missioni verso la Stazione Spaziale Internazionale, con l'obiettivo finale 
              di rendere possibile la vita su Marte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 