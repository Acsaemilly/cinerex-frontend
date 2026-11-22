import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/LoginPage.jsx'
import FilmePage from './pages/FilmePage.jsx'
import SalaPage from './pages/SalaPage.jsx'
import IngressoPage from './pages/IngressoPage.jsx'
import FuncionarioPage from './pages/FuncionarioPage.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css'
import SessoesPage from './pages/SessoesPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage /> 
  },
  {
    path: "/filmes",
    element: <FilmePage/>
  },
  {
    path: "/salas",
    element: <SalaPage/>
  },
  {
    path: "/ingressos",
    element: <IngressoPage/>
  },
  {
    path: "/sessoes",
    element: <SessoesPage />
  },
  {
    path: "/funcionarios",
    element: <FuncionarioPage />
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
