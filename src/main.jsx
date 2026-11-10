import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/LoginPage.jsx'
import FilmePage from './pages/FilmePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage /> 
  },
  {
    path: "/home",
    element: <h1>Essa e a home vioiu</h1>
  },
  {
    path: "/filmes",
    element: <FilmePage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
