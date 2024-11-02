import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importamos los íconos


import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';



const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen
          name="Tu mascota"
          component={HomeScreen}
          options={{
            title: 'Esta es Mi cascota saludable',
            tabBarIcon: ({ color, size }) => (
              <Icon name="dog" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;