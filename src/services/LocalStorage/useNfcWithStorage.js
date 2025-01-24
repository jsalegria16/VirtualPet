import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { logNfcInteractionForUser } from '../../utils/LogsFirebase/logNfcInteraction';

// Hook personalizado para manejar NFC y almacenar datos en AsyncStorage
const useNfcWithStorage = (userId) => {
  const [tagInfo, setTagInfo] = useState(null); // Estado para almacenar la información de la etiqueta NFC

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
          // await saveTagToStorage(tag); // Guardar la etiqueta en AsyncStorage
          // await loadTagHistory(); // Cargar el historial después de guardar
        });

        await NfcManager.registerTagEvent();
        // await loadTagHistory(); // Cargar el historial al iniciar
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

  return { tagInfo };
};

export default useNfcWithStorage;
