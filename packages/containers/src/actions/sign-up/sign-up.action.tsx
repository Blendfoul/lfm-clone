import React, { useCallback, useMemo } from 'react';

import { Button } from '@lfm-clone/ui';
import useSWR from 'swr';

import { useRegistration } from '../../hooks/use-regsitration';
import { useApplicationState } from '../../provider';
import { Race } from '../../types';

type Params = { id: number };

export const SignUp: React.FC<Params> = ({ id }) => {
  const { state, setState } = useApplicationState();
  const { data, isValidating } = useSWR<Race>(`race/${id}`);
  const { closed, timeLeft, validSignUp, signedUp } = useRegistration({
    eventId: data?.event_id,
    isLive: data?.isLive,
    id,
  });

  const onRegister = useCallback(() => {
    if (signedUp) {
      setState({
        ...state,
        raceId: id,
        signOutDialogOpen: true,
      });

      return;
    }

    setState({
      ...state,
      raceId: id,
      registerDialogOpen: true,
    });
  }, [id, signedUp]);

  const buttonText = useMemo(() => {
    if (isValidating) {
      return 'Loading...';
    }

    if (signedUp) {
      return 'Sign Out';
    }

    if (closed) {
      return 'Closed';
    }

    if (!validSignUp) {
      return 'Not valid';
    }

    return `Register - ${timeLeft}`;
  }, [closed, validSignUp, timeLeft, isValidating, signedUp]);

  return (
    <Button width="100%" onPress={onRegister} disabled={closed || !validSignUp || isValidating}>
      {buttonText}
    </Button>
  );
};
