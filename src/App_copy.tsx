import React from 'react';
import { View, StyleSheet } from 'react-native';
import PetComponent from './components/pet/PetComponent';  // Importamos el componente de la mascota
import UsersProgressComponent from './components/users/UsersProgressComponent';  // Importamos el componente del progreso de usuarios

const App = () => {
  return (
    <View style={styles.container}>
      {/* Componente de la mascota */}
      <PetComponent />

      {/* Componente del progreso de los usuarios */}
      <UsersProgressComponent />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
