const TableHeader = () => {
    return(
    <thead className="table-danger text-center"> 
        <tr>
            <th> Código </th>
            <th> Sessão </th>
            <th> Tipo </th>
            <th> Valor </th>
            <th> Status </th>  
            <th> Ações </th>
        </tr>
    </thead>
    );
};

const TableBody = ({ ingressos, onDelete}) => {
    if (!ingressos || ingressos.length === 0){
        return(
            <tbody> 
                <tr>
                    <td colSpan="5" className="text-center"> Nenhum ingresso encontrado </td>
                </tr>
            </tbody>
        )
    }
    const rows = ingressos.map((row, index) => {
        return(
            <tr key = {index}>
                <td> {row.codigo} </td>
                <td> {row.sessao} </td>
                <td> {row.tipo} </td>
                <td> {row.valor} </td>
                <td> {row.status} </td>
                <td> <button className = "btn btn-link text-dark"
                        onClick = {() => onDelete(index)} title = "cancelar ingresso"> <i className = "bi bi-trash3-fill"> </i></button>
                        </td>
            </tr>
        )
    }

)
    return <tbody className="text-center"> {rows} </tbody>
}

const Table = ({ ingressos, onDelete}) => {
    return(
        <table className="table table-striped table-hover table-sm align-middle">
            <TableHeader />
            <TableBody ingressos={ingressos} onDelete = {onDelete}/>
        </table>
    )
}

export default Table;