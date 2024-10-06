import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

import { NfcProvider } from './context/NfcContext'; // Importa el contexto de NFC

const Tab = createBottomTabNavigator();



const App = () => {

  return (
    <NfcProvider>
      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen name="Tu mascota" component={HomeScreen} options={{ title: 'Esta es Mi cascota saludable' }} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NfcProvider>


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
