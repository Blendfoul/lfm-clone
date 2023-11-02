import { useEffect, useState } from 'react';

import {
  HomeScreen,
  ProfileScreen,
  SessionDetailScreen,
  useApplicationState,
} from '@lfm-clone/containers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackParamList = {
  'home-root': undefined;
  session: { id: string };
  profile: { id: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

export const SeasonsNavigator = () => {
  const [onRoot, setOnRoot] = useState(true);
  const { state, setState } = useApplicationState();

  useEffect(() => {
    setState({ ...state, headerShown: onRoot });
  }, [onRoot]);

  return (
    <Stack.Navigator
      screenOptions={({ route }) => {
        setOnRoot(route.name === 'home-root');

        return {};
      }}
    >
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
        name="home-root"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: 'Session',
        }}
        name="session"
        component={SessionDetailScreen}
      />
      <Stack.Screen
        options={{
          title: 'Profile',
        }}
        name="profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};
