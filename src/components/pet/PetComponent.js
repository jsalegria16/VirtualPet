import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNfc } from '../../context/NfcContext'; // Importa el contexto

import notifee, { AndroidImportance } from '@notifee/react-native';


const PetComponent = () => {

  const { tagInfo, nfcError, petStage, growPet, validateAndGrowPet, updateMedicationStatus, checkAndSetConfirmationTime } = useNfc(); // Obtener los valores del contexto NFC, incluyendo el estado de la mascota

  const handlePress = async () => {
    // Lógica adicional
    console.log('Pet pressed');
    await checkAndSetConfirmationTime(validateAndGrowPet, updateMedicationStatus); // Pasa la función como argumento
    // await validateAndGrowPet(growPet); // cada vez que interatuo(touch/NFC) >> Mejor cada vez que interactuo correctamente?
    console.log('Lógica completada.');

    // Publicar una notificación con el canal configurado
    // console.log('Notificación enviada.');
    // // Create a channel (required for Android)
    // const channelId = await notifee.createChannel({
    //   id: 'default_id',
    //   name: 'Default Channel',
    // });

    // Display a notification
    // await notifee.displayNotification({
    //   id: '123', //PAra actualizarla despues posiblemente
    //   title: 'HAs tocado la mascota',
    //   body: 'Estas interactualdo con la mascota ',
    //   android: {
    //     channelId,
    //     // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    //     // pressAction is needed if you want the notification to open the app when pressed
    //     pressAction: {
    //       id: 'default',
    //     },
    //   },
    // });

    // Create a time-based trigger

    // const date = new Date(Date.now());
    // date.setHours(14);
    // date.setMinutes(11);

    // const trigger = {
    //   type: TriggerType.TIMESTAMP,
    //   timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    // };

    // // Trigger cada 2 mins
    // const trigger = {
    //   type: TriggerType.INTERVAL,
    //   interval: 15,
    //   timeUnit: TimeUnit.MINUTES
    // };

    // Create a trigger notification
    // await notifee.createTriggerNotification(
    //   {
    //     title: 'Meeting with Jane',
    //     body: 'Esto se repite cada minuto.',
    //     android: {
    //       channelId: 'default_id',
    //     },

    //   },
    //   trigger,
    // );

    try {
      // Crear el canal de notificación (Android)
      const channelId_Prueba1 = await notifee.createChannel({
        id: 'id_my_channel1',
        name: 'Prueba de sonido',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'custom_sound',
      });

      const channelId_Prueba2 = await notifee.createChannel({
        id: 'id_my_channel2',
        name: 'Prueba de sonido2',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'pills',
      });

      const channelId_Prueba3 = await notifee.createChannel({
        id: 'id_my_channel3',
        name: 'Prueba de sonido3',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
        sound: 'custom_sound',
      });

      // Mostrar la notificación
      await notifee.displayNotification({
        title: 'Esto es probando',
        body: 'holaaa.',
        android: {
          channelId: channelId_Prueba2 // Sena >> Aqui funciona
          // channelId: 'id_my_channel3', // Suena >> Aqui funciona
        },
      });

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <View style={styles.petContainer}>
      <Text style={styles.text}>Mascota Virtual</Text>

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
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  petContainer: {
    flex: 45,
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
    color: 'red',
    marginBottom: -50,
    textAlign: 'center',

  },
  petImage: {
    width: screenWidth * 0.9,  // Ajusta el ancho al 80% de la pantalla
    height: screenWidth * 0.8,  // Mantiene una proporción 1:1 (cuadrada)
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
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
