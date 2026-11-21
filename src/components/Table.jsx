const TableHeader = () => {
    return (
        <thead className="table-danger text-center fw-bold">
            <tr>
                <th>TESTE DE ATUALIZAÇÃO</th>
                <th>Informações da sessão</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
    );
};

const TableBody = ({ ingressos, onCancel }) => {
    if (!ingressos || ingressos.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan="6" className="text-center">
                        Nenhum ingresso encontrado
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="text-center">
            {ingressos.map((row, index) => (
                <tr key={row.codigo}>
                    <td>{row.codigo}</td>

                    <td>
                        <strong>{row.filme}</strong>
                        <br />
                        <small>
                            {row.data} às {row.horario}
                        </small>
                        <br />
                        <small>Sala: {row.sala}</small>
                    </td>

                    <td>{row.tipo}</td>
                    <td>R$ {Number(row.valor).toFixed(2)}</td>
                    <td>{row.status}</td>

                    <td>
                    <button
                        className="btn btn-sm"
                        onClick={() => onCancel(row.codigo)}
                        title="Cancelar ingresso"
                        disabled={row.status === "Cancelado"}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

const Table = ({ ingressos, onCancel }) => {
    return (
        <table className="table table-striped table-hover table-sm align-middle">
            <TableHeader />
            <TableBody
                ingressos={ingressos}
                onCancel={onCancel}
            />
        </table>
    );
};

export default Table;