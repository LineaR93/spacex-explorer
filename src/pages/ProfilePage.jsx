import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Pagina ProfilePage - gestisce il profilo utente
// Form controllato per modificare nome e email
const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  
  // useState mantiene i dati del form per l'editing
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Aggiorno il form quando i dati dell'utente cambiano
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  // Gestisce i cambiamenti nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestisce il submit del form - aggiornamento reale
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validazione semplice
    if (!formData.name || !formData.email) {
      setError('Tutti i campi sono obbligatori');
      return;
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email non valida');
      return;
    }

    // Aggiornamento del profilo usando AuthContext
    const result = updateProfile({
      name: formData.name,
      email: formData.email
    });

    if (result.success) {
      setSuccess(result.message);
      // Nasconde il messaggio dopo 3 secondi
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Header */}
          <div className="mb-4">
            <h1 className="h3">
              <i className="fas fa-user me-2"></i>
              Il Mio Profilo
            </h1>
            <p className="text-muted">
              Gestisci le informazioni del tuo account
            </p>
          </div>

          {/* Form del profilo */}
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Campo Nome */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Inserisci il tuo nome"
                    required
                  />
                </div>

                {/* Campo Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Inserisci la tua email"
                    required
                  />
                </div>

                {/* Ruolo (readonly) */}
                <div className="mb-3">
                  <label className="form-label">
                    Ruolo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={user?.role === 'admin' ? 'Amministratore' : 'Utente'}
                    readOnly
                  />
                </div>

                {/* Messaggi di feedback */}
                {error && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </div>
                )}

                {/* Bottone di salvataggio */}
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save me-2"></i>
                  Salva Modifiche
                </button>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 