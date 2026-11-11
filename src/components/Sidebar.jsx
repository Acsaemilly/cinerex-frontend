import { useNavigate, useLocation } from 'react-router';
import logo from '../assets/logo.png';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Filmes', path: '/filmes' },
    { label: 'Salas', path: '/salas' },
    { label: 'Sessões', path: '/sessoes' },
    { label: 'Clientes', path: '/clientes' },
    { label: 'Vendas', path: '/vendas' },
    { label: 'Funcionários', path: '/funcionarios' },
    { label: 'Relatórios', path: '/relatorios' },
  ];

  return (
    <aside
      className="d-flex flex-column align-items-center bg-white border-end shadow-sm vh-100 position-sticky top-0"
      style={{ width: '280px', minWidth: '280px' }}
    >
      <div className="py-4 px-3 text-center w-100">
        <img
          src={logo}
          alt="CineRex Logo"
          className="img-fluid"
          style={{ maxWidth: '190px', cursor: 'pointer' }}
          onClick={() => navigate('/filmes')}
        />
      </div>

      <nav className="nav nav-pills flex-column w-100 px-3 gap-2 mt-2">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`btn w-100 py-3 text-center border-0 fw-medium transition-all ${
                isActive
                  ? 'btn-danger text-white shadow-sm'
                  : 'btn-light text-dark'
              }`}
              style={{
                fontSize: '1.05rem',
                borderRadius: '8px',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
