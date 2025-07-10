// Componente Pagination - gestisce la paginazione semplice
// Riceve currentPage, totalPages e onPageChange come props
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Se c'è solo una pagina, non mostra la paginazione
  if (totalPages <= 1) return null;

  // Genera array delle pagine da mostrare
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Aggiusta l'inizio se ci sono troppe poche pagine alla fine
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Navigazione pagine">
      <ul className="pagination justify-content-center">
        {/* Bottone Precedente */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
            <span className="d-none d-md-inline ms-1">Precedente</span>
          </button>
        </li>

        {/* Prima pagina se non visibile */}
        {pageNumbers[0] > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => onPageChange(1)}>
                1
              </button>
            </li>
            {pageNumbers[0] > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {/* Numeri delle pagine */}
        {pageNumbers.map(page => (
          <li 
            key={page} 
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Ultima pagina se non visibile */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button className="page-link" onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Bottone Successivo */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="d-none d-md-inline me-1">Successivo</span>
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
      
      {/* Info paginazione */}
      <div className="text-center text-muted small mt-2">
        Pagina {currentPage} di {totalPages}
      </div>
    </nav>
  );
};

export default Pagination; 