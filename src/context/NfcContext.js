import React, { createContext, useContext } from 'react';

import useNfcWithStorage from '../services/LocalStorage/useNfcWithStorage'; // El hook que manejamos anteriormente para enviar al storage los registros nfc
import usePetGrowth from '../services/usePetGrowth_LocalStor/usePetGrowth'; // Importa el hook para manejar el crecimiento de la mascota
import useMedManagement from '../services/MedManagement/useMedManagement';

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



  // Logica para agregar un medicamento desde la ventana de confs
  const { medName, setMedName, times, setTimes, handleAddMedication, loadMedRegiment, medications } = useMedManagement();



  return (
    <NfcContext.Provider value={{

      //Historial de registros nfc
      tagInfo,
      nfcError,
      scanHistory,

      //PAra el crecimento de la mascota
      petStage,      // Proporcionamos el estado actual de la mascota
      growPet,        // Proporcionamos la función para hacer crecer la mascota (si quieres usarla de forma independiente en otro lugar)

      //Para la agregacion de medicamentos 
      medName,
      setMedName,
      times,
      setTimes,
      handleAddMedication,
      loadMedRegiment,
      medications,

    }}>
      {children}
    </NfcContext.Provider>
  );
};
