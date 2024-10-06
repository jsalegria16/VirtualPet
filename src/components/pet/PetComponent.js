import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

const PetComponent = () => {
  const [tagInfo, setTagInfo] = useState(null); // Para almacenar la información de la etiqueta
  const [nfcError, setNfcError] = useState(null); // Estado para almacenar errores de NFC


  // useEffect que se ejecuta al montar el componente para iniciar el escaneo de NFC
  useEffect(() => {
    async function initNfc() {
      try {

        const isNfcSupported = await NfcManager.isSupported();
        if (!isNfcSupported) {
          throw new Error('Este dispositivo/emulador no soporta NFC');
        }


        // Escuchar el evento de descubrimiento de la etiqueta NFC
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
          setTagInfo(tag); // Almacenar la información de la etiqueta en el estado
        });

        await NfcManager.registerTagEvent();
      } catch (error) {
        console.warn('Error al inicializar NFC', error);
        setNfcError('Error al inicializar NFC: ' + error.message);
      }
    }

    initNfc();

    // Cleanup cuando se desmonte el componente
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    };
  }, []);

  return (
    <View style={styles.petContainer}>
      <Text style={styles.text}>Mascota Virtual</Text>

      {/* Siempre muestra la imagen de la mascota */}
      <Image
        source={require('../../assets/img/mascota.jpeg')}  // Ruta de la imagen
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
