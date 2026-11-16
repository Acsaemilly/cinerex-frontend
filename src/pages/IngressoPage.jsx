import SideBar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router";

function IngressoPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/ingressos');
    };

    return (
        <div className="align-items-center text-bg-dark vw-100 vh-100 d-flex">
            <SideBar/>
        </div>
    )
}

export default IngressoPage;