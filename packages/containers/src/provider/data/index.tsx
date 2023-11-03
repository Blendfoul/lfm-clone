import { useMemo, type PropsWithChildren } from 'react';

import { SWRConfig } from 'swr';

type ContainerProviderProps = PropsWithChildren;

export const ContainerProvider: React.FC<ContainerProviderProps> = ({ children }) => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: '<INSERT TOKEN HERE>',
    },
  };

  const fetcher = (url: string, options: RequestInit) => {
    if (url.includes('undefined')) throw new Error('Undefined in url, check your fetcher function');

    return fetch(`https://api2.lowfuelmotorsport.com/api/${url}`, {
      ...defaultOptions,
      ...options,
    }).then((res) => res.json());
  };

  const cacheProvider = useMemo(() => new Map(), []);

  return (
    <SWRConfig
      value={{
        provider: () => cacheProvider,
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};
