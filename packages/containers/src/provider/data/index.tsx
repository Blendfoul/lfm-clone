import { useMemo, type PropsWithChildren } from 'react';

import { SWRConfig } from 'swr';

type ContainerProviderProps = PropsWithChildren;

export const ContainerProvider: React.FC<ContainerProviderProps> = ({ children }) => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2YzZGM0YTE2MTJmMzc1MjQyMDQ0Mzk1Yzc5NTg0NjJjY2U1MGVhMjFiMjgwMTkwNTZiZGQxNTE0ZWExZTQxMmQzZjFmNDJmZTg5MTFlN2UiLCJpYXQiOjE2NjgwNzMyMzAuNDQ1MDcsIm5iZiI6MTY2ODA3MzIzMC40NDUwNzEsImV4cCI6MTY5OTYwOTIzMC40NDM3OSwic3ViIjoiMTIzNTYiLCJzY29wZXMiOltdfQ.AJckDO1PvLFEt3hW2_DnrCoSVArzu0Xojvaw1_HHo7mxcItb0Q_uDDBTFAIKJbfFl3xTjSfj7CvZXBih4TLxlRR5LjbVWfGkNfBH-VSq8hJMiM1oSLIvmp4MTnOXu05ZaNdVY2U6cQ4ED50LvA1WZ55PNPC7cyCQfZET35QGdzn1r-mSbA4K0-UXCNV1jC14i4jjSiHml5g6-5fCsVgf5rA039B2cjKx73DOq8XPMpONYW7NRtEYReIggvdb318TzEAwruslzjBhP4eCazcpyh8kyOoaakG1174zZIeIsVdJigmCk1KmDbWmEABzOTR9j-vuDwgxkje4l1DmCVuG6760cutGGOxUyCtv6W-4Adz043KlF-dImXJ55taALRAIGx5lns1wNWfpF0k7W-X8uV1QmpkXqKTy3IN8NUP4V0ZTZiRdqh-Ae7VeOeA5KlLuwA8w9-ymNR6r-ZO_1mQx0BnwW5XGf4sSQCconXmMhRnpYMwb3_7hag6F1uygewKC5OqgjwFLcyVxm8Z-pnfbqzVtTUXEXIUvHquDiusxO1HD6xm2pfur5DQfdRUkOtakG3Mil2RC9oMD_BjzW5UhyJZTd2CK7nXuOWSbIhSp7em2GrpVS9ChBoRpGrL74_77iB9Q38Ta2tLO1YjwdDZDzlfQJM_TIrA3jFd7LeBu5oE',
    },
  };

  const cacheProvider = useMemo(() => new Map(), []);

  return (
    <SWRConfig
      value={{
        provider: () => cacheProvider,
        fetcher: (url: string, options: RequestInit) => fetch(`https://api2.lowfuelmotorsport.com/api/${url}`, {
          ...defaultOptions,
          ...options,
        }).then((res) => res.json()),
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};
