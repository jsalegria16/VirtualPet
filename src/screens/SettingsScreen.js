import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const SettingsScreen = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  petContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'red',
  },
  // petImage: {
  //   flex:1,
  //   width: '100%',   // Ajusta el ancho de la imagen
  //   height: undefined,  // Ajusta la altura de la imagen
  //   resizeMode: 'contain',  // Asegura que la imagen no se distorsione
  // },
  petImage: {
    width: screenWidth * 0.8,  // Ajusta el ancho al 80% de la pantalla
    height: screenWidth * 0.8,  // Mantiene una proporción 1:1 (cuadrada)
    resizeMode: 'contain',
  },
});

export default SettingsScreen;
