// Componente Spinner per mostrare lo stato di caricamento
// Usa le classi Bootstrap per lo stile
const Spinner = ({ size = 'md', variant = 'primary' }) => {
  // Determino la classe di dimensione basata sul prop size
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';
  
  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <div 
        className={`spinner-border text-${variant} ${sizeClass}`} 
        role="status"
        aria-hidden="true"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner; 