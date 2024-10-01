import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PetComponent = () => {
  return (
    <View style={styles.petContainer}>
      <Text style={styles.text}>Mascota Virtual</Text>
      {/* Aquí puedes agregar la imagen de la mascota */}
      <Image 
        source={require('../../assets/img/mascota.jpeg')}  // Ruta de la imagen
        style={styles.petImage}  // Estilos para la imagen
      />
    </View>
  );
};

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
  petImage: {
    flex:1,
    width: '100%',   // Ajusta el ancho de la imagen
    height: undefined,  // Ajusta la altura de la imagen
    resizeMode: 'contain',  // Asegura que la imagen no se distorsione
  },
});

export default PetComponent;
