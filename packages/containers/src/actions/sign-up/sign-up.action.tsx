import React, { useCallback, useMemo } from 'react';

import useSWR from "swr";
import { useRegistration } from "../../hooks/use-regsitration";
import { Race } from "../../types";
import { Button } from '@lfm-clone/ui';
import { useApplicationState } from '../../provider';

type Params = { id: number };

export const SignUp: React.FC<Params> = ({ id }) => {
  const { state, setState } = useApplicationState();
  const { data, isValidating } = useSWR<Race>(`race/${id}`);
  const { closed, timeLeft, validSignUp, signedUp } = useRegistration({
    eventId: data?.event_id,
    isLive: data?.isLive,
    signUpCloses: data?.event.signup_stop,
    signUpStart: data?.event.signup_start,
    id,
  });

  const onRegister = useCallback(() => {
    if (signedUp) {
      setState({
        ...state,
        signOutDialogOpen: true,
      });
      return;
    }

    setState({
      ...state,
      registerDialogOpen: true,
    });
  }, []);

  const buttonText = useMemo(() => {
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
  }, [closed, validSignUp, timeLeft]);

  return (
    <Button 
      width="100%"
      onPress={onRegister}
      disabled={closed || !validSignUp || isValidating}
    >
      {buttonText}
    </Button>
  );
};
