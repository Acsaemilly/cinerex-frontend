import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import SalaRow from '../components/SalaRow.jsx';
import SalaModal from '../components/SalaModal.jsx';

// Estado local mockado, igual ao padrao usado hoje em FilmePage.jsx (sem fetch pro
// backend ainda). Quando o grupo decidir integrar de verdade, e so trocar esse
// useState inicial por uma chamada GET /api/v1/sala e os handlers por POST/PUT/DELETE.
const SALAS_INICIAIS = [
  { id: 1, numero: 1, nome: 'Sala 1', numeroAssentos: 80, tipoSala: 'PADRAO', status: 'MANUTENCAO' },
  { id: 2, numero: 2, nome: 'Sala 2', numeroAssentos: 80, tipoSala: 'PADRAO', status: 'MANUTENCAO' },
  { id: 3, numero: 3, nome: 'Sala 3', numeroAssentos: 60, tipoSala: 'PADRAO', status: 'NORMAL' },
  { id: 4, numero: 4, nome: 'Sala 4 IMAX', numeroAssentos: 100, tipoSala: 'PREMIUM', status: 'MANUTENCAO' },
  { id: 5, numero: 5, nome: 'Sala 5', numeroAssentos: 60, tipoSala: 'PADRAO', status: 'NORMAL' },
];

function proximoNumero(salas) {
  if (salas.length === 0) return 1;
  return Math.max(...salas.map((s) => s.numero)) + 1;
}

function SalaPage() {
  const [salas, setSalas] = useState(SALAS_INICIAIS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salaEmEdicao, setSalaEmEdicao] = useState(null);

  const handleOpenAddModal = () => {
    setSalaEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (sala) => {
    setSalaEmEdicao(sala);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSalaEmEdicao(null);
  };

  const handleSaveSala = (salaForm) => {
    if (salaEmEdicao) {
      setSalas((prev) =>
        prev.map((s) => (s.id === salaForm.id ? { ...s, ...salaForm } : s))
      );
    } else {
      const numero = proximoNumero(salas);
      setSalas((prev) => [
        ...prev,
        { ...salaForm, id: Date.now(), numero, status: 'NORMAL' },
      ]);
    }
    handleCloseModal();
  };

  const handleDeleteSala = (id) => {
    const salaAlvo = salas.find((s) => s.id === id);
    const confirmou = window.confirm(
      `Deseja realmente remover a Sala ${salaAlvo?.numero}?`
    );
    if (confirmou) {
      setSalas((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#181818' }}>
      {/* Sidebar de navegacao */}
      <Sidebar />

      {/* Conteudo Principal */}
      <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
        <div className="container-fluid">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
            <h1
              className="font-poetsen text-danger m-0"
              style={{ fontSize: '2.2rem', letterSpacing: '0.5px' }}
            >
              Salas do cinema
            </h1>

            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="btn btn-danger text-uppercase fw-bold px-4 py-2 shadow-sm rounded-2"
                style={{ fontSize: '0.95rem' }}
              >
                ADICIONAR
              </button>

              <div
                className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '46px', height: '46px', cursor: 'pointer' }}
                title="Perfil do usuário"
              >
                <i className="bi bi-person-fill fs-3"></i>
              </div>
            </div>
          </div>

          {/* Lista de Salas */}
          {salas.length === 0 ? (
            <div className="text-center text-secondary py-5">
              <i className="bi bi-door-open fs-1 d-block mb-3"></i>
              <p className="fs-5">Nenhuma sala cadastrada no momento.</p>
              <button
                type="button"
                className="btn btn-outline-danger mt-2"
                onClick={handleOpenAddModal}
              >
                Adicionar primeira sala
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column">
              {salas
                .slice()
                .sort((a, b) => a.numero - b.numero)
                .map((sala) => (
                  <SalaRow
                    key={sala.id}
                    sala={sala}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteSala}
                  />
                ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal de Adicionar / Editar Sala */}
      <SalaModal
        show={isModalOpen}
        salaToEdit={salaEmEdicao}
        onClose={handleCloseModal}
        onSave={handleSaveSala}
      />
    </div>
  );
}

export default SalaPage;
