// Componente LaunchCard per mostrare le informazioni di un lancio
const LaunchCard = ({ launch, rockets = [] }) => {
  // Formatto la data del lancio
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Funzione per ottenere il nome del razzo dall'ID
  const getRocketName = (rocketId) => {
    // Lookup map per i razzi SpaceX più comuni (fallback se non abbiamo i dati completi)
    const rocketNames = {
      '5e9d0d95eda69973a809d1ec': 'Falcon 9',
      '5e9d0d95eda69955f709d1eb': 'Falcon Heavy', 
      '5e9d0d96eda699382d09d1ee': 'Starship',
      '5e9d0d95eda69974db09d1ed': 'Falcon 1'
    };

    // Se abbiamo i dati dei razzi, cerca il nome
    if (rockets.length > 0) {
      const rocket = rockets.find(r => r.id === rocketId);
      if (rocket) return rocket.name;
    }

    // Fallback: usa il lookup map o mostra un nome abbreviato
    return rocketNames[rocketId] || `Razzo ${rocketId?.substring(0, 8)}...`;
  };

  // Determino lo stato del lancio
  const getStatusBadge = () => {
    if (launch.upcoming) {
      return <span className="badge bg-info">Prossimo</span>;
    }
    if (launch.success === true) {
      return <span className="badge bg-success">Successo</span>;
    }
    if (launch.success === false) {
      return <span className="badge bg-danger">Fallito</span>;
    }
    return <span className="badge bg-secondary">Sconosciuto</span>;
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        {/* Immagine del lancio */}
        <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
          {launch.links?.patch?.small ? (
            <img
              src={launch.links.patch.small}
              alt={launch.name}
              className="img-fluid"
              style={{ maxHeight: '150px', maxWidth: '150px' }}
            />
          ) : (
            <div className="text-muted">
              <i className="fas fa-rocket fa-3x"></i>
            </div>
          )}
        </div>

        {/* Contenuto della card */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{launch.name}</h5>
          
          {/* Dettagli del lancio */}
          <div className="mb-3">
            <small className="text-muted">Data lancio:</small>
            <div className="fw-bold">{formatDate(launch.date_utc)}</div>
          </div>

          <div className="mb-3">
            <small className="text-muted">Razzo:</small>
            <div className="fw-bold">{getRocketName(launch.rocket) || 'N/A'}</div>
          </div>

          {/* Stato del lancio */}
          <div className="mb-3">
            {getStatusBadge()}
          </div>

          {/* Descrizione breve */}
          <p className="card-text text-muted small flex-grow-1">
            {launch.details 
              ? (launch.details.length > 100 
                  ? `${launch.details.substring(0, 100)}...` 
                  : launch.details)
              : 'Nessuna descrizione disponibile'
            }
          </p>

          {/* Link esterni */}
          <div className="mt-auto">
            {launch.links?.webcast && (
              <a 
                href={launch.links.webcast} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary me-2"
              >
                <i className="fab fa-youtube me-1"></i>
                Video
              </a>
            )}
            {launch.links?.article && (
              <a 
                href={launch.links.article} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary"
              >
                <i className="fas fa-newspaper me-1"></i>
                Articolo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchCard; 