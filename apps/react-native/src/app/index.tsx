import { useMemo } from 'react';

import { ApplicationStateProvider, ContainerProvider, Provider } from '@lfm-clone/containers';
import { DialogProvider } from '@lfm-clone/containers';
import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';

import { DrawerNavigator } from './drawer-navigator';
import { StackParamList } from './seasons-navigator';

export default function Screen() {
  const scheme = useColorScheme();

  const linking: LinkingOptions<StackParamList> = useMemo(
    () => ({
      prefixes: [],
      config: {
        initialRouteName: 'home-root',
        screens: {
          'home-root': '/',
          session: '/session/:id',
          user: '/user',
          profile: '/user/:id',
        },
      },
    }),
    []
  );

  return (
    <ContainerProvider>
      <ApplicationStateProvider>
        <Provider>
          <NavigationContainer linking={linking}>
            <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
              <DialogProvider>
                <DrawerNavigator />
              </DialogProvider>
            </ThemeProvider>
          </NavigationContainer>
        </Provider>
      </ApplicationStateProvider>
    </ContainerProvider>
  );
}
