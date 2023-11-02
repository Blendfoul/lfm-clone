import { TamaguiProviderProps, UiProvider } from '@lfm-clone/ui'
import { useColorScheme } from 'react-native'

import { config } from '../../tamagui.config';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme();

  return (
    <UiProvider
      config={config}
      disableInjectCSS
      defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      {children}
    </UiProvider>
  );
}
