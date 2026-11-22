import { useState, useEffect } from 'react';

function FuncionarioModal({ show, onClose, onSave, funcionarioToEdit }) {
  const isEditing = Boolean(funcionarioToEdit);

  const [formData, setFormData] = useState({
    email: '', 
    senha: '',
    cargo: ''
  });

  const CARGOS = [
    { value: 'ADMINISTRADOR', label: 'Administrador' },
    { value: 'USUARIO', label: 'Usuário' },
  ];

  useEffect(() => {
  if (funcionarioToEdit) {
    setFormData({
      email: funcionarioToEdit.email || '',
      senha: '', // nunca preencher a senha ao editar
      cargo: funcionarioToEdit.cargo || '',
    });
  } else {
    setFormData({
      email: '',
      senha: '',
      cargo: '',
    });
  }
}, [funcionarioToEdit, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      const { senha, ...resto } = formData;

      onSave({
        ...resto,
        ...(senha.trim() && { senha }), // só inclui a senha se foi digitada
        id: funcionarioToEdit ? funcionarioToEdit.id : Date.now(),
      });
    };

  return (
   <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
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
              {isEditing ? 'Editar funcionário' : 'Adicionar funcionário'}
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Coluna Esquerda: Dados Textuais */}
              <div className="col-12 col-md-7 d-flex flex-column gap-3">
                <div>
                  <label htmlFor="email" className="form-label fw-medium text-secondary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite aqui"
                    className="form-control bg-light border-0 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="senha" className="form-label fw-medium text-secondary mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder={isEditing ? 'Deixe em branco para manter' : 'Digite aqui'}
                    className="form-control bg-light border-0 py-2"
                    required={!isEditing}
                  />
                </div>

                <div>
                  <label htmlFor="cargo" className="form-label fw-medium text-secondary mb-1">
                    Cargo
                  </label>
                  <select
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className="form-select bg-light border-0 py-2"
                    required
                  >
                    <option value="" disabled>Selecione o cargo</option>
                    {CARGOS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

              {/* Coluna Direita: Ações */}
              <div className="col-12 col-md-5 d-flex flex-column justify-content-between">
              
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
              </div>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FuncionarioModal;
