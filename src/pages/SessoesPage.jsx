import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";

import posterDevoradores from "../assets/posters/devoradores.png";
import posterObsessao from "../assets/posters/obsessao.jpg";
import posterFnaf2 from "../assets/posters/fnaf2.jpg";
import posterHomemAranha from "../assets/posters/homem_aranha.jpg";
import posterExterminio from "../assets/posters/exterminio.jpg";

export const FILMES_INICIAIS = [
    {
        id: 1,
        nome: "Devoradores de Estrelas",
        descricao: "Uma missão espacial para salvar a humanidade descobre segredos estelares.",
        duracao: 140,
        distribuicao: "Universal Pictures",
        genero: "Ficção Científica",
        classificacao: "DOZE",
        foto: posterDevoradores,
    },
    {
        id: 2,
        nome: "Obsessão",
        descricao: "Um suspense psicológico perturbador que desafia a sanidade.",
        duracao: 110,
        distribuicao: "A24",
        genero: "Suspense",
        classificacao: "DEZESSEIS",
        foto: posterObsessao,
    },
    {
        id: 3,
        nome: "Cinco Noites no Freddy 2",
        descricao: "O pesadelo na pizzaria mais assombrada do mundo continua.",
        duracao: 115,
        distribuicao: "Blumhouse",
        genero: "Terror",
        classificacao: "CATORZE",
        foto: posterFnaf2,
    },
    {
        id: 4,
        nome: "Homem Aranha: Um novo dia",
        descricao: "Peter Parker enfrenta novos desafios e vilões que ameaçam a cidade.",
        duracao: 135,
        distribuicao: "Sony / Marvel",
        genero: "Ação",
        classificacao: "DEZ",
        foto: posterHomemAranha,
    },
    {
        id: 5,
        nome: "Extermínio: A evolução",
        descricao: "A luta pela sobrevivência após o colapso global da humanidade.",
        duracao: 125,
        distribuicao: "Warner Bros",
        genero: "Ação",
        classificacao: "DEZOITO",
        foto: posterExterminio,
    },
];

function FilmeSessaoCard({ filme }) {
    const navigate = useNavigate();

    return (
        <div
            className="card bg-light text-black border-0 rounded-3 p-3 h-100"
            role="button"
            onClick={() => navigate(`/filmes/${filme.id}/sessoes`, { state: { filme: filme }})}
            style={{ cursor: "pointer" }}
        >
            <img
                className="card-img-top"
                src={filme.foto}
                alt={`Pôster de ${filme.nome}`}
            />

            <div className="card-body px-0 pb-0">
                <h5 className="card-title">{filme.nome}</h5>
                <p className="card-text text-secondary">
                    {filme.genero} • {filme.duracao} min
                </p>
            </div>
        </div>
    );
}

function FilmeSessoesCards({ filmes }) {
    return filmes.map((filme) => (
        <FilmeSessaoCard key={filme.id} filme={filme} />
    ));
}

export default function SessoesPage() {
    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: "#181818" }}>
            <div className="flex-shrink-0">
                <Sidebar />
            </div>

            <main className="flex-grow-1 p-4 p-lg-5" style={{ minWidth: 0 }}>
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <h1 className="text-danger font-poetsen">Sessões</h1>
                </div>

                <div
                    className="d-grid gap-4 mt-5"
                    style={{
                        gridTemplateColumns: "repeat(auto-fill, minmax(20%, 1fr))",
                    }}
                >
                    <FilmeSessoesCards filmes={FILMES_INICIAIS} />
                </div>
            </main>
        </div>
    );
}