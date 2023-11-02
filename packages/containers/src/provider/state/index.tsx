import React, { PropsWithChildren, Reducer, createContext, useReducer } from 'react';

export type ApplicationState = {
  selectedSeries?: number;
  registerDialogOpen: boolean;
  headerShown: boolean;
  signOutDialogOpen?: boolean;
  raceId?: number;
  registerInformation?: {
    car_model?: number;
    chat?: boolean;
    code_of_conduct?: boolean;
    livery?: number;
    nachname?: string;
    origin?: string;
    redletters?: boolean;
    shortname?: string;
    twitch_channel?: string;
    vorname?: string;
    youtube_channel?: string;
  };
};

const initialState: ApplicationState = {
  selectedSeries: undefined,
  registerDialogOpen: false,
  signOutDialogOpen: false,
  headerShown: true,
  registerInformation: {
    chat: false,
    code_of_conduct: false,
    redletters: false,
  },
};

export const ApplicationStateContext = createContext({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setState: (state: ApplicationState) => {},
});

const applicationReducer: Reducer<ApplicationState, Partial<ApplicationState>> = (
  state,
  action
) => ({
  ...state,
  ...action,
});

export const ApplicationStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useReducer(applicationReducer, initialState);

  const value = React.useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  );

  return (
    <ApplicationStateContext.Provider value={value}>{children}</ApplicationStateContext.Provider>
  );
};

export const useApplicationState = () => {
  const context = React.useContext(ApplicationStateContext);

  if (!context) {
    throw new Error('useApplicationState must be used within a ApplicationStateProvider');
  }

  return context;
};
