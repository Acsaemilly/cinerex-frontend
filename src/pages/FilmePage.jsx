import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import FilmeCard from '../components/FilmeCard.jsx';
import FilmeModal from '../components/FilmeModal.jsx';

import posterDevoradores from '../assets/posters/devoradores.jpg';
import posterObsessao from '../assets/posters/obsessao.jpg';
import posterFnaf2 from '../assets/posters/fnaf2.jpg';
import posterHomemAranha from '../assets/posters/homem_aranha.jpg';
import posterExterminio from '../assets/posters/exterminio.jpg';

const FILMES_INICIAIS = [
  {
    id: 1,
    nome: 'Devoradores de Estrelas',
    descricao: 'Uma missão espacial para salvar a humanidade descobre segredos estelares.',
    duracao: 140,
    distribuicao: 'Universal Pictures',
    genero: 'Ficção Científica',
    classificacao: 'DOZE',
    foto: posterDevoradores,
  },
  {
    id: 2,
    nome: 'Obsessão',
    descricao: 'Um suspense psicológico perturbador que desafia a sanidade.',
    duracao: 110,
    distribuicao: 'A24',
    genero: 'Suspense',
    classificacao: 'DEZESSEIS',
    foto: posterObsessao,
  },
  {
    id: 3,
    nome: 'Cinco Noites no Freddy 2',
    descricao: 'O pesadelo na pizzaria mais assombrada do mundo continua.',
    duracao: 115,
    distribuicao: 'Blumhouse',
    genero: 'Terror',
    classificacao: 'CATORZE',
    foto: posterFnaf2,
  },
  {
    id: 4,
    nome: 'Homem Aranha: Um novo dia',
    descricao: 'Peter Parker enfrenta novos desafios e vilões que ameaçam a cidade.',
    duracao: 135,
    distribuicao: 'Sony / Marvel',
    genero: 'Ação',
    classificacao: 'DEZ',
    foto: posterHomemAranha,
  },
  {
    id: 5,
    nome: 'Extermínio: A evolução',
    descricao: 'A luta pela sobrevivência após o colapso global da humanidade.',
    duracao: 125,
    distribuicao: 'Warner Bros',
    genero: 'Ação',
    classificacao: 'DEZOITO',
    foto: posterExterminio,
  },
];

function FilmePage() {
  const [filmes, setFilmes] = useState(FILMES_INICIAIS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);

  const handleOpenAddModal = () => {
    setFilmeEmEdicao(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (filme) => {
    setFilmeEmEdicao(filme);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFilmeEmEdicao(null);
  };

  const handleSaveFilme = (filmeAtualizado) => {
    if (filmeEmEdicao) {
      setFilmes((prev) =>
        prev.map((f) => (f.id === filmeAtualizado.id ? filmeAtualizado : f))
      );
    } else {
      setFilmes((prev) => [filmeAtualizado, ...prev]);
    }
    handleCloseModal();
  };

  const handleDeleteFilme = (id) => {
    const filmeAlvo = filmes.find((f) => f.id === id);
    const confirmou = window.confirm(
      `Deseja realmente remover o filme "${filmeAlvo?.nome || ''}"?`
    );
    if (confirmou) {
      setFilmes((prev) => prev.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#181818' }}>
      {/* Sidebar de navegação */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
        <div className="container-fluid">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
            <h1
              className="font-poetsen text-danger m-0"
              style={{ fontSize: '2.2rem', letterSpacing: '0.5px' }}
            >
              Filmes em cartaz agora
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

          {/* Grid de Filmes */}
          {filmes.length === 0 ? (
            <div className="text-center text-secondary py-5">
              <i className="bi bi-film fs-1 d-block mb-3"></i>
              <p className="fs-5">Nenhum filme em cartaz no momento.</p>
              <button
                type="button"
                className="btn btn-outline-danger mt-2"
                onClick={handleOpenAddModal}
              >
                Adicionar primeiro filme
              </button>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-3 g-4 g-xl-5">
              {filmes.map((filme) => (
                <FilmeCard
                  key={filme.id}
                  filme={filme}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteFilme}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal de Adicionar / Editar Filme */}
      <FilmeModal
        show={isModalOpen}
        filmeToEdit={filmeEmEdicao}
        onClose={handleCloseModal}
        onSave={handleSaveFilme}
      />
    </div>
  );
}

export default FilmePage;
