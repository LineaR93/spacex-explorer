import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchLaunches, 
  fetchRockets,
  setFilter, 
  selectFilteredLaunches, 
  selectRockets,
  selectLoading, 
  selectError, 
  selectFilters 
} from '../store/spacexSlice';
import { useAuth } from '../context/AuthContext';
import LaunchCard from '../components/LaunchCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

// Pagina LaunchesPage - mostra tutti i lanci SpaceX
const LaunchesPage = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useAuth();
  const allLaunches = useSelector(selectFilteredLaunches);
  const rockets = useSelector(selectRockets);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);

  // Filtro lanci basato sul ruolo: user vedono solo successi pubblici
  const launches = isAdmin 
    ? allLaunches 
    : allLaunches.filter(launch => launch.success === true || launch.upcoming === true);

  // Carico i lanci e i razzi quando il componente si monta
  useEffect(() => {
    dispatch(fetchLaunches());
    // Carico anche i razzi per il lookup dei nomi
    if (rockets.length === 0) {
      dispatch(fetchRockets());
    }
  }, [dispatch, rockets.length]);

  // Funzione per gestire i cambiamenti dei filtri
  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter({ [filterName]: value }));
  };

  // Ottieni gli anni unici dai lanci per il filtro
  const getAvailableYears = () => {
    const years = new Set();
    launches.forEach(launch => {
      const year = new Date(launch.date_utc).getFullYear();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  if (loading) {
    return <Spinner />;
  }

  const availableYears = getAvailableYears();

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3">
            <i className="fas fa-space-shuttle me-2"></i>
            Lanci SpaceX
          </h1>
          <p className="text-muted">
            {isAdmin 
              ? 'Tutti i lanci SpaceX passati, presenti e futuri (inclusi fallimenti)'
              : 'Lanci SpaceX di successo e futuri'
            }
          </p>
          
          {/* Avviso filtro per ruolo */}
          {isAdmin ? (
            <div className="alert alert-warning">
              <i className="fas fa-shield-alt me-2"></i>
              <strong>Modalità Admin:</strong> Stai visualizzando tutti i lanci, inclusi quelli falliti e i dati riservati.
            </div>
          ) : (
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Vista Pubblica:</strong> Vengono mostrati solo i lanci di successo e quelli futuri.
            </div>
          )}
        </div>
      </div>

      {/* Filtri semplici */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                {/* Filtro per stato */}
                <div className="col-md-4">
                  <label htmlFor="statusFilter" className="form-label">
                    Stato del Lancio
                  </label>
                  <select
                    id="statusFilter"
                    className="form-select"
                    value={filters.launchStatus}
                    onChange={(e) => handleFilterChange('launchStatus', e.target.value)}
                  >
                    <option value="all">Tutti</option>
                    <option value="success">Successo</option>
                    <option value="failure">Fallito</option>
                    <option value="upcoming">Prossimi</option>
                  </select>
                </div>

                {/* Filtro per anno */}
                <div className="col-md-4">
                  <label htmlFor="yearFilter" className="form-label">
                    Anno
                  </label>
                  <select
                    id="yearFilter"
                    className="form-select"
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                  >
                    <option value="all">Tutti gli anni</option>
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Bottone reset */}
                <div className="col-md-4 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      handleFilterChange('launchStatus', 'all');
                      handleFilterChange('year', 'all');
                    }}
                  >
                    <i className="fas fa-undo me-1"></i>
                    Reset Filtri
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informazioni sui risultati */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted">
            Mostrando {launches.length} lanci
            {(filters.launchStatus !== 'all' || filters.year !== 'all') && 
              <span className="badge bg-info ms-2">Filtri attivi</span>
            }
          </p>
        </div>
      </div>

      {/* Gestione errori */}
      {error && (
        <div className="row mb-4">
          <div className="col-12">
            <ErrorMessage error={error} />
          </div>
        </div>
      )}

      {/* Lista dei lanci */}
      {launches.length > 0 ? (
        <div className="row">
          {launches.slice(0, 50).map(launch => ( // Limitiamo a 50 per performance
            <LaunchCard key={launch.id} launch={launch} rockets={rockets} />
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <i className="fas fa-space-shuttle fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">Nessun lancio trovato</h4>
              <p className="text-muted">
                Prova a modificare i filtri per vedere più risultati
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info sui risultati limitati */}
      {launches.length > 50 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-info text-center">
              <i className="fas fa-info-circle me-2"></i>
              Mostrando i primi 50 lanci di {launches.length} totali. 
              Usa i filtri per trovare lanci specifici.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchesPage; 