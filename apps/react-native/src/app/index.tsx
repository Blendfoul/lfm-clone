import { ApplicationStateProvider, ContainerProvider, HomeScreen, Provider, SessionDetailScreen } from '@lfm-clone/containers';
import { DarkTheme, DefaultTheme, LinkingOptions, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

type StackParamList = {
  home: undefined;
  session: { id: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function Screen() {
  const scheme = useColorScheme();

  const linking: LinkingOptions<StackParamList> = useMemo(() => ({
    prefixes: [

    ],
    config: {
      initialRouteName: 'home',
      screens: {
        home: '/',
        session: '/session/:id',
      },
    },
  }), []);

  return (
    <ContainerProvider>
      <ApplicationStateProvider>
        <Provider>
          <NavigationContainer linking={linking}>
            <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack.Navigator>
                <Stack.Screen
                  options={{
                    title: 'Home',
                  }}
                  name='home'
                  component={HomeScreen}
                />
                <Stack.Screen
                  options={{
                    title: 'Session',
                  }}
                  name='session'
                  component={SessionDetailScreen}
                />
              </Stack.Navigator>
            </ThemeProvider>
          </NavigationContainer>
        </Provider>
      </ApplicationStateProvider>
    </ContainerProvider>
  );
}
