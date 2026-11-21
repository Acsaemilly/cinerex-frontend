
const TableHeader = () => {
    return (
        <thead className="table-danger text-center fw-bold">
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Cargo</th>
            </tr>
        </thead>
    );
};

const TableBody = ({ usuarios }) => {
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
            </tr>
        );
    });

    return <tbody className="text-center">{rows}</tbody>;
};

const Table = ({ usuarios }) => {
    return (
        <table className="table table-striped table-hover table-sm align-middle">
            <TableHeader />
            <TableBody usuarios={usuarios} />
        </table>
    );
};

export default Table;
