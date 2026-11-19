import SideBar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router";
import { useState } from "react";
import Table from "../components/TableFuncionario.jsx";


const FUNCIONARIOS_INICIAIS = [
    { id: 1, email: 'joao@example.com', senha: '123456', cargo: 'ADMINISTRADOR' },
    { id: 2, email: 'maria@example.com', senha: '123456', cargo: 'USUARIO' },
]

function FuncionarioPage() {
    const [funcionarios, setFuncionarios] = useState(FUNCIONARIOS_INICIAIS);

    const onDelete = (indexParaRemover) => {
        setFuncionarios((funcionariosAtuais) =>
            funcionariosAtuais.filter((_, index) =>
                index !== indexParaRemover
            )
        );
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
                    <Table
                        usuarios={funcionarios}
                        onDelete={onDelete}
                    />
                </div>
            </main>
        </div>
    );
}

export default FuncionarioPage;