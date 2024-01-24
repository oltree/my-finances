import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Auth } from '../components/pages/auth';
import { Categories } from '../components/pages/categories';
import { Error } from '../components/pages/error';
import { Home } from '../components/pages/home';
import { Transactions } from '../components/pages/transactions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/transactions',
        element: <Transactions />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
    ],
  },
]);
