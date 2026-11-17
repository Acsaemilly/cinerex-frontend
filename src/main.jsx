import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/LoginPage.jsx'
import FilmePage from './pages/FilmePage.jsx'
import SalaPage from './pages/SalaPage.jsx'
import IngressosPage from './pages/IngressoPage.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';

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
    element: <IngressosPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
