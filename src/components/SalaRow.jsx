// Mapeia os valores reais do enum StatusSala (NORMAL / MANUTENCAO) para um texto
// mais amigavel na tela. Nao existe (ainda) um estado "Ocupado" de verdade no backend
// -- isso so viria de uma sessao marcada pra essa sala, feature que nao e sala.
const STATUS_LABELS = {
  NORMAL: 'Vago',
  MANUTENCAO: 'Em manutenção',
};

const STATUS_BADGE_CLASS = {
  NORMAL: 'text-success',
  MANUTENCAO: 'text-warning',
};

const TIPO_LABELS = {
  PADRAO: 'Padrão',
  PREMIUM: 'Premium',
};

function SalaRow({ sala, onEdit, onDelete }) {
  return (
    <div className="d-flex align-items-center justify-content-between bg-white rounded-3 shadow-sm px-4 py-3 mb-3">
      <div className="d-flex flex-column">
        <span className="fw-semibold text-dark">Sala {sala.numero}</span>
        {sala.nome && (
          <span className="small text-secondary">{sala.nome}</span>
        )}
      </div>

      <span className="small text-secondary d-none d-md-inline">
        {TIPO_LABELS[sala.tipoSala] || sala.tipoSala} · {sala.numeroAssentos} assentos
      </span>

      <span className={`fw-medium ${STATUS_BADGE_CLASS[sala.status] || 'text-secondary'}`}>
        {STATUS_LABELS[sala.status] || sala.status}
      </span>

      <div className="d-flex gap-3">
        <button
          type="button"
          className="btn btn-link text-dark p-0 border-0"
          onClick={() => onEdit(sala)}
          title="Editar sala"
          style={{ fontSize: '1.1rem' }}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button
          type="button"
          className="btn btn-link text-dark p-0 border-0"
          onClick={() => onDelete(sala.id)}
          title="Excluir sala"
          style={{ fontSize: '1.1rem' }}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default SalaRow;
