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
    const [ingressos, setIngressos] = useState(INGRESSOS_INICIAIS);

    const onDelete = (indexParaRemover) => {
        setIngressos((ingressosAtuais) =>
            ingressosAtuais.filter((_, index) =>
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
                    <h1 className="text-danger font-poetsen">Ingressos</h1>
                </div>
                <div className="container-fluid">
                    <Table
                        ingressos={ingressos}
                        onDelete={onDelete}
                    />
                </div>
            </main>
        </div>
    );
}

export default IngressoPage;