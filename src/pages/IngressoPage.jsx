
import SideBar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router";
import { useState } from "react";
import Table from "../components/Table.jsx";
import AddButton from "../components/AddButton.jsx";
import SearchBar from "../components/SearchBar.jsx";


const INGRESSOS_INICIAIS = [
    {
        codigo: 1,
        sessao: '1',
        filme: 'Interestelar',
        data: '20/11/2026',
        horario: '19:30',
        sala: 'Sala 02',
        tipo: 'Inteira',
        valor: 20.00,
        status: 'Disponível'
    },
    {
        codigo: 2,
        sessao: '2',
        filme: 'Duna',
        data: '21/11/2026',
        horario: '18:00',
        sala: 'Sala 01',
        tipo: 'Meia',
        valor: 10.00,
        status: 'Disponível'
    },
    {
        codigo: 3,
        sessao: '2',
        filme: 'Duna',
        data: '21/11/2026',
        horario: '18:00',
        sala: 'Sala 01',
        tipo: 'Meia',
        valor: 10.00,
        status: 'Cancelado'
    }
];

function IngressoPage() {
    const [ingressos, setIngressos] = useState(INGRESSOS_INICIAIS);

    // Pesquisa
    const [pesquisa, setPesquisa] = useState("");

    // Filtros
    const [filme, setFilme] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [sala, setSala] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");

    // Filtragem dos ingressos
    const ingressosFiltrados = ingressos.filter((ingresso) => {

    const busca = pesquisa.toLowerCase();

    // Pesquisa principal: código ou filme
    const correspondePesquisa =
        ingresso.codigo.toString().includes(busca) ||
        ingresso.filme.toLowerCase().includes(busca);

    // Filtros adicionais
    const correspondeFilme =
        ingresso.filme.toLowerCase().includes(filme.toLowerCase());

    const dataFormatada = data
        ? data.split("-").reverse().join("/")
        : "";

    const correspondeData =
        !data || ingresso.data === dataFormatada;

    const correspondeHorario =
        !horario || ingresso.horario.includes(horario);

    const correspondeSala =
        ingresso.sala.toLowerCase().includes(sala.toLowerCase());

    const correspondeTipo =
        ingresso.tipo.toLowerCase().includes(tipo.toLowerCase());

    const correspondeStatus =
        ingresso.status.toLowerCase().includes(status.toLowerCase());

    return (
        correspondePesquisa &&
        correspondeFilme &&
        correspondeData &&
        correspondeHorario &&
        correspondeSala &&
        correspondeTipo &&
        correspondeStatus
    );
});

    // Cancelar ingresso
    const onCancel = (codigo) => {
        setIngressos((ingressosAtuais) =>
            ingressosAtuais.map((ingresso) =>
                ingresso.codigo === codigo
                    ? { ...ingresso, status: "Cancelado" }
                    : ingresso
            )
        );
    };

    const onUse = (codigo) => {
        setIngressos((ingressosAtuais) =>
            ingressosAtuais.map((ingresso) =>
                ingresso.codigo === codigo
                    ? { ...ingresso, status: "Utilizado" }
                    : ingresso
            )
        );
    };

    // Limpar filtros
    const limparFiltros = () => {
        setPesquisa("");
        setFilme("");
        setData("");
        setHorario("");
        setSala("");
        setTipo("");
        setStatus("");
    };

    return (
        <div
            className="d-flex min-vh-100"
            style={{ backgroundColor: '#181818' }}
        >
            <SideBar />

            <main className="flex-grow-1 p-4 p-lg-5">

                <div className="d-flex w-100 justify-content-between align-items-center">
                    <h1 className="text-danger font-poetsen">Ingressos</h1>
                </div>

                <div className="container-fluid">
                    <div className="row g-3 mb-4">

                    {/* Filtros */}
                    <div className="col-md-3">
                        <label className="form-label text-white">Filme</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Nome do filme"
                            value={filme}
                            onChange={(e) => setFilme(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label text-white">Data</label>
                        <input
                            type="date"
                            className="form-control bg-dark text-white border-secondary"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label text-white">Horário</label>
                        <input
                            type="time"
                            className="form-control bg-dark text-white border-secondary"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label text-white">Sala</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Nome da sala"
                            value={sala}
                            onChange={(e) => setSala(e.target.value)}
                        />
                    </div>

                    <div className="col-md-1">
                        <label className="form-label text-white">Tipo</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Tipo"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label text-white">Status</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>

                    </div>

                    {/* Limpar filtros e quantidade */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-white-50">
                            {ingressosFiltrados.length} ingresso(s) encontrado(s)
                        </small>

                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={limparFiltros}
                        >
                            Limpar filtros
                        </button>
                    </div>

                    {/* Tabela */}
                    <Table
                        ingressos={ingressosFiltrados}
                        onCancel={onCancel}
                        onUse={onUse}
                    />

                </div>
            </main>
        </div>
    );
}

export default IngressoPage;
