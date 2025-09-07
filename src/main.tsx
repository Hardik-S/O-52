import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'
import App from './App'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import AppDetail from './pages/AppDetail'
import Ritual from './pages/RitualLite'
import Archive from './pages/Archive'
import MapView from './pages/MapView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'apps', element: <Gallery /> },
      { path: 'apps/:slug', element: <AppDetail /> },
      { path: 'ritual', element: <Ritual /> },
      { path: 'archive', element: <Archive /> },
      { path: 'map', element: <MapView /> },
    ]
  }
], {
  basename: import.meta.env.BASE_URL
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
