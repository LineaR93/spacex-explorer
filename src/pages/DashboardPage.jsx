import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRockets, selectLaunches } from '../store/spacexSlice';

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const rockets = useSelector(selectRockets);
  const launches = useSelector(selectLaunches);

  // Statistiche semplici
  const totalRockets = rockets.length;
  const totalLaunches = launches.length;
  const successfulLaunches = launches.filter(launch => launch.success === true).length;
  const upcomingLaunches = launches.filter(launch => launch.upcoming === true).length;

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3">
            <i className="fas fa-tachometer-alt me-2"></i>
            Dashboard
          </h1>
          <p className="text-muted">
            Benvenuto, <strong>{user?.name}</strong>
            {isAdmin && <span className="badge bg-warning ms-2">Admin</span>}
          </p>
        </div>
      </div>

      {/* Statistiche generali */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <i className="fas fa-rocket fa-2x mb-2"></i>
              <h3 className="mb-1">{totalRockets}</h3>
              <p className="mb-0">Razzi Totali</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <i className="fas fa-space-shuttle fa-2x mb-2"></i>
              <h3 className="mb-1">{totalLaunches}</h3>
              <p className="mb-0">Lanci Totali</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <i className="fas fa-check-circle fa-2x mb-2"></i>
              <h3 className="mb-1">{successfulLaunches}</h3>
              <p className="mb-0">Lanci Riusciti</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-warning text-dark">
            <div className="card-body text-center">
              <i className="fas fa-clock fa-2x mb-2"></i>
              <h3 className="mb-1">{upcomingLaunches}</h3>
              <p className="mb-0">Lanci Futuri</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenuto specifico per ruolo */}
      {isAdmin ? (
        // Contenuto per Admin
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-shield-alt me-2"></i>
                  Pannello Amministratore
                </h5>
              </div>
              <div className="card-body">
                <p className="mb-4">
                  Come amministratore, hai accesso completo a tutte le funzionalità del sistema SpaceX.
                </p>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="card border-primary">
                      <div className="card-body">
                        <h6 className="card-title">
                          <i className="fas fa-rocket me-2"></i>
                          Gestione Razzi
                        </h6>
                        <p className="card-text small">
                          Visualizza e gestisci tutti i razzi SpaceX nel database.
                        </p>
                        <Link to="/rockets" className="btn btn-primary btn-sm">
                          Vai ai Razzi
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-success">
                      <div className="card-body">
                        <h6 className="card-title">
                          <i className="fas fa-space-shuttle me-2"></i>
                          Gestione Lanci
                        </h6>
                        <p className="card-text small">
                          Monitora tutti i lanci passati e futuri di SpaceX.
                        </p>
                        <Link to="/launches" className="btn btn-success btn-sm">
                          Vai ai Lanci
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 card border-secondary">
                  <div className="card-header bg-light">
                    <h6 className="mb-0 text-secondary">
                      <i className="fas fa-chart-line me-2"></i>
                      📊 Analisi Lanci - Admin
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <small className="d-block mb-2 text-muted fw-bold">Risultati Lanci:</small>
                        <ul className="list-unstyled mb-3">
                          <li className="mb-1"><span className="text-muted">•</span> <strong>Lanci di successo:</strong> <span className="text-success">{successfulLaunches}</span></li>
                          <li className="mb-1"><span className="text-muted">•</span> <strong>Lanci falliti:</strong> <span className="text-danger">{totalLaunches - successfulLaunches - upcomingLaunches}</span></li>
                          <li className="mb-1"><span className="text-muted">•</span> <strong>Lanci futuri:</strong> <span className="text-info">{upcomingLaunches}</span></li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <small className="d-block mb-2 text-muted fw-bold">Metriche di Performance:</small>
                        <ul className="list-unstyled mb-3">
                          <li className="mb-1"><span className="text-muted">•</span> <strong>Tasso di successo:</strong> <span className="text-success">{totalLaunches > 0 ? ((successfulLaunches / (totalLaunches - upcomingLaunches)) * 100).toFixed(1) : 0}%</span></li>
                          <li className="mb-1"><span className="text-muted">•</span> <strong>Tasso di fallimento:</strong> <span className="text-danger">{totalLaunches > 0 ? (((totalLaunches - successfulLaunches - upcomingLaunches) / (totalLaunches - upcomingLaunches)) * 100).toFixed(1) : 0}%</span></li>
                          <li className="mb-1"><span className="text-muted">•</span> <strong>Razzi:</strong> <span className="text-primary">{totalRockets}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="alert alert-light border-warning mb-0">
                      <i className="fas fa-info-circle me-2 text-warning"></i>
                      <small className="text-muted">Dati calcolati dai lanci SpaceX reali. Informazioni riservate al personale autorizzato.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Contenuto per User normale
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-user me-2"></i>
                  Pannello Utente
                </h5>
              </div>
              <div className="card-body">
                <p className="mb-4">
                  Benvenuto nella tua dashboard personale. Puoi esplorare tutti i razzi e lanci SpaceX.
                </p>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="card border-primary">
                      <div className="card-body">
                        <h6 className="card-title">
                          <i className="fas fa-rocket me-2"></i>
                          Esplora Razzi
                        </h6>
                        <p className="card-text small">
                          Scopri tutti i razzi SpaceX con le loro caratteristiche.
                        </p>
                        <Link to="/rockets" className="btn btn-outline-primary btn-sm">
                          Vedi Razzi
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-success">
                      <div className="card-body">
                        <h6 className="card-title">
                          <i className="fas fa-space-shuttle me-2"></i>
                          Scopri Lanci
                        </h6>
                        <p className="card-text small">
                          Visualizza la storia dei lanci SpaceX.
                        </p>
                        <Link to="/launches" className="btn btn-outline-success btn-sm">
                          Vedi Lanci
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="mb-2">
                    <i className="fas fa-star me-2"></i>
                    Funzionalità Disponibili
                  </h6>
                  <ul className="mb-0 small">
                    <li>Visualizzazione completa dei razzi</li>
                    <li>Accesso a tutti i lanci SpaceX</li>
                    <li>Gestione del proprio profilo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 