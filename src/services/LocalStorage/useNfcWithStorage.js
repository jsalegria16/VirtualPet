import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { logNfcInteractionForUser } from '../../utils/LogsFirebase/logNfcInteraction';

// Hook personalizado para manejar NFC y almacenar datos en AsyncStorage
const useNfcWithStorage = (userId) => {
  const [tagInfo, setTagInfo] = useState(null); // Estado para almacenar la información de la etiqueta NFC
  const [nfcError, setNfcError] = useState(null); // Estado para almacenar errores de NFC
  const [scanHistory, setScanHistory] = useState([]); // Estado para almacenar el historial de escaneos

  useEffect(() => {
    async function initNfc() {
      try {
        const isNfcSupported = await NfcManager.isSupported();
        if (!isNfcSupported) {
          throw new Error('Este dispositivo/emulador no soporta NFC');
        }

        // Escuchar el evento de descubrimiento de la etiqueta NFC
        NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag) => {
          setTagInfo(tag); // Almacenar la información de la etiqueta en el estado
          await saveTagToStorage(tag); // Guardar la etiqueta en AsyncStorage
          await logNfcInteractionForUser(userId, 'Interacción NFC, Confirmacion del medicamento'); // Guardo el log en FB
          await loadTagHistory(); // Cargar el historial después de guardar
        });

        await NfcManager.registerTagEvent();
        await loadTagHistory(); // Cargar el historial al iniciar
      } catch (error) {
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

  // Función para guardar la etiqueta en AsyncStorage
  const saveTagToStorage = async (tag) => {
    try {
      const tagId = tag.id || 'unknown_id';  // Capturar el ID de la etiqueta
      const existingTags = await AsyncStorage.getItem('nfcTags');
      let tags = existingTags ? JSON.parse(existingTags) : [];

      // Añadir nueva etiqueta al array de etiquetas
      tags.push({ id: tagId, date: new Date().toISOString() });

      // Guardar el array actualizado en AsyncStorage
      await AsyncStorage.setItem('nfcTags', JSON.stringify(tags));
      console.log('Etiqueta guardada en AsyncStorage:', tags);
    } catch (error) {
      console.warn('Error al guardar la etiqueta en AsyncStorage:', error);
    }
  };

  // Función para cargar el historial de etiquetas desde AsyncStorage
  const loadTagHistory = async () => {
    try {
      const existingTags = await AsyncStorage.getItem('nfcTags');
      if (existingTags) {
        setScanHistory(JSON.parse(existingTags));
      }
    } catch (error) {
      console.warn('Error al cargar el historial de etiquetas:', error);
    }
  };

  return { tagInfo, nfcError, scanHistory };
};

export default useNfcWithStorage;
