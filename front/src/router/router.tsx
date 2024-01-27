import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Auth } from '../components/pages/auth';
import { Categories } from '../components/pages/categories';
import { Error } from '../components/pages/error';
import { Home } from '../components/pages/home';
import { Transactions } from '../components/pages/transactions';
import { PrivateRoute } from './privateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: '/transactions',
        element: (
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        ),
      },
      {
        path: '/categories',
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
      },
      {
        path: '/auth',
        element: <Auth />,
      },
    ],
  },
]);
