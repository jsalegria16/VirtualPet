import React, { createContext, useContext } from 'react';

import useNfcWithStorage from '../services/LocalStorage/useNfcWithStorage'; // El hook que manejamos anteriormente para enviar al storage los registros nfc
import usePetGrowth from '../services/usePetGrowth/usePetGrowth'; // Importa el hook para manejar el crecimiento de la mascota


const NfcContext = createContext();

export const useNfc = () => {
  return useContext(NfcContext);
};

export const NfcProvider = ({ children }) => {
    
  //Logica para mostrar las etiquetas nfc registradas
  const { tagInfo, nfcError, scanHistory } = useNfcWithStorage(); // Hook que obtiene los datos


  // Lógica para hacer crecer la mascota cuando se detecta una etiqueta NFC
  const { petStage, growPet } = usePetGrowth(); // Hook que maneja el crecimiento de la mascota
  // Lógica para hacer crecer la mascota cuando se detecta una etiqueta NFC
  // Conexion entre crecimeinto y lectura nfc
  React.useEffect(() => {
    if (tagInfo) {
      growPet(); // Hacemos crecer la mascota cuando se detecta una etiqueta NFC
    }
  }, [tagInfo]); // Se dispara cada vez que cambia la etiqueta NFC



  return (
    <NfcContext.Provider value={{
         tagInfo, 
         nfcError, 
         scanHistory,
         petStage,      // Proporcionamos el estado actual de la mascota
         growPet        // Proporcionamos la función para hacer crecer la mascota (si quieres usarla de forma independiente en otro lugar)
        }}>
      {children}
    </NfcContext.Provider>
  );
};
