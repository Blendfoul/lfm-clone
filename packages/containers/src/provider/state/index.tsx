import React, { PropsWithChildren, createContext } from "react";

export type ApplicationState = {
  selectedSeries?: number;
  registerDialogOpen: boolean;
  signOutDialogOpen?: boolean;
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
}

const initialState: ApplicationState = {
  selectedSeries: undefined,
  registerDialogOpen: false,
  signOutDialogOpen: false,
  registerInformation: {
    chat: false,
    code_of_conduct: false,
    redletters: false,
  }
};

export const ApplicationStateContext = createContext({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setState: (state: ApplicationState) => {},
});

export const ApplicationStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState<ApplicationState>(initialState);

  const value = React.useMemo(() => ({
    state,
    setState,
  }), [state, setState]);

  return (
    <ApplicationStateContext.Provider value={value}>
      {children}
    </ApplicationStateContext.Provider>
  );
};

export const useApplicationState = () => {
  const context = React.useContext(ApplicationStateContext);

  if (!context) {
    throw new Error('useApplicationState must be used within a ApplicationStateProvider');
  }

  return context;
}
