import { memo } from 'react';
import { Link } from 'react-router-dom';

// Componente RocketCard per mostrare le informazioni di un razzo
// Usa React.memo per ottimizzare le prestazioni
const RocketCard = memo(({ rocket, isAdmin = false }) => {
  // Formatto la data del primo volo
  const formatDate = (dateString) => {
    if (!dateString) return 'Data non disponibile';
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT');
  };

  // Formatto l'altezza del razzo
  const formatHeight = (height) => {
    if (!height || !height.meters) return 'N/A';
    return `${height.meters} m`;
  };

  // Formatto la massa del razzo
  const formatMass = (mass) => {
    if (!mass || !mass.kg) return 'N/A';
    return `${mass.kg.toLocaleString()} kg`;
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        {/* Immagine del razzo */}
        <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
          {rocket.flickr_images && rocket.flickr_images.length > 0 ? (
            <img
              src={rocket.flickr_images[0]}
              alt={rocket.name}
              className="img-fluid rounded"
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="text-muted">
              <i className="fas fa-rocket fa-3x"></i>
            </div>
          )}
        </div>

        {/* Contenuto della card */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{rocket.name}</h5>
          
          {/* Descrizione breve */}
          <p className="card-text text-muted small flex-grow-1">
            {rocket.description 
              ? (rocket.description.length > 100 
                  ? `${rocket.description.substring(0, 100)}...` 
                  : rocket.description)
              : 'Descrizione non disponibile'
            }
          </p>

          {/* Informazioni base per tutti */}
          <div className="row text-sm mb-3">
            <div className="col-6">
              <small className="text-muted">Primo volo:</small>
              <div className="fw-bold">{formatDate(rocket.first_flight)}</div>
            </div>
            <div className="col-6">
              <small className="text-muted">Stato:</small>
              <div className="fw-bold">{rocket.active ? 'Attivo' : 'Non attivo'}</div>
            </div>
          </div>

          {/* Dati tecnici SOLO per admin */}
          {isAdmin && (
            <div className="border-top pt-2 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-danger fw-bold">
                  <i className="fas fa-lock me-1"></i>
                  DATI RISERVATI
                </small>
              </div>
              <div className="row text-sm">
                <div className="col-6">
                  <small className="text-muted">Altezza:</small>
                  <div className="fw-bold">{formatHeight(rocket.height)}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Massa:</small>
                  <div className="fw-bold">{formatMass(rocket.mass)}</div>
                </div>
              </div>
              <div className="row text-sm mt-2">
                <div className="col-6">
                  <small className="text-muted">Stadi:</small>
                  <div className="fw-bold">{rocket.stages || 'N/A'}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Costo:</small>
                  <div className="fw-bold text-danger">${rocket.cost_per_launch ? `${(rocket.cost_per_launch / 1000000).toFixed(0)}M` : 'Classificato'}</div>
                </div>
              </div>
            </div>
          )}



          {/* Link per vedere i dettagli */}
          <Link 
            to={`/rockets/${rocket.id}`} 
            className="btn btn-primary mt-auto"
          >
            Vedi Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
});

// Imposto il displayName per React DevTools
RocketCard.displayName = 'RocketCard';

export default RocketCard; 