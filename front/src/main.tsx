import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { router } from './router/router.tsx';

import { ToastContainer } from 'react-toastify';
import './assets/styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position='bottom-right' autoClose={2000} />
  </StrictMode>
);
