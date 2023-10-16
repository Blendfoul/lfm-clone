import { HomeScreen, SessionDetailScreen } from '@lfm-clone/containers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackParamList = {
  home: undefined;
  session: { id: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

export const SeasonsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: 'Session',
        }}
        name="session"
        component={SessionDetailScreen}
      />
    </Stack.Navigator>
  );
};
