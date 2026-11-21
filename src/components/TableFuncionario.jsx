const TableHeader = () => {
    return (
        <thead className="table-danger text-center fw-bold">
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Ações</th>
            </tr>
        </thead>
    );
};

const TableBody = ({ usuarios, onEdit, onDelete }) => {
    if (!usuarios || usuarios.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center">
                        Nenhum funcionário encontrado
                    </td>
                </tr>
            </tbody>
        );
    }

    const rows = usuarios.map((row) => {
        return (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.email}</td>
                <td>{row.cargo}</td>

                <td className="text-center">
                    {/* Editar */}
                    <button
                        className="btn btn-sm me-2"
                        onClick={() => onEdit(row)}
                        title="Editar funcionário"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>

                    {/* Excluir */}
                    <button
                        className="btn btn-sm"
                        onClick={() => onDelete(row.id)}
                        title="Excluir funcionário"
                    >
                        <i className="bi bi-trash3-fill"></i>
                    </button>
                </td>
            </tr>
        );
    });

    return <tbody className="text-center">{rows}</tbody>;
};

const Table = ({ usuarios, onEdit, onDelete }) => {
    return (
        <table className="table table-striped table-hover table-sm align-middle">
            <TableHeader />
            <TableBody
                usuarios={usuarios}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </table>
    );
};

export default Table;