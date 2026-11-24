
import { useState } from "react";


export default function AdicionarSessaoModal({ onSalvar, onFechar }) {
    const [sala, setSala] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onSalvar({
            id: Date.now(),
            sala: sala,
            data: data.split("-").reverse().join("/"),
            horario: horario
        });

        onFechar();
    }

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            Adicionar sessão
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onFechar}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label">Sala</label>
                                <select
                                    className="form-select"
                                    value={sala}
                                    onChange={e => setSala(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione uma sala</option>
                                    <option value="Sala 1">Sala 1</option>
                                    <option value="Sala 2">Sala 2</option>
                                    <option value="Sala 3">Sala 3</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Data</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={data}
                                    onChange={e => setData(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Horário</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={horario}
                                    onChange={e => setHorario(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onFechar}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-danger"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
