import { useState, useEffect, useRef } from 'react';

function FilmeModal({ show, onClose, onSave, filmeToEdit }) {
  const isEditing = Boolean(filmeToEdit);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    duracao: '',
    distribuicao: '',
    genero: '',
    classificacao: '',
    foto: '',
  });

  useEffect(() => {
    if (filmeToEdit) {
      setFormData({
        nome: filmeToEdit.nome || '',
        descricao: filmeToEdit.descricao || '',
        duracao: filmeToEdit.duracao || '',
        distribuicao: filmeToEdit.distribuicao || '',
        genero: filmeToEdit.genero || '',
        classificacao: filmeToEdit.classificacao || '',
        foto: filmeToEdit.foto || '',
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
        duracao: '',
        distribuicao: '',
        genero: '',
        classificacao: '',
        foto: '',
      });
    }
  }, [filmeToEdit, show]);

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
    if (!formData.nome.trim()) {
      alert('Por favor, informe o título do filme.');
      return;
    }
    onSave({
      ...formData,
      id: filmeToEdit ? filmeToEdit.id : Date.now(),
    });
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
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
              {isEditing ? 'Editar filme' : 'Adicionar filme'}
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Coluna Esquerda: Dados Textuais */}
              <div className="col-12 col-md-7 d-flex flex-column gap-3">
                <div>
                  <label htmlFor="nome" className="form-label fw-medium text-secondary mb-1">
                    Título do filme
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite aqui"
                    className="form-control bg-light border-0 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="descricao" className="form-label fw-medium text-secondary mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows="3"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Digite aqui"
                    className="form-control bg-light border-0 py-2"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="duracao" className="form-label fw-medium text-secondary mb-1">
                    Duração (minutos)
                  </label>
                  <input
                    type="number"
                    id="duracao"
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleChange}
                    placeholder="Digite aqui"
                    className="form-control bg-light border-0 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="distribuicao" className="form-label fw-medium text-secondary mb-1">
                    Distribuição
                  </label>
                  <input
                    type="text"
                    id="distribuicao"
                    name="distribuicao"
                    value={formData.distribuicao}
                    onChange={handleChange}
                    placeholder="Digite aqui"
                    className="form-control bg-light border-0 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="genero" className="form-label fw-medium text-secondary mb-1">
                    Gênero
                  </label>
                  <select
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className="form-select bg-light border-0 py-2"
                  >
                    <option value="">Selecione uma das opções</option>
                    <option value="Ação">Ação</option>
                    <option value="Comédia">Comédia</option>
                    <option value="Drama">Drama</option>
                    <option value="Ficção Científica">Ficção Científica</option>
                    <option value="Romance">Romance</option>
                    <option value="Suspense">Suspense</option>
                    <option value="Terror">Terror</option>
                    <option value="Animação">Animação</option>
                    <option value="Aventura">Aventura</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="classificacao" className="form-label fw-medium text-secondary mb-1">
                    Classificação indicativa
                  </label>
                  <select
                    id="classificacao"
                    name="classificacao"
                    value={formData.classificacao}
                    onChange={handleChange}
                    className="form-select bg-light border-0 py-2"
                  >
                    <option value="">Selecione uma das opções</option>
                    <option value="LIVRE">Livre</option>
                    <option value="DEZ">10 anos</option>
                    <option value="DOZE">12 anos</option>
                    <option value="CATORZE">14 anos</option>
                    <option value="DEZESSEIS">16 anos</option>
                    <option value="DEZOITO">18 anos</option>
                  </select>
                </div>
              </div>

              {/* Coluna Direita: Foto e Ações */}
              <div className="col-12 col-md-5 d-flex flex-column justify-content-between">
                <div>
                  <label className="form-label fw-medium text-secondary mb-1">
                    Foto do cartaz
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="position-relative w-100 rounded-3 overflow-hidden d-flex align-items-center justify-content-center cursor-pointer shadow-sm"
                    style={{
                      height: '280px',
                      backgroundColor: formData.foto ? '#000' : '#F07167',
                      cursor: 'pointer',
                    }}
                    title="Clique para selecionar uma foto"
                  >
                    {formData.foto ? (
                      <>
                        <img
                          src={formData.foto}
                          alt="Prévia do filme"
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div
                          className="position-absolute bottom-0 end-0 m-2 bg-dark rounded-circle text-white d-flex align-items-center justify-content-center shadow"
                          style={{ width: '38px', height: '38px' }}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-dark">
                        <i className="bi bi-plus-circle-fill fs-1 text-black"></i>
                        <p className="small fw-semibold mt-2 text-dark">Selecionar foto</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="d-none"
                  />
                  <small className="text-muted d-block mt-1 text-center">
                    Formatos: PNG, JPG ou WEBP
                  </small>
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilmeModal;
