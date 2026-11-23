import { useState } from 'react';
import { useParams, useNavigate, useLocation } from "react-router";
import Sidebar from "../components/Sidebar";

const SESSOES_INICIAIS = [
    { sala: "Sala 1", horario: "01/12/2026 - 13:00" },
    { sala: "Sala 1", horario: "01/12/2026 - 15:00" },
    { sala: "Sala 1", horario: "01/12/2026 - 17:00" },
    { sala: "Sala 2", horario: "01/12/2026 - 14:00" },
];

function SessoesCard({ sala, sessoes, onDelete }) {
    const linhas = sessoes.map((sessao) => (
        <div
            key={sessao.index}
            className="d-flex flex-row justify-content-between"
        >
            <p>{sessao.horario}</p>
            <i
                className="bi bi-trash"
                aria-hidden="true"
                style={{ cursor: "pointer" }}
                onClick={() => onDelete(sessao.index)}
            />
        </div>
    ));

    return (
        <div className="d-flex flex-column m-3 border border-danger border-3 rounded-3 shadow p-3">
            <h4>{sala}</h4>
            {linhas}
        </div>
    );
}
function SessoesCards({ sessoes, onDelete }) {
    const agrupados = Object.groupBy(
        sessoes.map((sessao, index) => ({ ...sessao, index })),
        ({ sala }) => sala
    );

    return Object.entries(agrupados).map(([sala, sessoes]) => (
        <SessoesCard
            key={sala}
            sala={sala}
            sessoes={sessoes}
            onDelete={onDelete}
        />
    ));
}

export default function FilmeSessoesPage() {
    const navigate = useNavigate();
    const { filmeId } = useParams();
    const { filme } = useLocation().state;
    const [ sessoes, setSessoes ] = useState(SESSOES_INICIAIS);

    function onDelete(idx) {
        console.log(idx);
        setSessoes(sessoes.filter((val, index) => index !== idx));
    }

    return (
        <div className="d-flex flex-row">
            <Sidebar />
            <main className="d-flex flex-column flex-grow-1 text-light" style={{ backgroundColor: "#191919"}}>
                <div className="d-flex m-5 justify-content-between align-items-center">
                    <h1 className="text-danger font-poetsen">Sessoes</h1>
                    <button className="btn btn-danger text-uppercase fw-bold rounded-2 h-75">ADICIONAR</button>
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
                            <SessoesCards sessoes={sessoes} onDelete={onDelete} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
