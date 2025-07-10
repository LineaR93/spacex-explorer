import { Link } from 'react-router-dom';

// Pagina 404 semplificata con tema spaziale
const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center py-5">
            {/* Animazione spaziale semplice */}
            <div className="mb-4">
              <i className="fas fa-satellite fa-5x text-muted mb-3"></i>
              <h1 className="display-1 fw-bold text-primary">404</h1>
            </div>
            
            {/* Messaggio di errore a tema spaziale */}
            <h2 className="h4 mb-3">Pagina persa nello spazio!</h2>
            <p className="text-muted mb-4">
              La pagina che stai cercando è andata alla deriva nello spazio. 
              Torna alla base per continuare la tua esplorazione.
            </p>
            
            {/* Link per tornare alla home */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link 
                to="/" 
                className="btn btn-primary btn-lg me-md-2"
              >
                <i className="fas fa-home me-2"></i>
                Torna alla Base
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
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 