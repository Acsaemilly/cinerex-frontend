import { useState } from 'react';
import { useParams, useNavigate, useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import AdicionarSessaoModal from '../components/AdicionarSessaoModal';

const SESSOES_INICIAIS = [
    { id: 1, sala: "Sala 1", data: "01/12/2026", horario: "13:00" },
    { id: 2, sala: "Sala 1", data: "01/12/2026", horario: "13:00" },
    { id: 3, sala: "Sala 1", data: "01/12/2026", horario: "13:00" },
    { id: 4, sala: "Sala 2", data: "01/12/2026", horario: "13:00" },
];

function SessoesCard({ sala, sessoes, onDelete, onCriarIngresso }) {
    const linhas = sessoes.map((sessao) => (
        <div>
            <div className="d-flex flex-row justify-content-start">
                <p>#{sessao.id} [{sessao.data}] {sessao.horario}</p>
            </div>
            <div className='d-flex flex-row justify-content-end'>
                <i
                    className="bi bi-trash"
                    aria-hidden="true"
                    style={{ cursor: "pointer" }}
                    onClick={() => onDelete(sessao.id)}
                />
                <i
                    className="bi bi-card-text"
                    aria-hidden="true"
                    style={{ cursor: "pointer", marginLeft: 10 }}
                    onClick={() => onCriarIngresso(sessao.id)}
                />
            </div>
        </div>
    ));

    return (
        <div className="d-flex flex-column m-3 border border-danger border-3 rounded-3 shadow p-3">
            <h4>{sala}</h4>
            {linhas}
        </div>
    );
}
function SessoesCards({ sessoes, onDelete, onCriarIngresso }) {
    const agrupados = Object.groupBy(sessoes, ({ sala }) => sala);

    return Object.entries(agrupados).map(([sala, sessoes]) => (
        <SessoesCard
            sala={sala}
            sessoes={sessoes}
            onDelete={onDelete}
            onCriarIngresso={onCriarIngresso}
        />
    ));
}

export default function FilmeSessoesPage() {
    const navigate = useNavigate();
    const { filmeId } = useParams();
    const { filme } = useLocation().state;
    const [ sessoes, setSessoes ] = useState(SESSOES_INICIAIS);
    const [ modalAberto, setModalAberto ] = useState(false);

    function onDelete(id) {
        setSessoes(sessoes.filter((sessao, index) => sessao.id !== id));
    }

    function onCriarIngresso(id) {
        alert(`Ingresso para a sessao ${id} criado!`);
    }

    function onSalvar(sessao) {
        setSessoes(sessoes.concat([ sessao ]));
    }

    return (
        <div className="d-flex flex-row">
            <Sidebar />
            <main className="d-flex flex-column flex-grow-1 text-light" style={{ backgroundColor: "#191919"}}>
                <div className="d-flex m-5 justify-content-between align-items-center">
                    <h1 className="text-danger font-poetsen">Sessoes</h1>
                    <button className="btn btn-danger text-uppercase fw-bold rounded-2 h-75" onClick={() => setModalAberto(true)}>ADICIONAR</button>
                </div>
                <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
                    <div className="d-flex flex-row text-bg-light flex-grow-1 p-3 mb-5 w-50 rounded"> {/* why doesnt this div grow horizontally? */}
                        <div className="d-flex flex-column justify-content-between">
                            <img src={filme.foto} width="200px" />
                            <i
                                className="bi bi-arrow-left-circle-fill"
                                style={{ fontSize: "25px", cursor: "pointer" }}
                                onClick={() => navigate(-1)}
                                aria-hidden="true" />
                        </div>
                        <div className="ps-3 d-flex flex-column flex-grow-1">
                            <h5>{filme.nome}</h5>
                            <SessoesCards sessoes={sessoes} onDelete={onDelete} onCriarIngresso={onCriarIngresso} />
                        </div>
                    </div>
                </div>
                {modalAberto && <AdicionarSessaoModal onSalvar={onSalvar} onFechar={() => setModalAberto(false)} />}
            </main>
        </div>
    );
}
