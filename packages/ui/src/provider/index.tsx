import { TamaguiProvider, TamaguiProviderProps } from "tamagui";

import { config } from "../tamagui.config";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<TamaguiProviderProps>;

export const UiProvider: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <TamaguiProvider disableInjectCSS {...rest} config={config}>
      {children}
    </TamaguiProvider>
  );
}
