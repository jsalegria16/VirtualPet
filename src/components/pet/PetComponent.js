import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';


import { useNfc } from '../../context/NfcContext'; // Importa el contexto


const PetComponent = () => {

  const { tagInfo, nfcError, petStage, growPet, validateAndGrowPet, updateMedicationStatus, checkAndSetConfirmationTime } = useNfc(); // Obtener los valores del contexto NFC, incluyendo el estado de la mascota

  const handlePress = async () => {
    // Lógica adicional
    console.log('Pet pressed');
    await checkAndSetConfirmationTime(updateMedicationStatus); // Pasa la función como argumento
    console.log('Lógica completada.');

    try {
      // Lógica adicional
      console.log('Pet pressed');
      await checkAndSetConfirmationTime(updateMedicationStatus); // Pasa la función como argumento
      // Valida si todos los usuarios completaron sus medicamentos
      await validateAndGrowPet(growPet);

    } catch (error) {
      console.error('Error en la lógica de handlePress:', error);
    }

  };


  return (
    <View style={styles.petContainer}>
      <Text style={styles.text}>Mascota Virtual</Text>

      {/* Siempre muestra la imagen de la mascota */}
      {/* <Image
        source={
          petStage === 'small' ? 
            require('../../assets/img/mascota_peque.jpeg')  // Imagen de la mascota pequeña
          : petStage === 'medium' ? 
            require('../../assets/img/mascota_medi.jpeg') // Imagen de la mascota mediana
          : 
            require('../../assets/img/mascota.jpeg')  // Imagen de la mascota grande
        }
        style={styles.petImage}  // Estilos para la imagen
      /> */}

      <TouchableOpacity onPress={handlePress}>
        <Image
          source={
            petStage === 'small' ?
              require('../../assets/img/mascota_peque.jpeg')  // Imagen de la mascota pequeña
              : petStage === 'medium' ?
                require('../../assets/img/mascota_medi.jpeg') // Imagen de la mascota mediana
                :
                require('../../assets/img/mascota.jpeg')  // Imagen de la mascota grande
          }
          style={styles.petImage}  // Estilos para la imagen
        />
      </TouchableOpacity>

      {/* Si se ha detectado una etiqueta NFC, muestra un mensaje */}
      {tagInfo && (
        <Text style={styles.tagMessage}>
          Etiqueta NFC detectada: ID {tagInfo.id}
        </Text>
      )}

      {/* Mostrar mensaje de error si NFC falla */}
      {nfcError && (
        <Text style={styles.errorMessage}>
          {nfcError}
        </Text>
      )}


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
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: -20,

  },
  petImage: {
    width: screenWidth * 0.9,  // Ajusta el ancho al 80% de la pantalla
    height: screenWidth * 0.8,  // Mantiene una proporción 1:1 (cuadrada)
    resizeMode: 'contain',
  },
  tagMessage: {
    marginTop: -20,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',  // Texto en color verde para indicar la detección de la etiqueta
    textAlign: 'center',  // Centrar el texto
    maxWidth: '90%',      // Limitar el ancho del texto al 90% del contenedor
  },
  errorMessage: {
    marginTop: -20,
    fontSize: 14,
    color: 'red',         // Mostrar el mensaje de error en color rojo
    textAlign: 'center',  // Centrar el texto
    maxWidth: '90%',      // Limitar el ancho del texto al 90% del contenedor
  },

});

export default PetComponent;
