import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchRockets, 
  setFilter, 
  selectFilteredRockets, 
  selectLoading, 
  selectError, 
  selectFilters 
} from '../store/spacexSlice';
import { useAuth } from '../context/AuthContext';
import RocketCard from '../components/RocketCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

// Pagina RocketsPage - mostra tutti i razzi SpaceX con filtri e paginazione
const RocketsPage = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useAuth();
  const rockets = useSelector(selectFilteredRockets);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);

  // useState per gestire la paginazione locale
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Mostra 6 razzi per pagina

  // Carico i razzi quando il componente si monta
  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  // Funzione per gestire i cambiamenti dei filtri
  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter({ [filterName]: value }));
    setCurrentPage(1); // Reset alla prima pagina quando si filtra
  };

  // Reset alla prima pagina quando cambiano i filtri
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Calcola i razzi da mostrare nella pagina corrente
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRockets = rockets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rockets.length / itemsPerPage);

  // Gestisce il cambio pagina
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll in alto quando si cambia pagina
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3">
            <i className="fas fa-rocket me-2"></i>
            Razzi SpaceX
          </h1>
          <p className="text-muted">
            Tutti i razzi sviluppati da SpaceX
          </p>
        </div>
      </div>

      {/* Filtro semplice */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="rocketTypeFilter" className="form-label">
                    Filtra per nome
                  </label>
                  <select
                    id="rocketTypeFilter"
                    className="form-select"
                    value={filters.rocketType}
                    onChange={(e) => handleFilterChange('rocketType', e.target.value)}
                  >
                    <option value="all">Tutti i razzi</option>
                    <option value="falcon">Falcon</option>
                    <option value="dragon">Dragon</option>
                    <option value="starship">Starship</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>

                <div className="col-md-6 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => handleFilterChange('rocketType', 'all')}
                  >
                    <i className="fas fa-undo me-1"></i>
                    Mostra Tutti
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
            Mostrando {currentRockets.length} di {rockets.length} razzi
            {filters.rocketType !== 'all' && 
              <span className="badge bg-info ms-2">Filtro attivo</span>
            }
            {totalPages > 1 && (
              <span className="text-muted ms-2">
                (Pagina {currentPage} di {totalPages})
              </span>
            )}
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

      {/* Lista dei razzi */}
      {rockets.length > 0 ? (
        <>
          <div className="row">
            {currentRockets.map(rocket => (
              <RocketCard key={rocket.id} rocket={rocket} isAdmin={isAdmin} />
            ))}
          </div>
          
          {/* Paginazione */}
          {totalPages > 1 && (
            <div className="row mt-4">
              <div className="col-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <i className="fas fa-rocket fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">Nessun razzo trovato</h4>
              <p className="text-muted">
                Prova a modificare il filtro o rimuovilo per vedere tutti i razzi
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleFilterChange('rocketType', 'all')}
              >
                <i className="fas fa-undo me-2"></i>
                Mostra Tutti i Razzi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RocketsPage; 