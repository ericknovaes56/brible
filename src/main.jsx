import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from './pages/app';
import Livro from './pages/livro';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/livro",
    element:<Navigate to="/" /> ,
  },
  {
    path: "/livro/:livro",
    element: <Livro/>,
  },
  {
    path: "/livro/:livro/:cap",
    element: <Livro/>,
  },
]);

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
