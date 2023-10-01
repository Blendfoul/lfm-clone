import React, { PropsWithChildren, createContext } from "react";

type ApplicationState = {
  selectedSeries?: number;
}

const initialState: ApplicationState = {
  selectedSeries: undefined,
};

export const ApplicationStateContext = createContext({
  state: initialState,
  setState: (state: ApplicationState) => {},
});

export const ApplicationStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState<ApplicationState>(initialState);

  const value = React.useMemo(() => ({
    state,
    setState,
  }), [state]);

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
