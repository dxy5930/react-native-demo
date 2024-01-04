import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Index from '../views/Index/Index';
import Mine from '../views/Mine/Mine';
import Classify from '../views/Classify/Classify';
import Detail from '../views/Detail/Detail';
import BottomTabs from '../components/BottomTabs/BottomTabs';

type RootStackParamList = {
  BottomTabs: undefined; // 这里改一下
  Detail: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
