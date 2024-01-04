import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Index from '../../views/Index/Index';
import Mine from '../../views/Mine/Mine';
import Classify from '../../views/Classify/Classify';

import {Icon} from '@rneui/themed';

export type BottomTabParamList = {
  Index: undefined;
  Mine: undefined;
  Classify: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Index') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Classify') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Index"
        component={Index}
        options={{
          headerShown: false,
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <Icon name="delete" color={'#e00000'} size={30} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Classify"
        component={Classify}
        options={{
          tabBarLabel: '分类',
          tabBarIcon: ({color, size}) => (
            <Icon name="delete" color={'#e00000'} size={30} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <Icon name="delete" color={'#e00000'} size={30} />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
