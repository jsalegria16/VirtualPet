
/*
Este esta afuncionado genial
El problema ahora es conformar toma de medicamentos y local storage
ver el archivo useNfcWithStorage.js

*/

import { useState, useEffect } from 'react';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

// Hook personalizado para manejar NFC
const useNfcManager = () => {
  const [tagInfo, setTagInfo] = useState(null); // Estado para almacenar la información de la etiqueta NFC
  const [nfcError, setNfcError] = useState(null); // Estado para almacenar errores de NFC

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

  // Retorna tanto la información de la etiqueta como el posible error
  return { tagInfo, nfcError };
};

export default useNfcManager;
