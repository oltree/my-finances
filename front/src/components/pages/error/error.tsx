import { FC, memo } from 'react';

interface ErrorProps {}

export const Error: FC<ErrorProps> = memo(() => {
  return <div>error</div>;
});
