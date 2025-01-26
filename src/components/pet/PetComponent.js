import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNfc } from '../../context/NfcContext'; // Importa el contexto

import notifee, { AndroidImportance } from '@notifee/react-native';
import { logNfcInteractionForUser } from '../../utils/LogsFirebase/logNfcInteraction';
// import axios from 'axios';

const PetComponent = () => {

  const { userId, tagInfo, nfcError, petStage, growPet, validateAndGrowPet, updateMedicationStatus, checkAndSetConfirmationTime } = useNfc(); // Obtener los valores del contexto NFC, incluyendo el estado de la mascota

  const petTitle = petStage.includes('_happy')
    ? '¡Tu mascota está feliz!'
    : 'Tu mascota está triste. Ayúdala';


  const handlePress = async () => {
    // Lógica adicional
    console.log('Pet pressed');

    // await checkAndSetConfirmationTime(validateAndGrowPet, updateMedicationStatus); // Pasa la función como argumento
    console.log('Lógica completada.');
  }


  return (
    <View style={styles.petContainer}>
      {/* <Text style={styles.text}>{'Mascota Virtual ' + petStage}</Text> */}
      <Text style={styles.text}>{petTitle}</Text>

      <TouchableOpacity onPress={handlePress}>
        <Image
          source={
            petStage === 'small_happy' ? require('../../assets/img/peque_feliz.png')
              : petStage === 'small_sad' ? require('../../assets/img/peque_triste.png')
                : petStage === 'medium_happy' ? require('../../assets/img/medi_feliz.png')
                  : petStage === 'medium_sad' ? require('../../assets/img/medi_triste.png')
                    : petStage === 'large_happy' ? require('../../assets/img/grande_feliz.png')
                      : require('../../assets/img/grande_triste.png')
          }
          style={styles.petImage}  // Estilos para la imagen
        />
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  petContainer: {
    flex: 40,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    marginBottom: 1,
    marginTop: 1,
    borderRadius: 1,
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: -10,
    textAlign: 'center',

  },
  petImage: {
    width: screenWidth * 0.45,  // Ajusta el ancho al 80% de la pantalla
    height: screenWidth * 0.6,  // Mantiene una proporción 1:1 (cuadrada)
    resizeMode: 'contain',
    marginTop: -30,
    padding: 0,
    alignSelf: 'center',  // Centra la imagen horizontalmente

  },
  tagMessage: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',  // Texto en color verde para indicar la detección de la etiqueta
    textAlign: 'center',  // Centrar el texto
    maxWidth: '90%',      // Limitar el ancho del texto al 90% del contenedor
  },
  errorMessage: {
    marginTop: -20,
    fontSize: 8,
    color: 'red',         // Mostrar el mensaje de error en color rojo
    textAlign: 'center',  // Centrar el texto
    maxWidth: '90%',      // Limitar el ancho del texto al 90% del contenedor
  },

});

export default PetComponent;
