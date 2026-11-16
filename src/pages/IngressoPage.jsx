import SideBar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router";
import { useState } from "react";
import Table from "../components/Table.jsx";
import AddButton from "../components/AddButton.jsx";


const INGRESSOS_INICIAIS = [
    { codigo: 1, sessao: '1', tipo: 'Inteira', valor: 20.00, status: 'Disponível' },
    { codigo: 2, sessao: '2', tipo: 'Meia', valor: 10.00, status: 'Disponível' },
    { codigo: 3, sessao: '2', tipo: 'Meia', valor: 10.00, status: 'Cancelado' },
    { codigo: 4, sessao: '2', tipo: 'Meia', valor: 10.00, status: 'Disponível' },
{ codigo: 5, sessao: '2', tipo: 'Inteira', valor: 20.00, status: 'Disponível' },
{ codigo: 6, sessao: '2', tipo: 'Meia', valor: 10.00, status: 'Disponível' },
{ codigo: 7, sessao: '2', tipo: 'Inteira', valor: 20.00, status: 'Utilizado' },
    { codigo: 8, sessao: '2', tipo: 'Inteira', valor: 20.00, status: 'Utilizado' },
]
function IngressoPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/ingressos');
    };

    const [ingressos, setIngressos] = useState(INGRESSOS_INICIAIS);

    return (
    <main className="align-items-start text-bg-dark vw-100 vh-100 d-flex">
        <SideBar />
        {/* Área principal */}
        <div className="flex-grow-1 mt-2 px-4 rounded-4">
            {/* Botão alinhado à direita */}
            <div className="d-flex justify-content-end mb-5">
                <AddButton onClick={() => navigate('/ingressos/cadastro')}>
                    Adicionar Ingresso
                </AddButton>
            </div>
            {/* Tabela abaixo do botão */}
            <Table ingressos={ingressos} />
        </div>
    </main>
    )
}

export default IngressoPage;