function FilmeCard({ filme, onEdit, onDelete }) {
  return (
    <div className="col">
      <div className="card h-100 bg-white border-0 rounded-4 shadow-sm p-3 d-flex flex-column justify-content-between">
        <div>
          <div
            className="w-100 overflow-hidden rounded-3 mb-3 bg-secondary-subtle d-flex align-items-center justify-content-center"
            style={{ height: '300px' }}
          >
            {filme.foto ? (
              <img
                src={filme.foto}
                alt={filme.nome}
                className="w-100 h-100 object-fit-cover rounded-3"
              />
            ) : (
              <div className="text-center text-muted p-3">
                <i className="bi bi-film fs-1 d-block mb-2"></i>
                <span className="small">Sem foto</span>
              </div>
            )}
          </div>

          <h5
            className="text-center fw-bold text-dark mb-3 px-2 text-truncate"
            title={filme.nome}
            style={{ fontSize: '1.1rem' }}
          >
            {filme.nome}
          </h5>
        </div>

        <div className="d-flex justify-content-between align-items-center px-2 pt-2 border-top">
          <button
            type="button"
            className="btn btn-link text-dark p-0 border-0"
            onClick={() => onEdit(filme)}
            title="Editar filme"
            style={{ fontSize: '1.25rem' }}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>

          <button
            type="button"
            className="btn btn-link text-dark p-0 border-0"
            onClick={() => onDelete(filme.id)}
            title="Excluir filme"
            style={{ fontSize: '1.25rem' }}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilmeCard;
