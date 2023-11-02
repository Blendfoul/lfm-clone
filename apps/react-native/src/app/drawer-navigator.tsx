import { UserScreen, useApplicationState } from '@lfm-clone/containers';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SeasonsNavigator, StackParamList } from './seasons-navigator';

type DrawerParamList = {
  home: StackParamList;
  user?: { userId: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator: React.FC = () => {
  const { state } = useApplicationState();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: state.headerShown,
      }}
    >
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
  );
};
