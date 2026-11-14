import logo from '../assets/logo.png'
import {useNavigate} from 'react-router'

function Sidebar() {
    const navigate = useNavigate();

    return(
        <div className="sidebar align-items-center text-bg-light vh-100 d-flex flex-column"
            style={{ width: "20vw" }}>

            <img src={logo}
             alt="Logo sidebar"
             className="mt-5"
             style={{ width: "200px", height: "auto" }}/>
            
            <button type="button" 
            className = "btn btn-light w-100 mt-4"
            style={{ height: 60 }}
            onClick={() => navigate('/filmes')}
            > Filmes </button>

            <button type="button" 
            className = "btn btn-light w-100 mt-4"
            style={{ height: 60 }}
            onClick={() => navigate('/salas')}
            > Salas </button>

            <button type="button" 
            className = "btn btn-light w-100 mt-4"
            style={{ height: 60 }}
            onClick={() => navigate('/sessoes')}
            > Sessoes </button>

            <button type="button" 
            className = "btn btn-light w-100 mt-4"
            style={{ height: 60 }}
            onClick={() => navigate('/ingressos')}
            > Ingressos </button>

             <button type="button" 
            className = "btn btn-danger w-50 mt-5"
            style={{ height: 60 }}
            onClick={() => navigate('/ingressos')}
            > Ingressos </button>
        </div>
    )
}

export default Sidebar;