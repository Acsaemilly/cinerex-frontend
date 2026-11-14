import { useState, useEffect } from 'react';

const TIPOS_SALA = [
  { value: 'PADRAO', label: 'Padrão' },
  { value: 'PREMIUM', label: 'Premium' },
];

const STATUS_SALA = [
  { value: 'NORMAL', label: 'Vago' },
  { value: 'MANUTENCAO', label: 'Em manutenção' },
];

function SalaModal({ show, onClose, onSave, salaToEdit }) {
  const isEditing = Boolean(salaToEdit);

  const [formData, setFormData] = useState({
    nome: '',
    numeroAssentos: '',
    tipoSala: '',
    status: 'NORMAL',
  });

  useEffect(() => {
    if (salaToEdit) {
      setFormData({
        nome: salaToEdit.nome || '',
        numeroAssentos: salaToEdit.numeroAssentos || '',
        tipoSala: salaToEdit.tipoSala || '',
        status: salaToEdit.status || 'NORMAL',
      });
    } else {
      setFormData({
        nome: '',
        numeroAssentos: '',
        tipoSala: '',
        status: 'NORMAL',
      });
    }
  }, [salaToEdit, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      alert('Por favor, informe o nome da sala.');
      return;
    }
    if (!formData.numeroAssentos || Number(formData.numeroAssentos) <= 0) {
      alert('Informe uma quantidade de assentos válida.');
      return;
    }
    if (!formData.tipoSala) {
      alert('Selecione o tipo da sala.');
      return;
    }

    onSave({
      ...formData,
      numeroAssentos: Number(formData.numeroAssentos),
      id: salaToEdit ? salaToEdit.id : undefined,
      numero: salaToEdit ? salaToEdit.numero : undefined,
    });
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 p-3 shadow-lg">
          {/* Header */}
          <div className="d-flex align-items-center mb-3">
            <button
              type="button"
              className="btn btn-link text-dark p-0 border-0 me-3"
              onClick={onClose}
              title="Voltar"
            >
              <i className="bi bi-arrow-left-circle-fill fs-2"></i>
            </button>
            <h3 className="modal-title font-poetsen text-danger m-0">
              {isEditing ? 'Editar sala' : 'Adicionar sala'}
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-3">
              <div>
                <label htmlFor="nome" className="form-label fw-medium text-secondary mb-1">
                  Nome da sala
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Sala 1, Sala IMAX..."
                  className="form-control bg-light border-0 py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="numeroAssentos" className="form-label fw-medium text-secondary mb-1">
                  Quantidade de assentos
                </label>
                <input
                  type="number"
                  id="numeroAssentos"
                  name="numeroAssentos"
                  min="1"
                  value={formData.numeroAssentos}
                  onChange={handleChange}
                  placeholder="Ex: 80"
                  className="form-control bg-light border-0 py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="tipoSala" className="form-label fw-medium text-secondary mb-1">
                  Tipo
                </label>
                <select
                  id="tipoSala"
                  name="tipoSala"
                  value={formData.tipoSala}
                  onChange={handleChange}
                  className="form-select bg-light border-0 py-2"
                  required
                >
                  <option value="">Selecione uma das opções</option>
                  {TIPOS_SALA.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status so aparece ao editar: uma sala nova sempre nasce "NORMAL"/Vago */}
              {isEditing && (
                <div>
                  <label htmlFor="status" className="form-label fw-medium text-secondary mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select bg-light border-0 py-2"
                  >
                    {STATUS_SALA.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mt-4 d-flex flex-column gap-2">
              <button
                type="submit"
                className="btn btn-danger text-uppercase fw-bold py-2 shadow-sm"
              >
                CONFIRMAR
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary text-uppercase fw-bold py-2"
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalaModal;
