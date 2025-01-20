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
    : 'Tu mascota está triste. Ayúdala.';

  // const sendMessageToDevice = async (receiverToken, message) => {
  //   try {
  //     const response = await axios.post(
  //       'https://<tu-proyecto>.cloudfunctions.net/sendMessage',
  //       { receiverToken, message }
  //     );
  //     console.log('Mensaje enviado:', response.data);
  //   } catch (error) {
  //     console.error('Error enviando mensaje:', error);
  //   }
  // };

  const sendMessageToDevice = async (receiverToken, message) => {
    try {
      const response = await fetch('https://us-central1-virtualpet-2024.cloudfunctions.net/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverToken,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log('Respuesta:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const sendMessageToDevices = async (receiverToken, message) => {
    try {
      const response = await fetch('https://us-central1-virtualpet-2024.cloudfunctions.net/sendMessagePetHasGrownth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverToken,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log('Respuesta:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const handlePress = async () => {
    // Lógica adicional
    console.log('Pet pressed');

    await checkAndSetConfirmationTime(validateAndGrowPet, updateMedicationStatus); // Pasa la función como argumento
    console.log('Lógica completada.');
    await logNfcInteractionForUser(userId, 'Interaccion NFC, confirmacion de la medicacion')

    //Vamos a probar una nueva forma.
    // await sendMessageToDevice('cj1uo-uJQvauBSs2PISXl9:APA91bF3-gWvA5MqZqqHSMK4reTmVZDbzktptmDU3w513CbPPi9mC1-MK-rUEJRvHqUF6s7kCBGT1g8tORt1h_wfL3AyDMNNduEv7H6NKUSRJf1qhwoslqI', 'funciona jejeje')

    // await sendMessageToDevices(
    //   ["cj1uo-uJQvauBSs2PISXl9:APA91bF3-gWvA5MqZqqHSMK4reTmVZDbzktptmDU3w513CbPPi9mC1-MK-rUEJRvHqUF6s7kCBGT1g8tORt1h_wfL3AyDMNNduEv7H6NKUSRJf1qhwoslqI",
    //     "c8DlG--kRt-f13XHUEOSjM:APA91bEdJ32zwrEqzAM0d1oLEXIehZhn1jNMqjV7LrMKFbBDriVYMrBzQo2rBj8_xoSxnldH9KNazdv3AV9iRBtIJapvirXfDWurlOhwapx-EA8Gd7weKAE",
    //     "f6YMsvCMQR-8TIjV4bTLOn:APA91bGOHqPf0LuRZsWVFj3p3C1wBzGQYUZPcB_sVIVVpMeI_fY4Wz40EHCbaF0aim6zQo7hxBUhtr1-Jxehe4DnZuMh0SiG31vfDdrwxHc7m4uclz1MW54"
    //   ],
    //   'Mensaje para todos los usuarios')


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

    // try {
    //   // Crear el canal de notificación (Android)
    //   const channelId_Prueba1 = await notifee.createChannel({
    //     id: 'id_my_channel1',
    //     name: 'Prueba de sonido',
    //     lights: true,
    //     vibration: true,
    //     importance: AndroidImportance.HIGH,
    //     sound: 'custom_sound',
    //   });

    //   const channelId_Prueba2 = await notifee.createChannel({
    //     id: 'id_my_channel2',
    //     name: 'Prueba de sonido2',
    //     lights: true,
    //     vibration: true,
    //     importance: AndroidImportance.HIGH,
    //     sound: 'pills',
    //   });

    //   const channelId_Prueba3 = await notifee.createChannel({
    //     id: 'id_my_channel3',
    //     name: 'Prueba de sonido3',
    //     lights: true,
    //     vibration: true,
    //     importance: AndroidImportance.HIGH,
    //     sound: 'custom_sound',
    //   });

    //   // Mostrar la notificación
    //   await notifee.displayNotification({
    //     title: 'Esto es probando',
    //     body: 'holaaa.',
    //     android: {
    //       channelId: channelId_Prueba2 // Sena >> Aqui funciona
    //       // channelId: 'id_my_channel3', // Suena >> Aqui funciona
    //     },
    //   });

    // } catch (error) {
    //   console.log(error)
    // }

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
