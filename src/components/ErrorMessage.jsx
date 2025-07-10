// Componente ErrorMessage per mostrare messaggi di errore
// Usa Bootstrap Alert per lo stile
const ErrorMessage = ({ error, onClose }) => {
  // Se non c'è errore, non mostrare nulla
  if (!error) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Errore!</strong> {error}
      
      {/* Bottone per chiudere l'errore se onClose è fornito */}
      {onClose && (
        <button 
          type="button" 
          className="btn-close" 
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
};

export default ErrorMessage; 