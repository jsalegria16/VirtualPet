// import React from 'react';
// import { StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Importamos los íconos


// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
// import SettingsScreen from './screens/SettingsScreen';

// import { NfcProvider } from './context/NfcContext'; // Importa el contexto de NFC

// const Tab = createBottomTabNavigator();



// const App = () => {

//   return (
//     <NfcProvider>
//       <NavigationContainer>
//         <Tab.Navigator >
//           <Tab.Screen name="Tu mascota" component={HomeScreen} />
//           <Tab.Screen name="Settings" component={SettingsScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </NfcProvider>


//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
// });

// export default App;

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importamos los íconos
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { NfcProvider, useNfc } from './context/NfcContext'; // Importa el contexto de NFC
import RegisterNameModal from './components/registerName/RegisterNameModal'; // Asegúrate de crear este archivo y ruta
import AsyncStorage from '@react-native-async-storage/async-storage';



const Tab = createBottomTabNavigator();

const AppContent = () => {

  // Todo esto es para enviar el nombre a la DB
  const { userId } = useNfc(); // Obtén el userId desde el contexto
  const [isNameRegistered, setIsNameRegistered] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const isRegistered = await AsyncStorage.getItem('isNameRegistered');
        setIsNameRegistered(isRegistered === 'true'); // Convertir a booleano
      } catch (error) {
        console.error('Error al verificar el estado de registro:', error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    initializeApp();
  }, []);

  if (loading || !userId) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }


  // Esto de aqui es para FCM y el uso de backgroun para las notificaiones del Rol Intercambiable


  return (
    <>
      {!isNameRegistered && (
        <RegisterNameModal
          userId={userId}
          onNameRegistered={() => setIsNameRegistered(true)}
        />
      )}
      {isNameRegistered && (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Tu mascota Virtual" component={HomeScreen}
            // options={
            //   {
            //     tabBarIcon: ({ color, size }) => (
            //       <Ionicons name="archive-outline" color={'blue'} size={20}> </Ionicons>
            //     )
            //   }
            // }
            />
            <Tab.Screen name="Ajustes" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

const App = () => (
  <NfcProvider>
    <AppContent />
  </NfcProvider>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
