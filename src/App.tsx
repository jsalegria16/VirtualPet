import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppNavigator from './navigation/AppNavigator';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';


// import PushNotification from 'react-native-push-notification';  // Si usarás notificaciones
const Tab = createBottomTabNavigator();


const App = () => {


  return (
    // <>
    //   <StatusBar barStyle="dark-content" />
    //   <AppNavigator />  {/* Aquí se llama el AppNavigator para manejar la navegación */}
    // </>
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Tu mascota" component={HomeScreen} options={{ title: 'Esta es Mi cascota saludable' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;
