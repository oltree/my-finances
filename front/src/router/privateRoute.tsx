import { FC, PropsWithChildren, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Routes } from '../shared/types/routes';

export const PrivateRoute: FC<PropsWithChildren> = memo(({ children }) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to={Routes.AUTH} replace />;
  }

  return children ? children : <Outlet />;
});
