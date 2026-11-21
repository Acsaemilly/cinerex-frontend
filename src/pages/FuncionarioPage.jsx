
import SideBar from "../components/Sidebar.jsx";
import { useState } from "react";
import Table from "../components/TableFuncionario.jsx";

const FUNCIONARIOS_INICIAIS = [
    { id: 1, email: 'joao@example.com', senha: '123456', cargo: 'ADMINISTRADOR' },
    { id: 2, email: 'maria@example.com', senha: '123456', cargo: 'USUARIO' },
];

function FuncionarioPage() {
    const [funcionarios, setFuncionarios] = useState(FUNCIONARIOS_INICIAIS);

    // Filtros
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");

    // Filtragem dos funcionários
    const funcionariosFiltrados = funcionarios.filter((funcionario) => {

        const correspondeId =
            funcionario.id.toString().includes(id);

        const correspondeEmail =
            funcionario.email.toLowerCase().includes(email.toLowerCase());

        const correspondeCargo =
            funcionario.cargo.toLowerCase().includes(cargo.toLowerCase());

        return (
            correspondeId &&
            correspondeEmail &&
            correspondeCargo
        );
    });

    // Limpar filtros
    const limparFiltros = () => {
        setId("");
        setEmail("");
        setCargo("");
    };

    return (
        <div
            className="d-flex min-vh-100"
            style={{ backgroundColor: '#181818' }}
        >
            <SideBar />

            <main className="flex-grow-1 p-4 p-lg-5">

                <div className="d-flex w-100 justify-content-between align-items-center">
                    <h1 className="text-danger font-poetsen">Funcionários</h1>
                </div>

                <div className="container-fluid">

                    {/* Filtros */}
                    <div className="row g-3 mb-4">

                        <div className="col-md-2">
                            <label className="form-label text-white">
                                ID
                            </label>

                            <input
                                type="text"
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="ID do funcionário"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-white">
                                Email
                            </label>

                            <input
                                type="text"
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="Email do funcionário"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label text-white">
                                Cargo
                            </label>

                            <input
                                type="text"
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="Cargo do funcionário"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* Limpar filtros e quantidade */}
                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <small className="text-white-50">
                            {funcionariosFiltrados.length} funcionário(s) encontrado(s)
                        </small>

                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={limparFiltros}
                        >
                            Limpar filtros
                        </button>

                    </div>

                    {/* Tabela */}
                    <Table usuarios={funcionariosFiltrados} />

                </div>
            </main>
        </div>
    );
}

export default FuncionarioPage;