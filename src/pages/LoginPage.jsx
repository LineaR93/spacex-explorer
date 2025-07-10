import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Pagina di login con form controllato
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Gestisco i cambiamenti nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestisco il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validazione semplice
    if (!formData.email || !formData.password) {
      setError('Inserisci email e password');
      setLoading(false);
      return;
    }

    // Tento il login
    const result = login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              {/* Header */}
              <div className="text-center mb-4">
                <i className="fas fa-rocket fa-3x text-primary mb-3"></i>
                <h2 className="h4">Accedi a SpaceX</h2>
                <p className="text-muted">Inserisci le tue credenziali</p>
              </div>

              {/* Form di login */}
              <form onSubmit={handleSubmit}>
                {/* Campo email */}
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
                    placeholder="inserisci la tua email"
                    required
                  />
                </div>

                {/* Campo password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="inserisci la tua password"
                    required
                  />
                </div>

                {/* Messaggio di errore */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Bottone di login */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Accedendo...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Accedi
                    </>
                  )}
                </button>
              </form>

              {/* Credenziali di accesso */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="mb-2">
                  <i className="fas fa-info-circle me-2"></i>
                  Credenziali di accesso
                </h6>
                <div className="small">
                  <div className="mb-2">
                    <strong>Admin:</strong><br />
                    <code>admin@spacex.com</code><br />
                    <code>admin123</code>
                  </div>
                  <div>
                    <strong>User:</strong><br />
                    <code>user@spacex.com</code><br />
                    <code>user123</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 