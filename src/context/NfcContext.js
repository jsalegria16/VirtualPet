import React, { createContext, useContext } from 'react';

import useNfcWithStorage from '../services/LocalStorage/useNfcWithStorage'; // El hook que manejamos anteriormente para enviar al storage los registros nfc
import usePetGrowth from '../services/usePetGrowth_LocalStor/usePetGrowth'; // Importa el hook para manejar el crecimiento de la mascota
import useMedManagement from '../services/MedManagement/useMedManagement';

import useUserId from '../services/createUserID/useUserId'
import useDailyValidation from '../services/userMedValidation/useDailyValidation';
import useConfirmationTime from '../services/userUpdateMedication/useConfirmationTime';
import useUpdateMedication from '../services/userUpdateMedication/useUpdateMedication';

const NfcContext = createContext();

export const useNfc = () => {
  return useContext(NfcContext);
};

export const NfcProvider = ({ children }) => {

  //Logica para hacer un ID unico de usuario.
  /*
  Creo hoook, lo importo 
    Variable ID solamente
    ya uso esto en el useMEdManagement
    Cuidaado con el updatret o el set
    le paso userId al hook de useMEdmanagement
    
  Otra opcion es crearlo dentro del hook de medications managements
  
  */
  const { userId } = useUserId();

  //Logica para mostrar las etiquetas nfc registradas
  const { tagInfo, nfcError, scanHistory } = useNfcWithStorage(); // Hook que obtiene los datos

  // Lógica para hacer crecer la mascota cuando se detecta una etiqueta NFC
  const { petStage, growPet } = usePetGrowth(); // Hook que maneja el crecimiento de la mascota
  // Lógica para hacer crecer la mascota cuando se detecta una etiqueta NFC
  // Conexion entre crecimeinto y lectura nfc

  // Logica relacionada con las validaciones de la tomaa del medicamento
  const { validateAndGrowPet } = useDailyValidation(); // Hook que maneja la validación de la toma de medicamentos

  const { updateMedicationStatus } = useUpdateMedication(); // Inicializa el hook para actualizar medicamentos de un solo usuario

  // Logica para agregar un medicamento desde la ventana de confs
  const { medName, setMedName, times, setTimes, handleAddMedication, loadMedRegiment, medications } = useMedManagement(userId);

  const { confirmationTime, checkAndSetConfirmationTime, medicationId } = useConfirmationTime(userId);

  //Entrada a la aplicaicion y funcionamiento.
  React.useEffect(() => {
    if (tagInfo) {

      checkAndSetConfirmationTime();

      if (confirmationTime) {

        // Actualiza el estado del medicamento para el usuario
        updateMedicationStatus(userId, confirmationTime, medications.find(m => m.times === confirmationTime)?.name);

        // growPet(); // Hacemos crecer la mascota cuando se detecta una etiqueta NFC
        validateAndGrowPet(growPet); // Validamos la toma de medicamentos de todos al detectar una etiqueta NFC
      }

    }
  }, [tagInfo, confirmationTime]); // Se dispara cada vez que cambia la etiqueta NFC y la fecha de confirmación




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

      //Para la generacion de ID unico de usuario
      userId,

      // para la validacion de la toma de medicamentos de todos
      validateAndGrowPet,

      // Para pasar a true la confirmacion de la toma de medicamentos de cada usuaario
      updateMedicationStatus,

      //Hora e Idmedication de confirmacion de la toma de medicamentos 
      confirmationTime,
      medicationId,
      checkAndSetConfirmationTime,


    }}>
      {children}
    </NfcContext.Provider>
  );
};
