
import SideBar from "../components/Sidebar.jsx";
import { useState } from "react";
import Table from "../components/TableFuncionario.jsx";
import FuncionarioModal from "../components/FuncionarioModal.jsx";

const FUNCIONARIOS_INICIAIS = [
    { id: 1, email: 'joao@example.com', senha: '123456', cargo: 'ADMINISTRADOR' },
    { id: 2, email: 'maria@example.com', senha: '123456', cargo: 'USUARIO' },
];

function FuncionarioPage() {
    const [funcionarios, setFuncionarios] = useState(FUNCIONARIOS_INICIAIS);
    const [showModal, setShowModal] = useState(false);
    const [funcionarioToEdit, setFuncionarioToEdit] = useState(null);

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

    // Funções 
    // Abrir para criar
    const handleAdd = () => {
        setFuncionarioToEdit(null);
        setShowModal(true);
    };

    // Abrir para editar (chamada pela tabela)
    const handleEdit = (funcionario) => {
        setFuncionarioToEdit(funcionario);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setFuncionarioToEdit(null);
    };

    // Salvar (cria ou atualiza)
    const handleSave = (dados) => {
        setFuncionarios((prev) => {
            const existe = prev.some((f) => f.id === dados.id);

            if (existe) {
                // Atualiza: se a senha não veio, mantém a atual
                return prev.map((f) =>
                    f.id === dados.id ? { ...f, ...dados } : f
                );
            }

            // Cria
            return [...prev, dados];
        });

        handleClose();
    };

    const handleDelete = (id) => {
        if (window.confirm('Deseja realmente excluir este funcionário?')) {
            setFuncionarios((prev) => prev.filter((f) => f.id !== id));
        }
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

                    <button className="btn btn-danger fw-bold" onClick={handleAdd}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Adicionar
                    </button>
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
                           <select
                            className="form-select bg-dark text-white border-secondary"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            >
                            <option value="">Todos</option>
                            <option value="ADMINISTRADOR">Administrador</option>
                            <option value="USUARIO">Usuário</option>
                            </select>
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
                    <Table
                        usuarios={funcionariosFiltrados}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </div>
            </main>
                <FuncionarioModal
                    show={showModal}
                    onClose={handleClose}
                    onSave={handleSave}
                    funcionarioToEdit={funcionarioToEdit}
                />
        </div>
    );
}

export default FuncionarioPage;