import { PropsWithChildren } from 'react';

import { RegisterDialog } from '../../containers';
import { useApplicationState } from '../state';

export const DialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { state } = useApplicationState();

  return (
    <>
      {children}
      <RegisterDialog isOpen={state.registerDialogOpen} />
    </>
  );
};
