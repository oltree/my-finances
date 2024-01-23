import { FC, PropsWithChildren, memo } from 'react';

interface LayoutProps extends PropsWithChildren {}

export const Layout: FC<LayoutProps> = memo(({ children }) => {
  return <div>{children}</div>;
});
