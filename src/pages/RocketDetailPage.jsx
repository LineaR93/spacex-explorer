import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectRockets, selectLoading, selectError, fetchRockets } from '../store/spacexSlice';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

// Pagina RocketDetailPage - mostra dettagli di un singolo razzo
// Usa dynamic routing con useParams per ottenere l'ID del razzo
const RocketDetailPage = () => {
  const { id } = useParams(); // Ottiene l'ID del razzo dall'URL
  const dispatch = useDispatch();
  const { isAdmin } = useAuth();
  const rockets = useSelector(selectRockets);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // useState per gestire i commenti locali
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // useEffect carica i razzi e i commenti quando il componente si monta
  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(fetchRockets());
    }
    
    // Carica i commenti dal localStorage
    const savedComments = localStorage.getItem(`comments_${id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [dispatch, rockets.length, id]);

  // Trova il razzo specifico dall'ID
  const rocket = rockets.find(r => r.id === id);

  // Gestisce l'aggiunta di un nuovo commento
  const handleAddComment = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    // Validazione lunghezza massima 200 caratteri
    if (newComment.length > 200) {
      return;
    }

    const comment = {
      id: Date.now(),
      text: newComment,
      author: 'Utente SpaceX', // In una vera app useremmo l'utente loggato
      date: new Date().toLocaleString('it-IT')
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    
    // Salva nel localStorage
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    
    // Reset del form
    setNewComment('');
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!rocket) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <h4>Razzo non trovato</h4>
          <p>Il razzo che stai cercando non esiste.</p>
          <Link to="/rockets" className="btn btn-primary">
            Torna ai Razzi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/rockets">Razzi</Link>
          </li>
          <li className="breadcrumb-item active">{rocket.name}</li>
        </ol>
      </nav>

      {/* Header del razzo */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h2">
            <i className="fas fa-rocket me-2"></i>
            {rocket.name}
          </h1>
          <p className="text-muted">{rocket.description}</p>
        </div>
      </div>

      <div className="row">
        {/* Dettagli del razzo */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Informazioni Generali</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Primo volo:</strong> {rocket.first_flight || 'N/A'}</p>
                  <p><strong>Stato:</strong> 
                    <span className={`badge ms-2 ${rocket.active ? 'bg-success' : 'bg-secondary'}`}>
                      {rocket.active ? 'Operativo' : 'Ritirato'}
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p><strong>Riutilizzabile:</strong> {rocket.reusable ? 'Sì' : 'No'}</p>
                  <p><strong>Stadi:</strong> {rocket.stages || 'N/A'}</p>
                </div>
              </div>
              
              {/* Informazioni tecniche solo per admin */}
              {isAdmin && (
                <>
                  <hr />
                  <div className="alert alert-warning">
                    <i className="fas fa-lock me-2"></i>
                    <strong>Specifiche Tecniche (Riservate)</strong>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Altezza:</strong> {rocket.height?.meters} metri</p>
                      <p><strong>Diametro:</strong> {rocket.diameter?.meters} metri</p>
                      <p><strong>Massa:</strong> {rocket.mass?.kg?.toLocaleString()} kg</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Costo per lancio:</strong> ${rocket.cost_per_launch?.toLocaleString() || 'Classificato'}</p>
                      <p><strong>Tasso di successo:</strong> {rocket.success_rate_pct}%</p>
                      <p><strong>Payload to LEO:</strong> {rocket.payload_weights?.find(p => p.id === 'leo')?.kg?.toLocaleString() || 'Classificato'} kg</p>
                    </div>
                  </div>
                </>
              )}
              
              {/* Messaggio per user normali */}
              {!isAdmin && (
                <div className="mt-3">
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Nota:</strong> Le specifiche tecniche dettagliate sono disponibili solo per il personale autorizzato.
                  </div>
                </div>
              )}
            </div>
          </div>



          {/* Sezione Commenti */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-comments me-2"></i>
                Commenti ({comments.length})
              </h5>
            </div>
            <div className="card-body">
              {/* Form per nuovo commento */}
              <form onSubmit={handleAddComment} className="mb-4">
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">
                    Aggiungi un commento
                  </label>
                  <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Cosa ne pensi di questo razzo?"
                    maxLength="200"
                    required
                  />
                  <div className="form-text">
                    {newComment.length}/200 caratteri
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-paper-plane me-2"></i>
                  Invia Commento
                </button>
              </form>

              {/* Lista commenti */}
              {comments.length > 0 ? (
                <div className="comments-list">
                  {comments.map(comment => (
                    <div key={comment.id} className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between">
                        <strong>{comment.author}</strong>
                        <small className="text-muted">{comment.date}</small>
                      </div>
                      <p className="mb-0 mt-2">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-3">
                  Nessun commento ancora. Sii il primo a commentare!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar con info aggiuntive */}
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="mb-0">Immagini</h6>
            </div>
            <div className="card-body text-center">
              {rocket.flickr_images?.length > 0 ? (
                <img 
                  src={rocket.flickr_images[0]} 
                  alt={rocket.name}
                  className="img-fluid rounded"
                />
              ) : (
                <div className="text-muted">
                  <i className="fas fa-image fa-3x"></i>
                  <p>Nessuna immagine disponibile</p>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Link Utili</h6>
            </div>
            <div className="card-body">
              {rocket.wikipedia && (
                <a 
                  href={rocket.wikipedia} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary w-100 mb-2"
                >
                  <i className="fab fa-wikipedia-w me-2"></i>
                  Wikipedia
                </a>
              )}
              <Link to="/rockets" className="btn btn-secondary w-100">
                <i className="fas fa-arrow-left me-2"></i>
                Torna ai Razzi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketDetailPage; 