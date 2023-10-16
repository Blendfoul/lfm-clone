import { useMemo } from 'react';

import {
  ApplicationStateProvider,
  ContainerProvider,
  Provider,
  UserScreen,
} from '@lfm-clone/containers';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';

import { StackParamList, SeasonsNavigator } from './seasons-navigator';

type DrawerParamList = {
  home: StackParamList;
  user?: { userId: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function Screen() {
  const scheme = useColorScheme();

  const linking: LinkingOptions<StackParamList> = useMemo(
    () => ({
      prefixes: [],
      config: {
        initialRouteName: 'home',
        screens: {
          home: '/',
          session: '/session/:id',
          user: '/user',
          profile: '/user/:userId',
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
              <Drawer.Navigator>
                <Drawer.Screen
                  name="home"
                  component={SeasonsNavigator}
                  options={{
                    title: 'Home',
                  }}
                />
                <Drawer.Screen
                  name="user"
                  component={UserScreen}
                  options={{
                    title: 'User',
                  }}
                />
              </Drawer.Navigator>
            </ThemeProvider>
          </NavigationContainer>
        </Provider>
      </ApplicationStateProvider>
    </ContainerProvider>
  );
}
